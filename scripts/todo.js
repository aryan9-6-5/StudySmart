        // Selectors
        const taskForm = document.querySelector('#taskForm');
        const taskInput = document.querySelector('#taskInput');
        const taskTime = document.querySelector('#taskTime');
        const taskList = document.querySelector('#taskList');

        // Event Listeners
        taskForm.addEventListener('submit', addTask);
        taskList.addEventListener('click', handleTaskClick);

        // Functions
        function sortTasks() {
            const tasks = Array.from(taskList.children);
            tasks.sort((a, b) => {
                const timeA = a.querySelector('.task-time').textContent;
                const timeB = b.querySelector('.task-time').textContent;
                return timeA.localeCompare(timeB);
            });
        
            // Clear the current list
            taskList.innerHTML = '';
        
            // Re-append sorted tasks
            tasks.forEach(task => taskList.appendChild(task));
        }
        
        function addTask(e) {
            e.preventDefault();
        
            const taskText = taskInput.value.trim();
            const time = taskTime.value.trim();
            if (taskText === '' || time === '') return;
        
            const taskItem = document.createElement('li');
            taskItem.className = 'task-item';
            taskItem.innerHTML = `
                <span class="task-text">${taskText}</span>
                <span class="task-time">${time}</span>
                <div>
                    <button class="complete-btn">Complete</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;
        
            taskList.appendChild(taskItem);
            sortTasks(); // Sort tasks after adding a new one
            saveTasks();
            taskInput.value = '';
            taskTime.value = '';
        }
        
        function loadTasks() {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.className = 'task-item';
                if (task.completed) taskItem.classList.add('completed-task');
                
                taskItem.innerHTML = `
                    <span class="task-text">${task.text}</span>
                    <span class="task-time">${task.time}</span>
                    <div>
                        <button class="complete-btn">${task.completed ? 'Completed' : 'Complete'}</button>
                        <button class="delete-btn">Delete</button>
                    </div>
                `;
                
                taskList.appendChild(taskItem);
            });
        
            sortTasks(); // Sort tasks after loading
        }

        function handleTaskClick(e) {
            const taskItem = e.target.closest('.task-item');
            if (!taskItem) return;

            if (e.target.classList.contains('complete-btn')) {
                taskItem.classList.toggle('completed-task');
                const completeBtn = e.target;
                completeBtn.textContent = taskItem.classList.contains('completed-task') 
                    ? 'Completed' 
                    : 'Complete';
            } else if (e.target.classList.contains('delete-btn')) {
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
                    completed: taskItem.classList.contains('completed-task')
                });
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Load tasks on page load
        document.addEventListener('DOMContentLoaded', loadTasks);