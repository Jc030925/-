let heartRain;

window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(e => console.log("Music play blocked"));

    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
    heartRain = setInterval(createFallingHeart, 400);
};

window.confirmDate = function() {
    clearInterval(heartRain);
    document.getElementById('heart-container').innerHTML = '';
    
    document.getElementById('invitation-letter').style.display = 'none';
    document.getElementById('final-stage').style.display = 'block';
    
    document.body.classList.add('night-mode');
    
    setInterval(launchTripleFireworks, 800);
    startCountdown();
};

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    const isLeft = Math.random() < 0.5;
    const pos = isLeft ? Math.random() * 15 : Math.random() * 15 + 85;
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

        const particles = 45;
        for (let i = 0; i < particles; i++) {
            const p = document.createElement('div');
            p.className = 'spark';
            p.style.backgroundColor = color;
            p.style.boxShadow = `0 0 10px ${color}`;
            p.style.left = x + 'vw';
            p.style.top = y + 'vh';
            document.body.appendChild(p);

            const angle = (Math.PI * 2 / particles) * i;
            const xMult = 16 * Math.pow(Math.sin(angle), 3);
            const yMult = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));
            
            p.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${xMult * 10}px, ${yMult * 10}px) scale(1.5)`, opacity: 1, offset: 0.7 },
                { transform: `translate(${xMult * 12}px, ${yMult * 12}px) scale(0)`, opacity: 0 }
            ], { duration: 2000, easing: 'ease-out', fill: 'forwards' });
            
            setTimeout(() => p.remove(), 2100);
        }
    }
}

function startCountdown() {
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
