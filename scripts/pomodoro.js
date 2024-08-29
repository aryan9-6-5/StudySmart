document.addEventListener('DOMContentLoaded', () => {
    const setTimerBtn = document.getElementById('set-timer-btn');
    const setAlarmBtn = document.getElementById('set-alarm-btn');
    const timerSettings = document.getElementById('timer-settings');
    const alarmSettings = document.getElementById('alarm-settings');
    const timerDisplay = document.getElementById('timer-display');
    const startTimerBtn = document.getElementById('start-timer');

    // Show timer or alarm settings
    setTimerBtn.addEventListener('click', () => {
        timerSettings.classList.remove('hidden');
        alarmSettings.classList.add('hidden');
        timerDisplay.classList.add('hidden');
    });

    setAlarmBtn.addEventListener('click', () => {
        alarmSettings.classList.remove('hidden');
        timerSettings.classList.add('hidden');
        timerDisplay.classList.add('hidden');
    });

    // Save Timer and Alarm buttons (just placeholder actions)
    document.getElementById('save-timer').addEventListener('click', () => {
        // Logic for saving timer settings
        console.log('Timer settings saved');
        timerDisplay.classList.remove('hidden');
    });

    document.getElementById('save-alarm').addEventListener('click', () => {
        // Logic for saving alarm settings
        console.log('Alarm settings saved');
    });

    // Start Timer button
    startTimerBtn.addEventListener('click', () => {
        // Logic for starting the timer
        console.log('Timer started');
    });
});
