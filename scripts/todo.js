// Selectors
const taskForm = document.querySelector('#taskForm');
const taskInput = document.querySelector('#taskInput');
const taskTime = document.querySelector('#taskTime');
const taskList = document.querySelector('#taskList');

// Event Listeners
taskForm.addEventListener('submit', addTask);
taskList.addEventListener('click', handleTaskClick);

// Functions
function addTask(e) {
    e.preventDefault();

    const taskText = taskInput.value.trim();
    const time = taskTime.value.trim();
    if (taskText === '' || time === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span> - <span class="task-time">${time}</span>
        <button class="complete-btn">Complete</button>
        <button class="delete-btn">Delete</button>
    `;

    taskList.appendChild(taskItem);
    saveTasks();
    taskInput.value = '';
    taskTime.value = '';
}

function handleTaskClick(e) {
    if (e.target.classList.contains('complete-btn')) {
        const taskItem = e.target.parentElement;
        taskItem.classList.toggle('completed');
        if (taskItem.classList.contains('completed')) {
            e.target.textContent = 'Completed'; // Update button text to "Completed"
        } else {
            e.target.textContent = 'Complete'; // Revert button text to "Complete" if toggled back
        }
    } else if (e.target.classList.contains('delete-btn')) {
        const taskItem = e.target.parentElement;
        taskItem.remove();
    }
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('.task-item').forEach(taskItem => {
        tasks.push({
            text: taskItem.querySelector('.task-text').textContent,
            time: taskItem.querySelector('.task-time').textContent,
            completed: taskItem.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    if (tasks) {
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            if (task.completed) taskItem.classList.add('completed');
            taskItem.innerHTML = `
                <span class="task-text">${task.text}</span> - <span class="task-time">${task.time}</span>
                <button class="complete-btn">${task.completed ? 'Completed' : 'Complete'}</button>
                <button class="delete-btn">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }
}

// Load tasks on page load
document.addEventListener('DOMContentLoaded', loadTasks);
