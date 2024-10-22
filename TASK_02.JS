let startTime;
let updatedTime;
let difference;
let running = false;
let timerInterval;

const display = document.getElementById('display');
const lapList = document.getElementById('lap-list');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stopTimer() {
    clearInterval(timerInterval);
    running = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    lapList.innerHTML = '';
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const formattedTime = (hours < 10 ? "0" + hours : hours) + ":" +
                          (minutes < 10 ? "0" + minutes : minutes) + ":" +
                          (seconds < 10 ? "0" + seconds : seconds);
    display.innerHTML = formattedTime;
}

function addLap() {
    const lapTime = display.innerHTML;
    const lapItem = document.createElement('li');
    lapItem.classList.add('lap');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
}

// Optional: Add lap functionality with a separate button
const lapButton = document.createElement('button');
lapButton.textContent = 'Lap';
lapButton.addEventListener('click', addLap);
document.querySelector('.buttons').appendChild(lapButton);
