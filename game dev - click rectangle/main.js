let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let circles = [];
let rectangles = [];

// Increase the canvas size
canvas.width = 900;
canvas.height = 700;

// Create more random green circles
for (let i = 0; i < 15; i++) {
  circles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: 20,
    color: "green",
    dx: (Math.random() - 0.5) * 4, 
    dy: (Math.random() - 0.5) * 4, 
  });
}

// Create more random red rectangles
for (let i = 0; i < 15; i++) {
  rectangles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    width: 30,
    height: 20,
    color: "red",
    dx: (Math.random() - 0.5) * 2, 
    dy: (Math.random() - 0.5) * 2, 
  });
}

function draw() {
  // Set black background
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Draw circles (only outlines)
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.strokeStyle = circle.color;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.closePath();
  }

  // Draw rectangles (only outlines)
  for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i];
    ctx.strokeStyle = rectangle.color;
    ctx.lineWidth = 3;
    ctx.strokeRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
  }
}

function moveObjects(objects) {
  for (let i = 0; i < objects.length; i++) {
    let object = objects[i];
    // Update object position
    object.x += object.dx;
    object.y += object.dy;

    // Bounce off the walls for circles
    if (
      object.radius &&
      (object.x - object.radius < 0 || object.x + object.radius > canvas.width)
    ) {
      object.dx *= -1;
    }

    if (
      object.radius &&
      (object.y - object.radius < 0 || object.y + object.radius > canvas.height)
    ) {
      object.dy *= -1;
    }

    // Bounce off the walls for rectangles
    if (!object.radius) {
      if (object.x < 0 || object.x + object.width > canvas.width) {
        object.dx *= -1;
      }

      if (object.y < 0 || object.y + object.height > canvas.height) {
        object.dy *= -1;
      }
    }
  }
}

function gameLoop() {
  draw();
  moveObjects(circles);
  moveObjects(rectangles);
  requestAnimationFrame(gameLoop);
}

canvas.addEventListener("click", (e) => {
  let mouseX = e.clientX - canvas.getBoundingClientRect().left;
  let mouseY = e.clientY - canvas.getBoundingClientRect().top;

  // Check if clicked on a green circle
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];
    let distance = Math.sqrt(
      (mouseX - circle.x) ** 2 + (mouseY - circle.y) ** 2
    );
    if (distance < circle.radius) {
      circles.splice(i, 1);

      if (circles.length === 0) {
        alert("Game Over - You WIN!");
        location.reload();
      }
    }
  }

  // Check if clicked on a red rectangle
  for (let i = 0; i < rectangles.length; i++) {
    let rectangle = rectangles[i];
    if (
      mouseX > rectangle.x &&
      mouseX < rectangle.x + rectangle.width &&
      mouseY > rectangle.y &&
      mouseY < rectangle.y + rectangle.height
    ) {
      alert("Game Over - You LOSE!");
      location.reload();
    }
  }
});

gameLoop();
