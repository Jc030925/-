const overlay = document.getElementById('overlay');
const heartScene = document.getElementById('heart-scene');
const letterScene = document.getElementById('letter-scene');
const timerText = document.getElementById('timer');
const music = document.getElementById('bgMusic');
const canvas = document.getElementById('fwCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworksActive = false;
let particles = [];

// Start everything on click
overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
    music.play();

    // After 5 seconds: Heart disappears, Letter/Countdown appears
    setTimeout(() => {
        heartScene.style.display = 'none';
        letterScene.style.display = 'block';
        fireworksActive = true;
        startCountdown();
    }, 5000);
});

function startCountdown() {
    let count = 10;
    const interval = setInterval(() => {
        count--;
        timerText.innerText = count;
        if (count <= 0) {
            clearInterval(interval);
            timerText.innerText = "OPEN";
        }
    }, 1000);
}

// Fireworks Logic
class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocity = {
            x: (Math.random() - 0.5) * 6,
            y: (Math.random() - 0.5) * 6
        };
        this.alpha = 1;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
    }
    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.015;
    }
}

function createFirework() {
    if (!fireworksActive) return;

    // Position: Randomly at Top, Bottom, Left, or Right (avoid center)
    const margin = 150;
    let x, y;
    const side = Math.floor(Math.random() * 4);

    if (side === 0) { x = Math.random() * canvas.width; y = Math.random() * margin; } // Top
    else if (side === 1) { x = Math.random() * canvas.width; y = canvas.height - Math.random() * margin; } // Bottom
    else if (side === 2) { x = Math.random() * margin; y = Math.random() * canvas.height; } // Left
    else { x = canvas.width - Math.random() * margin; y = Math.random() * canvas.height; } // Right

    const colors = ['#FF0000', '#FF69B4', '#0000FF']; // Red, Pink, Blue
    const color = colors[Math.floor(Math.random() * colors.length)];

    for (let i = 0; i < 25; i++) {
        particles.push(new Particle(x, y, color));
    }
}

setInterval(createFirework, 500); // Speed of firework spawns

function animate() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
        if (p.alpha > 0) {
            p.update();
            p.draw();
        } else {
            particles.splice(i, 1);
        }
    });
    requestAnimationFrame(animate);
}
animate();

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
