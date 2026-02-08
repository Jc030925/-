let heartRain;

window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => console.log("Music blocked"));
    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
    heartRain = setInterval(createFallingHeart, 450);
};

window.startGrandReveal = function() {
    // 1. Smoothly Darken background
    clearInterval(heartRain);
    document.getElementById('heart-container').innerHTML = '';
    document.getElementById('invitation-letter').style.display = 'none';
    document.body.classList.add('night-mode');

    // 2. Start 3-Second Countdown
    const countdownEl = document.getElementById('big-countdown');
    countdownEl.style.display = 'block';
    let count = 3;
    let timer = setInterval(() => {
        count--;
        if(count > 0) {
            countdownEl.innerText = count;
        } else {
            clearInterval(timer);
            countdownEl.style.display = 'none';
            triggerHeartFirework();
        }
    }, 1000);
};

function triggerHeartFirework() {
    const revealBox = document.getElementById('grand-reveal-container');
    const names = document.getElementById('couple-names');
    revealBox.style.display = 'block';
    
    // Sabog ng fireworks sa paligid
    for(let i=0; i<5; i++) setTimeout(launchTripleFireworks, i*500);

    // Ipakita ang Names after a short bit
    setTimeout(() => {
        names.classList.add('show');
    }, 500);

    // After 5 seconds, itaas ang pangalan at ipakita ang letter
    setTimeout(() => {
        document.getElementById('big-firework-heart').style.display = 'none';
        names.classList.remove('center-overlap');
        names.classList.add('move-up');
        
        document.getElementById('final-stage').style.display = 'block';
        setInterval(launchTripleFireworks, 1500); // Continuous fireworks sa gilid
        startCountdown();
    }, 5000);
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    const pos = Math.random() < 0.5 ? Math.random() * 18 : Math.random() * 18 + 82;
    heart.style.left = pos + "vw";
    heart.style.position = 'fixed';
    heart.style.top = '-50px';
    heart.style.color = '#ff0000';
    heart.style.fontSize = '40px';
    heart.animate([{top: '-50px', transform: 'rotate(0deg)'}, {top: '110vh', transform: 'rotate(360deg)'}], {duration: 5000});
    document.getElementById('heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#ffd700'];
    createHeartExplosion(Math.random()*20, Math.random()*100, colors[0]); // Left
    createHeartExplosion(Math.random()*20 + 80, Math.random()*100, colors[1]); // Right
}

function createHeartExplosion(x, y, color) {
    const particles = 30;
    for (let i = 0; i < particles; i++) {
        const p = document.createElement('div');
        p.className = 'spark';
        p.style.backgroundColor = color;
        p.style.left = x + 'vw';
        p.style.top = y + 'vh';
        document.body.appendChild(p);
        const angle = (Math.PI * 2 / particles) * i;
        const dx = 16 * Math.pow(Math.sin(angle), 3) * 5;
        const dy = -(13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)) * 5;
        p.animate([{ transform: 'translate(0, 0)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }], { duration: 1500, fill: 'forwards' });
        setTimeout(() => p.remove(), 1600);
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
