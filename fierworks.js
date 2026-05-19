const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let particles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Particle {
    constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = Math.random() * 6 + 2;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * 6 - 4;
    this.color = `hsl(${Math.random()*360}, 100%, 70%)`;
    this.life = 60;
    }

    update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.15;
    this.life--;
    this.size *= 0.97;
    }

    draw() {
    ctx.save();
    ctx.globalAlpha = this.life / 60;
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    }
}

function createFirework(x, y) {
    for (let i = 0; i < 35; i++) {
    particles.push(new Particle(x, y));
    }
}

document.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.12) { // nie za dużo
    createFirework(e.clientX, e.clientY);
    }
});

document.addEventListener('click', (e) => {
    createFirework(e.clientX, e.clientY);
});

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].life <= 0) particles.splice(i, 1);
    }

    requestAnimationFrame(animate);
}

animate();