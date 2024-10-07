class Task {
    constructor(title, description, dueDate) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = 'Pending';
    }
}
class TaskManager {
    constructor() {
    this.tasks = [];
    }
    addTask(task) {
    this.tasks.push(task);
    }
    deleteTask(index) {
        this.tasks.splice(index, 1);
    }
    editTask(index, title, description, dueDate) {
        const task = this.tasks[index];
        task.title = title;
        task.description = description;
        task.dueDate = dueDate;
    }
    toggleTaskStatus(index) {
        const task = this.tasks[index];
        task.status = task.status === 'Pending' ? 'Completed' : 'Pending';
    }
    filterTasks(status) {
        return this.tasks.filter(task => task.status === status);
    }
}
const taskManager = new TaskManager();
const taskForm = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');
const allTasksBtn = document.getElementById('allTasks');
const pendingTasksBtn = document.getElementById('pendingTasks');
const completedTasksBtn = document.getElementById('completedTasks');
function renderTasks(tasks) {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <p>Due Date: ${task.dueDate}</p>
    <p>Status: ${task.status}</p>
    <button class="toggleStatusBtn">${task.status === 'Pending' ? 'Mark as Completed' : 'Mark as Pending'}</button>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
    `;
    taskList.appendChild(taskElement);
    const toggleStatusBtn = taskElement.querySelector('.toggleStatusBtn');
    toggleStatusBtn.addEventListener('click', () => {
    taskManager.toggleTaskStatus(index);
    renderTasks(taskManager.tasks);
    });
const editBtn = taskElement.querySelector('.editBtn');
editBtn.addEventListener('click', () => {
        const { title, description, dueDate } = task;
        const updatedTitle = prompt('Enter new title:', title);
        const updatedDescription = prompt('Enter new description:', description);
        const updatedDueDate = prompt('Enter new due date:', dueDate);
        taskManager.editTask(index, updatedTitle, updatedDescription, updatedDueDate);
        renderTasks(taskManager.tasks);
    });
    const deleteBtn = taskElement.querySelector('.deleteBtn');
    deleteBtn.addEventListener('click', () => {
    taskManager.deleteTask(index);
    renderTasks(taskManager.tasks);
    });
 });
}
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('descriptionInput').value;
    const dueDate = document.getElementById('dueDateInput').value;
    const task = new Task(title, description, dueDate);
    taskManager.addTask(task);
    renderTasks(taskManager.tasks);
    taskForm.reset();
});
allTasksBtn.addEventListener('click', () => {
    renderTasks(taskManager.tasks);
});
pendingTasksBtn.addEventListener('click', () => {
    const pendingTasks = taskManager.filterTasks('Pending');
    renderTasks(pendingTasks);
});
completedTasksBtn.addEventListener('click', () => {
    const completedTasks = taskManager.filterTasks('Completed');
    renderTasks(completedTasks);
});
window.addEventListener('load', () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    taskManager.tasks = tasks;
    renderTasks(taskManager.tasks);
});
window.addEventListener('beforeunload', () => {
 localStorage.setItem('tasks', JSON.stringify(taskManager.tasks));
});