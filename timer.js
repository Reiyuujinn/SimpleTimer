let countdown;
let timeLeft = 0;

function startTimer() {
    clearInterval(countdown);
    
    let inputTime = document.getElementById('input-time').value;
    if (!inputTime || inputTime <= 0) {
        alert("Input Valid Time!");
        return;
    }
    
    timeLeft = parseInt(inputTime);
    updateTimerDisplay();
    
    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
            const alarm = document.getElementById('alarm-sound');
            alarm.currentTime = 0;
            alarm.play().then(() => {
                const confirmReset = confirm("Time Out! Reset timer?");
                if (confirmReset) {
                    resetTimer();
                }
            }).catch((e) => {
                console.error("Audio play failed:", e);
            });
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    document.getElementById('timer').innerText = "00:00";
    document.getElementById('input-time').value = "";

    const alarm = document.getElementById('alarm-sound');
    alarm.pause();
    alarm.currentTime = 0;
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('timer').innerText = `${minutes}:${seconds}`;
}

function openTimeoutModal() {
    document.getElementById('timeout-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('timeout-modal').classList.add('hidden');
    stopAlarm();
}

function openErrorModal() {
    document.getElementById('error-modal').classList.remove('hidden');
}

function closeErrorModal() {
    document.getElementById('error-modal').classList.add('hidden');
}

function stopAlarm() {
    const alarm = document.getElementById('alarm-sound');
    alarm.pause();
    alarm.currentTime = 0;
}


function startTimer() {
    clearInterval(countdown);

    let inputTime = document.getElementById('input-time').value;
    if (!inputTime || inputTime <= 0) {
        openErrorModal();
        return;
    }

    timeLeft = parseInt(inputTime);
    updateTimerDisplay();

    countdown = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimerDisplay();
        } else {
            clearInterval(countdown);
            const alarm = document.getElementById('alarm-sound');
            alarm.currentTime = 0;
            alarm.play().then(() => {
                openTimeoutModal();
            }).catch((e) => {
                console.error("Audio play failed:", e);
            });
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(countdown);
    timeLeft = 0;
    document.getElementById('timer').innerText = "00:00";
    document.getElementById('input-time').value = "";
    stopAlarm();
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    document.getElementById('timer').innerText = `${minutes}:${seconds}`;
}