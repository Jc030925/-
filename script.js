function openEnvelope() {
    document.querySelector('.flap').style.transform = 'rotateX(180deg)';
    setTimeout(() => {
        document.getElementById('envelope-wrapper').style.display = 'none';
        document.getElementById('invitation-letter').style.display = 'block';
        document.body.classList.add('night-mode');
        
        // Start effects
        setInterval(createFallingHeart, 300);
        setInterval(launchTripleFireworks, 800);
    }, 600);
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    heart.style.opacity = Math.random();
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#ff1493', '#ffffff', '#ffd700', '#ff4500'];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let x = Math.random() * 100;
        let y = Math.random() * 100;
        const particles = 50;

        for (let i = 0; i < particles; i++) {
            const p = document.createElement('div');
            p.className = 'spark';
            p.style.backgroundColor = color;
            p.style.left = x + 'vw';
            p.style.top = y + 'vh';
            document.body.appendChild(p);

            const angle = (Math.PI * 2 / particles) * i;
            const xMult = 16 * Math.pow(Math.sin(angle), 3);
            const yMult = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle));

            // Malaking heart fireworks
            const dx = xMult * 12; 
            const dy = yMult * 12;

            p.animate([
                { transform: 'translate(0, 0) scale(0)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px) scale(1.8)`, opacity: 1, offset: 0.7 },
                { transform: `translate(${dx * 1.2}px, ${dy * 1.2}px) scale(0)`, opacity: 0 }
            ], { duration: 2000, easing: 'ease-out', fill: 'forwards' });

            setTimeout(() => p.remove(), 2100);
        }
    }
}

function confirmDate() {
    document.getElementById('invitation-letter').style.display = 'none';
    document.getElementById('final-stage').style.display = 'block';
}
