const music = document.getElementById('bgMusic');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworksActive = false;
let particles = [];

function startExperience() {
    document.getElementById('click-to-start').style.display = 'none';
    music.play();

    // 1. After 5 Seconds: Mawawala ang Heart, lalabas ang Countdown
    setTimeout(() => {
        document.getElementById('heart-scene').style.display = 'none';
        document.getElementById('big-countdown').style.display = 'block';
        fireworksActive = true; // Simula ng fireworks sa gilid
        startTimer();
    }, 5000);
}

function startTimer() {
    let count = 10;
    const timer = setInterval(() => {
        count--;
        document.getElementById('big-countdown').innerText = count;
        if (count <= 0) {
            clearInterval(timer);
            document.getElementById('big-countdown').style.display = 'none';
            document.getElementById('envelope-wrapper').style.display = 'block';
        }
    }, 1000);
}

function openEnvelope() {
    document.querySelector('.flap').style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        document.getElementById('invitation-letter').style.display = 'block';
    }, 500);
}

function confirmDate() {
    alert("Date Confirmed! ❤️ See you at Hidden Garden Cafe!");
}

// FIREWORKS LOGIC (Red/Pink/Blue in Corners Only)
class Particle {
    constructor(x, y, color) {
        this.x = x; this.y = y; this.color = color;
        this.vx = (Math.random() - 0.5) * 5; this.vy = (Math.random() - 0.5) * 5;
        this.alpha = 1;
    }
    draw() {
        ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color;
        ctx.beginPath(); ctx.arc(this.x, this.y, 3, 0, Math.PI * 2); ctx.fill();
    }
    update() { this.x += this.vx; this.y += this.vy; this.alpha -= 0.01; }
}

function spawnFireworks() {
    if (!fireworksActive) return;
    // Tig-tatalo sa gilid (Top-Left, Top-Right, Bottom-Left, Bottom-Right)
    const corners = [
        {x: 50, y: 50}, {x: canvas.width-50, y: 50},
        {x: 50, y: canvas.height-50}, {x: canvas.width-50, y: canvas.height-50}
    ];
    const colors = ['#FF0000', '#FF69B4', '#0000FF'];
    
    corners.forEach(pos => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        for(let i=0; i<3; i++) particles.push(new Particle(pos.x, pos.y, color));
    });
}

setInterval(spawnFireworks, 800);

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    particles.forEach((p, i) => {
        if(p.alpha > 0) { p.update(); p.draw(); }
        else { particles.splice(i, 1); }
    });
    requestAnimationFrame(animate);
}
animate();
