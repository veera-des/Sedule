const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const toggleDarkBtn = document.getElementById('mode-toggle');

const totalCount = document.getElementById('total-count');
const completedCount = document.getElementById('completed-count');
const progress = document.getElementById('progress');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Render tasks + stats
function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="actions">
        <button onclick="toggleComplete(${index})">✔️</button>
        <button onclick="editTask(${index})">✏️</button>
        <button onclick="deleteTask(${index})">🗑️</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  // Update stats
  totalCount.textContent = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  completedCount.textContent = completed;
  progress.textContent = tasks.length
    ? Math.round((completed / tasks.length) * 100) + "%"
    : "0%";
}

// Add Task
addTaskBtn.addEventListener('click', () => {
  const text = taskInput.value.trim();
  if (text) {
    tasks.push({ text, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    renderTasks();
  }
});

// Toggle Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Edit Task
function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText.trim();
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

// Delete Task
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}

// Dark Mode Toggle
toggleDarkBtn.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
});

// Initial render
renderTasks();
