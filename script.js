let heartRain;

window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => console.log("Music waiting for interaction"));
    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
    heartRain = setInterval(createFallingHeart, 450);
};

window.confirmDate = function() {
    clearInterval(heartRain);
    document.getElementById('heart-container').innerHTML = '';
    document.getElementById('invitation-letter').style.display = 'none';
    document.getElementById('final-stage').style.display = 'block';
    document.body.classList.add('night-mode');
    setInterval(launchTripleFireworks, 850);
    startCountdown();
};

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    const pos = Math.random() < 0.5 ? Math.random() * 18 : Math.random() * 18 + 82;
    heart.style.left = pos + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
    document.getElementById('heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ffd700', '#ff4500'];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        createHeartExplosion(Math.random() * 100, Math.random() * 100, color);
    }
}

function createHeartExplosion(x, y, color) {
    const particles = 45;
    for (let i = 0; i < particles; i++) {
        const p = document.createElement('div');
        p.className = 'spark';
        p.style.backgroundColor = color;
        p.style.left = x + 'vw';
        p.style.top = y + 'vh';
        document.body.appendChild(p);
        const angle = (Math.PI * 2 / particles) * i;
        const dx = 16 * Math.pow(Math.sin(angle), 3) * 7.5;
        const dy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 7.5;
        p.animate([{ transform: 'translate(0, 0) scale(1.6)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }], { duration: 2200, easing: 'ease-out', fill: 'forwards' });
        setTimeout(() => p.remove(), 2300);
    }
}

function startCountdown() {
    const target = new Date("March 21, 2026 17:00:00").getTime();
    setInterval(() => {
        const now = new Date().getTime();
        const dist = target - now;
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        document.getElementById("timer-display").innerHTML = dist < 0 ? "HAPPY ANNIVERSARY!" : `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}
