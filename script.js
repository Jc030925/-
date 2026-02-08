let heartRain;

// 1. PAGBUKAS NG ENVELOPE
window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    // Play music (Note: Browser might block this until first click)
    music.play().catch(() => console.log("Music waiting for interaction"));

    // Itago ang envelope, ipakita ang letter
    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
    
    // Simulan ang pag-ulan ng puso sa gilid
    heartRain = setInterval(createFallingHeart, 450);
};

// 2. PAG-CONFIRM NG DATE (FIREWORKS & TIMER)
window.confirmDate = function() {
    // Itigil ang ulan ng puso at linisin ang screen
    clearInterval(heartRain);
    document.getElementById('heart-container').innerHTML = '';
    
    // Itago ang invitation, ipakita ang final stage (Timer & Letter)
    document.getElementById('invitation-letter').style.display = 'none';
    document.getElementById('final-stage').style.display = 'block';
    
    // Gawing Night Mode ang background
    document.body.classList.add('night-mode');
    
    // Simulan ang fireworks at ang countdown
    setInterval(launchTripleFireworks, 850);
    startCountdown();
};

// --- MGA SUPPORTING FUNCTIONS (DO NOT EDIT BELOW) ---

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    const isLeft = Math.random() < 0.5;
    const pos = isLeft ? Math.random() * 18 : Math.random() * 18 + 82;
    heart.style.left = pos + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
    document.getElementById('heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ffffff', '#ffd700', '#ff4500'];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        createHeartExplosion(x, y, color);
    }
}

function createHeartExplosion(x, y, color) {
    const particles = 45;
    for (let i = 0; i < particles; i++) {
        const p = document.createElement('div');
        p.className = 'spark';
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 12px ${color}`;
        p.style.left = x + 'vw';
        p.style.top = y + 'vh';
        document.body.appendChild(p);

        const angle = (Math.PI * 2 / particles) * i;
        const xMult = 16 * Math.pow(Math.sin(angle), 3);
        const yMult = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

        const dx = xMult * 7.5;
        const dy = yMult * 7.5;

        p.animate([
            { transform: 'translate(0, 0) scale(1.6)', opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) scale(0)`, opacity: 0 }
        ], { duration: 2200, easing: 'ease-out', fill: 'forwards' });
        setTimeout(() => p.remove(), 2300);
    }
}

function startCountdown() {
    // Anniversary Date: March 21, 2026
    const target = new Date("March 21, 2026 17:00:00").getTime();
    const display = document.getElementById("timer-display");

    setInterval(() => {
        const now = new Date().getTime();
        const dist = target - now;
        if (dist < 0) {
            display.innerHTML = "HAPPY ANNIVERSARY!";
            return;
        }
        const d = Math.floor(dist / (1000 * 60 * 60 * 24));
        const h = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((dist % (1000 * 60)) / 1000);
        display.innerHTML = `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}

// SECURITY: Disable Right Click and F12 Inspect
document.addEventListener('contextmenu', event => event.preventDefault());
document.onkeydown = function(e) {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 'I'.charCodeAt(0) || e.keyCode == 'J'.charCodeAt(0) || e.keyCode == 'C'.charCodeAt(0))) || (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0))) {
        return false;
    }
};
