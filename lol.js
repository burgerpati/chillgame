const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = {
  x: 50,
  y: 300,
  width: 40,
  height: 40,
  dx: 0,
  dy: 0,
  gravity: 0.8,
  jumpPower: -12,
  grounded: false,
};

const keys = {};
const platforms = [
  { x: 0, y: 350, width: 800, height: 50 },
  { x: 200, y: 280, width: 100, height: 10 },
  { x: 400, y: 240, width: 120, height: 10 },
  { x: 600, y: 200, width: 100, height: 10 },
];

let coins = [
  { x: 220, y: 250, collected: false },
  { x: 620, y: 170, collected: false },
];

let weirdness = 0;

function drawPlayer() {
  ctx.fillStyle = weirdness > 10 ? "#ff0000" : "#ffffff";
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawPlatforms() {
  ctx.fillStyle = "#654321";
  platforms.forEach(p => ctx.fillRect(p.x, p.y, p.width, p.height));
}

function drawCoins() {
  coins.forEach(c => {
    if (!c.collected) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = weirdness > 5 ? "#f0f" : "gold";
      ctx.fill();
    }
  });
}

function checkPlatformCollision() {
  player.grounded = false;
  platforms.forEach(p => {
    if (
      player.x < p.x + p.width &&
      player.x + player.width > p.x &&
      player.y + player.height < p.y + 10 &&
      player.y + player.height + player.dy >= p.y
    ) {
      player.dy = 0;
      player.y = p.y - player.height;
      player.grounded = true;
    }
  });
}

function checkCoinCollision() {
  coins.forEach(c => {
    if (
      !c.collected &&
      player.x < c.x + 10 &&
      player.x + player.width > c.x - 10 &&
      player.y < c.y + 10 &&
      player.y + player.height > c.y - 10
    ) {
      c.collected = true;
      weirdness++;
      if (weirdness === 3) {
        alert("That coin felt... wrong.");
      }
    }
  });
}

function update() {
  player.dx = 0;
  if (keys["ArrowLeft"]) player.dx = -5;
  if (keys["ArrowRight"]) player.dx = 5;

  if (keys["Space"] && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }

  player.dy += player.gravity;
  player.x += player.dx;
  player.y += player.dy;

  checkPlatformCollision();
  checkCoinCollision();

  // Keep player in bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
  if (player.y > canvas.height) {
    alert("You fell... but where did you go?");
    location.reload();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawPlatforms();
  drawCoins();
  drawPlayer();
  if (weirdness > 7) {
    ctx.fillStyle = "rgba(255,0,0,0.2)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";
    ctx.font = "20px monospace";
    ctx.fillText("You're not supposed to be here.", 200, 100);
  }
}

function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener("keydown", e => keys[e.key] = true);
window.addEventListener("keyup", e => keys[e.key] = false);

gameLoop();
