window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => console.log("Music play blocked by browser. Click anywhere to play."));
    
    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
}

window.startFinalReveal = function() {
    // Transition direct sa final stage
    document.getElementById('invitation-letter').style.display = 'none';
    document.body.classList.add('night-mode');
    
    const finalStage = document.getElementById('final-stage');
    finalStage.style.display = 'flex';

    // Simulan ang Heart Fireworks at Timer
    setInterval(launchHeartFireworks, 1000);
    startFinalTimer();
}

function launchHeartFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#0000ff'];
    const positions = [
        {x: 10, y: 15}, {x: 90, y: 15}, // Taas Gilid
        {x: 10, y: 85}, {x: 90, y: 85}, // Baba Gilid
        {x: 5, y: 50},  {x: 95, y: 50}, // Gitna Gilid
        {x: 50, y: 10}, {x: 50, y: 90}  // Taas/Baba Gitna
    ];

    colors.forEach(color => {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        for (let i = 0; i < 10; i++) {
            createHeartSpark(pos.x, pos.y, color);
        }
    });
}

function createHeartSpark(xPct, yPct, color) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.innerHTML = '❤';
    spark.style.color = color;
    spark.style.left = (xPct / 100 * window.innerWidth) + 'px';
    spark.style.top = (yPct / 100 * window.innerHeight) + 'px';
    spark.style.textShadow = `0 0 10px ${color}`;
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    const anim = spark.animate([
        { transform: 'translate(0, 0) scale(1)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) scale(0.5)`, opacity: 0 }
    ], { duration: 1500, easing: 'ease-out' });

    anim.onfinish = () => spark.remove();
}

function startFinalTimer() {
    const target = new Date("March 21, 2026 17:00:00").getTime();
    setInterval(() => {
        const diff = target - new Date().getTime();
        if (diff <= 0) return;
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        document.getElementById('timer-display').innerText = 
            `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}
