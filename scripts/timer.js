document.addEventListener('DOMContentLoaded', () => {
    let timerInterval;
    let timeLeft;
    let isTimerRunning = false;
    let isPaused = false;

    const timerElements = {
        timerButton: document.getElementById('timerButton'),
        pauseButton: document.getElementById('pauseButton'),
        timerValue: document.getElementById('timer'),
        timerHours: document.getElementById('timer-hours'),
        timerMinutes: document.getElementById('timer-minutes'),
        timerSeconds: document.getElementById('timer-seconds')
    };

    // Verify required timer elements exist
    if (!timerElements.timerButton || !timerElements.timerValue || !timerElements.pauseButton) {
        console.error('Required timer elements are missing from the DOM');
        return;
    }

    // Timer Controls
    timerElements.timerButton.addEventListener('click', handleTimerButton);
    timerElements.pauseButton.addEventListener('click', handlePauseButton);

    function handleTimerButton() {
        if (isTimerRunning || isPaused) {
            // Reset the timer if it's running or paused
            fullReset();
        } else {
            // Start the timer if it's not running
            startTimer();
        }
    }

    function handlePauseButton() {
        if (!isTimerRunning && !isPaused) return; // Do nothing if the timer hasn't started

        if (isPaused) {
            resumeTimer(); // Resume if paused
        } else {
            pauseTimer(); // Pause if running
        }
    }

    function startTimer() {
        // Get hours, minutes, and seconds
        const hours = parseInt(timerElements.timerHours.value) || 0;
        const minutes = parseInt(timerElements.timerMinutes.value) || 0;
        const seconds = parseInt(timerElements.timerSeconds.value) || 0;

        // Calculate total seconds
        timeLeft = (hours * 3600) + (minutes * 60) + seconds;

        if (timeLeft <= 0) {
            alert('Please enter a valid duration.');
            return;
        }

        isTimerRunning = true;
        isPaused = false;

        // Update button states
        timerElements.timerButton.textContent = "Reset Timer";
        timerElements.pauseButton.textContent = "Pause Timer";
        timerElements.pauseButton.disabled = false;

        updateTimerDisplay(timeLeft); // Initial display update

        timerInterval = setInterval(() => {
            timeLeft--;

            if (timeLeft < 0) {
                fullReset();
                alert('Time is up! Well done on your session!');
                return;
            }

            updateTimerDisplay(timeLeft);
        }, 1000);
    }

    function pauseTimer() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        isPaused = true;
        timerElements.pauseButton.textContent = "Resume Timer";
    }

    function resumeTimer() {
        isTimerRunning = true;
        isPaused = false;
        timerElements.pauseButton.textContent = "Pause Timer";

        timerInterval = setInterval(() => {
            timeLeft--;

            if (timeLeft < 0) {
                fullReset();
                alert('Time is up! Well done on your session!');
                return;
            }

            updateTimerDisplay(timeLeft);
        }, 1000);
    }

    function updateTimerDisplay(timeLeft) {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;
        const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerElements.timerValue.textContent = timeString;
    }

    function fullReset() {
        clearInterval(timerInterval);
        isTimerRunning = false;
        isPaused = false;
        timerElements.timerValue.textContent = "00:00:00";
        timerElements.timerButton.textContent = "Start Timer";
        timerElements.pauseButton.textContent = "Pause Timer";
        timerElements.pauseButton.disabled = true;
        
        // Clear input fields
        timerElements.timerHours.value = '';
        timerElements.timerMinutes.value = '';
        timerElements.timerSeconds.value = '';
    }

    // Initialize the pause button as disabled
    timerElements.pauseButton.disabled = true;
});