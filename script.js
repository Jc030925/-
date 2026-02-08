window.openEnvelope = function() {
    const music = document.getElementById("bgMusic");
    music.play().catch(() => console.log("Waiting for user interaction..."));
    document.getElementById('envelope-wrapper').style.display = 'none';
    document.getElementById('invitation-letter').style.display = 'block';
}

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

function showHeartAndNames() {
    const revealContainer = document.getElementById('grand-reveal-container');
    const names = document.getElementById('couple-names');
    
    revealContainer.style.display = 'block';
    setTimeout(() => { names.classList.add('show'); }, 100);

    // AFTER 5 SECONDS -> Transition to Final Stage
    setTimeout(() => {
        revealContainer.style.opacity = "0";
        setTimeout(() => {
            revealContainer.style.display = 'none';
            document.getElementById('final-stage').style.display = 'flex';
            document.getElementById('final-stage').style.flexDirection = 'column';
            document.getElementById('final-stage').style.alignItems = 'center';
            
            // Start Heart Fireworks and Timer
            setInterval(launchTripleFireworks, 1500);
            startFinalTimer();
        }, 1000);
    }, 5000);
}

// HEART FIREWORKS (Red, Pink, Blue)
function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#0000ff'];
    const positions = [
        {x: 15, y: 15}, {x: 85, y: 15}, // Taas
        {x: 15, y: 85}, {x: 85, y: 85}, // Baba
        {x: 10, y: 50}, {x: 90, y: 50}  // Gilid
    ];

    colors.forEach(color => {
        const pos = positions[Math.floor(Math.random() * positions.length)];
        for (let i = 0; i < 12; i++) {
            createHeartSpark(pos.x, pos.y, color);
        }
    });
}

function createHeartSpark(xPct, yPct, color) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    spark.innerHTML = '❤'; 
    spark.style.color = color;
    spark.style.fontSize = (Math.random() * 15 + 10) + 'px';
    spark.style.textShadow = `0 0 10px ${color}`;
    spark.style.left = (xPct / 100 * window.innerWidth) + 'px';
    spark.style.top = (yPct / 100 * window.innerHeight) + 'px';
    document.body.appendChild(spark);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 150 + 50;
    const destX = Math.cos(angle) * distance;
    const destY = Math.sin(angle) * distance;

    const anim = spark.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${destX}px, ${destY}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: 1500, easing: 'ease-out' });

    anim.onfinish = () => spark.remove();
}

function startFinalTimer() {
    const target = new Date("March 21, 2026 17:00:00").getTime();
    setInterval(() => {
        const diff = target - new Date().getTime();
        if (diff <= 0) return;
        const d = Math.floor(diff / (1000*60*60*24));
        const h = Math.floor((diff % (1000*60*60*24)) / (1000*60*60));
        const m = Math.floor((diff % (1000*60*60)) / (1000*60));
        const s = Math.floor((diff % (1000*60)) / 1000);
        document.getElementById('timer-display').innerText = 
            `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}
