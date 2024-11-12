let alarms = [];

function setAlarm() {
    const timeInput = document.getElementById('alarmTime');
    const priorityInput = document.getElementById('priority');
    const labelInput = document.getElementById('alarmLabel');

    if (!timeInput.value || !labelInput.value) {
        alert('Please fill in all fields');
        return;
    }

    const alarm = {
        time: timeInput.value,
        priority: priorityInput.value,
        label: labelInput.value,
        id: Date.now()
    };

    alarms.push(alarm);
    alarms.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        return a.time.localeCompare(b.time);
    });

    updateAlarmsList();
    scheduleAlarm(alarm);

    // Reset inputs
    timeInput.value = '';
    labelInput.value = '';
}

function deleteAlarm(id) {
    alarms = alarms.filter(alarm => alarm.id !== id);
    updateAlarmsList();
}

function updateAlarmsList() {
    const alarmsList = document.getElementById('alarmsList');
    alarmsList.innerHTML = '';

    alarms.forEach(alarm => {
        const alarmElement = document.createElement('div');
        alarmElement.className = `alarm-item ${alarm.priority}-priority`;
        alarmElement.innerHTML = `
            <div>
                <strong>${alarm.time}</strong> - ${alarm.label}
            </div>
            <button onclick="deleteAlarm(${alarm.id})" class="delete-btn">Delete</button>
        `;
        alarmsList.appendChild(alarmElement);
    });
}

function scheduleAlarm(alarm) {
    const [hours, minutes] = alarm.time.split(':');
    const now = new Date();
    const alarmTime = new Date();
    alarmTime.setHours(parseInt(hours));
    alarmTime.setMinutes(parseInt(minutes));
    alarmTime.setSeconds(0);

    if (alarmTime < now) {
        alarmTime.setDate(alarmTime.getDate() + 1);
    }

    const timeUntilAlarm = alarmTime - now;

    setTimeout(() => {
        if (Notification.permission === 'granted') {
            new Notification('StudySmart Alarm', {
                body: `${alarm.label} (${alarm.priority} priority)`,
                icon: '/favicon.ico'
            });
            const audio = new Audio('data:audio/wav;base64,...'); // Placeholder for audio file
            audio.play();
        } else {
            alert(`Alarm: ${alarm.label} (${alarm.priority} priority)`);
        }
        deleteAlarm(alarm.id);
    }, timeUntilAlarm);
}

document.addEventListener('DOMContentLoaded', () => {
    if (Notification.permission !== 'granted') {
        Notification.requestPermission();
    }
});