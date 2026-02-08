// 1. OPEN ENVELOPE -> SHOW LETTER
window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => console.log("Music play failed"));

    const env = document.getElementById('envelope-wrapper');
    const letter = document.getElementById('invitation-letter');

    env.style.transition = "opacity 0.5s ease";
    env.style.opacity = "0";
    
    setTimeout(() => {
        env.style.display = 'none';
        letter.style.display = 'block';
    }, 500);
}

// 2. CONFIRM DATE -> 3-2-1 COUNTDOWN
window.startGrandReveal = function() {
    document.getElementById('invitation-letter').style.display = 'none';
    document.body.classList.add('night-mode');

    const cd = document.getElementById('big-countdown');
    cd.style.display = 'block';
    let count = 3;

    const cdInterval = setInterval(() => {
        count--;
        cd.innerText = count;
        if (count <= 0) {
            clearInterval(cdInterval);
            cd.style.display = 'none';
            showHeartAndNames();
        }
    }, 1000);
}

// 3. SHOW HEART & NAMES
function showHeartAndNames() {
    const container = document.getElementById('grand-reveal-container');
    const names = document.getElementById('couple-names');
    
    container.style.display = 'block';
    setTimeout(() => { names.classList.add('show'); }, 100);

    // 4. AFTER 5s -> MOVE NAMES & SHOW FINAL
    setTimeout(() => {
        const bigHeart = document.getElementById('big-firework-heart');
        bigHeart.style.transition = "opacity 1s ease";
        bigHeart.style.opacity = "0";

        setTimeout(() => {
            bigHeart.style.display = 'none';
            names.classList.add('move-up'); 
            document.getElementById('final-stage').style.display = 'block';
            
            // Start Fireworks and Countdown Timer
            setInterval(launchTripleFireworks, 1500);
            startFinalTimer();
        }, 1000);
    }, 5000);
}

// 5. FIREWORKS (Red, Pink, Blue)
function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#0000ff'];
    const positions = [
        {x: 10, y: 10}, {x: 90, y: 10}, {x: 10, y: 90}, 
        {x: 90, y: 90}, {x: 50, y: 5}, {x: 50, y: 95}
    ];

    colors.forEach(color => {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        for (let i = 0; i < 15; i++) {
            createSpark(pos.x, pos.y, color);
        }
    });
}

function createSpark(xPct, yPct, color) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.style.backgroundColor = color;
    spark.style.left = (xPct / 100 * window.innerWidth) + 'px';
    spark.style.top = (yPct / 100 * window.innerHeight) + 'px';
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const destX = Math.cos(angle) * 80;
    const destY = Math.sin(angle) * 80;

    spark.animate([
        { transform: 'translate(0, 0)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px)`, opacity: 0 }
    ], { duration: 1000 }).onfinish = () => spark.remove();
}

function startFinalTimer() {
    const target = new Date("March 21, 2026 17:00:00").getTime();
    setInterval(() => {
        const diff = target - new Date().getTime();
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);
        document.getElementById('timer-display').innerText = `${d}d ${h}h ${m}m ${s}s`;
    }, 1000);
}
