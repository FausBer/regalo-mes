// 🎆 Fuegos artificiales
const canvas = document.getElementById("fuegosCanvas");
const ctx = canvas.getContext("2d");
let fireworks = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Firework {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.targetY = (Math.random() * canvas.height) / 2;
    this.speed = 2 + Math.random() * 3;
    this.radius = 2;
    this.color = `hsl(${Math.random() * 360}, 100%, 60%)`;
    this.exploded = false;
    this.particles = [];
  }

  update() {
    if (!this.exploded) {
      this.y -= this.speed;
      if (this.y <= this.targetY) {
        this.exploded = true;
        for (let i = 0; i < 30; i++) {
          this.particles.push({
            x: this.x,
            y: this.y,
            angle: Math.random() * 2 * Math.PI,
            speed: Math.random() * 5 + 2,
            radius: 2,
            alpha: 1,
          });
        }
      }
    } else {
      this.particles.forEach((p) => {
        p.x += Math.cos(p.angle) * p.speed;
        p.y += Math.sin(p.angle) * p.speed;
        p.alpha -= 0.02;
      });
      this.particles = this.particles.filter((p) => p.alpha > 0);
      if (this.particles.length === 0) {
        this.reset();
      }
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      this.particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI);
        ctx.fillStyle = this.color
          .replace("60%", "60%")
          .replace("hsl", `rgba`)
          .replace(")", `,${p.alpha})`);
        ctx.fill();
      });
    }
  }
}

for (let i = 0; i < 5; i++) {
  fireworks.push(new Firework());
}

function animateFireworks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach((f) => {
    f.update();
    f.draw();
  });
  requestAnimationFrame(animateFireworks);
}
animateFireworks();

// 🎠 Carrusel
let index = 0;
function moverCarrusel(dir) {
  const carrusel = document.getElementById("carrusel");
  const slides = carrusel.querySelectorAll("img");
  index = (index + dir + slides.length) % slides.length;
  carrusel.style.transform = `translateX(-${index * 100}%)`;
}
