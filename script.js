let heartRain;
let petalsInterval;
let lockTimerInterval;
let hideTimeout;

// I-set ang Target Unlock Date: March 9, 2026, 12:00 AM
const UNLOCK_DATE = new Date("March 9, 2026 00:00:00").getTime();

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
    const finalStage = document.getElementById('final-stage');
    finalStage.style.display = 'block';
    const bgVideo = document.getElementById('bg-video-final');
    bgVideo.style.display = 'block';
    setTimeout(() => {
        bgVideo.style.opacity = "1";
        finalStage.classList.add('show');
    }, 50);
    document.body.classList.add('night-mode');
    setInterval(launchTripleFireworks, 800);
    startCountdown();
};

window.checkDateUnlock = function() {
    const now = new Date().getTime();
    const lockDisplay = document.getElementById('lock-timer');

    if (now >= UNLOCK_DATE) {
        goToThirdPage();
    } else {
        lockDisplay.style.display = 'block';
        updateLockCountdown(); 
        
        if (lockTimerInterval) clearInterval(lockTimerInterval);
        lockTimerInterval = setInterval(updateLockCountdown, 1000);

        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            lockDisplay.style.display = 'none';
            clearInterval(lockTimerInterval);
        }, 10000);
    }
};

function updateLockCountdown() {
    const now = new Date().getTime();
    const dist = UNLOCK_DATE - now;
    const lockDisplay = document.getElementById('lock-timer');

    if (dist <= 0) {
        lockDisplay.innerHTML = "Unlock now! ❤";
        return;
    }

    const d = Math.floor(dist / 86400000), h = Math.floor((dist % 86400000) / 3600000), m = Math.floor((dist % 3600000) / 60000), s = Math.floor((dist % 60000) / 1000);
    lockDisplay.innerHTML = `It's not our anniversary yet: <br>${d}d : ${h}h : ${m}m : ${s}s`;
}

function goToThirdPage() {
    const finalStage = document.getElementById('final-stage');
    const thirdStage = document.getElementById('third-stage');
    const bgMusic = document.getElementById('bgMusic');
    const finalMusic = document.getElementById('finalMusic');

    let fadeOut = setInterval(() => {
        if (bgMusic.volume > 0.1) {
            bgMusic.volume -= 0.1;
        } else {
            bgMusic.pause();
            clearInterval(fadeOut);
            finalMusic.volume = 0;
            finalMusic.play().catch(e => console.log("Final music blocked"));
            let fadeIn = setInterval(() => {
                if (finalMusic.volume < 0.9) finalMusic.volume += 0.1;
                else clearInterval(fadeIn);
            }, 200);
        }
    }, 200);

    finalStage.style.opacity = '0';
    setTimeout(() => {
        finalStage.style.display = 'none';
        thirdStage.style.display = 'block';
        thirdStage.scrollTop = 0;
        petalsInterval = setInterval(createRosePetal, 300);
        setTimeout(() => { thirdStage.classList.add('show'); }, 50);
    }, 2000);
}

// NEW FUNCTION: PARA SA VOICE RECORDING
window.toggleVoice = function() {
    const finalMusic = document.getElementById('finalMusic');
    const voiceAudio = document.getElementById('voiceAudio');
    const btn = document.querySelector('.voice-btn');

    if (voiceAudio.paused) {
        // Hinaan ang music (Volume 0.2)
        finalMusic.volume = 0.2;
        voiceAudio.play();
        btn.innerHTML = "Listening... 🎤";
        btn.classList.add('playing');

        // Pag natapos yung boses, ibalik ang lakas ng music
        voiceAudio.onended = function() {
            finalMusic.volume = 0.9;
            btn.innerHTML = "Listen again? 🎤";
            btn.classList.remove('playing');
        };
    } else {
        voiceAudio.pause();
        voiceAudio.currentTime = 0;
        finalMusic.volume = 0.9;
        btn.innerHTML = "Listen to my voice? 🎤";
        btn.classList.remove('playing');
    }
};

function createRosePetal() {
    const petal = document.createElement('div');
    petal.innerHTML = '🌸';
    petal.style.position = 'fixed';
    petal.style.top = '-20px';
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.zIndex = '1500';
    petal.style.pointerEvents = 'none';
    const duration = Math.random() * 3 + 5;
    petal.animate([
        { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
        { transform: `translate(${Math.random() * 100 - 50}px, 100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
    ], { duration: duration * 1000, easing: 'linear' });
    document.body.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000);
}

function createFallingHeart() {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.innerHTML = '❤';
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = (Math.random() * 3 + 4) + "s";
    document.getElementById('heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 6000);
}

function launchTripleFireworks() {
    const colors = ['#ff0000', '#ff69b4', '#ffffff', '#ffd700'];
    for (let j = 0; j < 3; j++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        let x = Math.random() * 100, y = Math.random() * 100;
        for (let i = 0; i < 40; i++) {
            const p = document.createElement('div');
            p.className = 'spark';
            p.style.backgroundColor = color;
            p.style.left = x + 'vw'; p.style.top = y + 'vh';
            document.body.appendChild(p);
            const angle = (Math.PI * 2 / 40) * i;
            const dx = 16 * Math.pow(Math.sin(angle), 3) * 8;
            const dy = -(13 * Math.cos(angle) - 5 * Math.cos(2*angle) - 2 * Math.cos(3*angle) - Math.cos(4*angle)) * 8;
            p.animate([{ transform: 'translate(0,0) scale(0)', opacity: 1 }, { transform: `translate(${dx}px, ${dy}px) scale(1)`, opacity: 0 }], { duration: 2000, easing: 'ease-out' });
            setTimeout(() => p.remove(), 2000);
        }
    }
}

function startCountdown() {
    const target = new Date("March 21, 2026 17:00:00").getTime();
    const display = document.getElementById("timer-display");
    setInterval(() => {
        const dist = target - new Date().getTime();
        if (dist < 0) { display.innerHTML = "HAPPY ANNIVERSARY!"; return; }
        const d = Math.floor(dist / 86400000), h = Math.floor((dist % 86400000) / 3600000), m = Math.floor((dist % 3600000) / 60000), s = Math.floor((dist % 60000) / 1000);
        display.innerHTML = `${d}d : ${h}h : ${m}m : ${s}s`;
    }, 1000);
}
