const taskInput = document.getElementById('task-input')
const searchInput = document.getElementById('search-task')
const tasks = document.getElementById('tasks')
tasks.innerHTML = localStorage.getItem('tasks')
const addButton = document.getElementById('add-button')
let isUnique = true
let timeOutId;

buttonDisable()
showAllTasks()

function addTask() {
    isUnique = true
    const task = document.createElement('div')
    const taskName = document.createElement('div')
    task.innerHTML = '<img src="img/icons/delete-icon.png" class="icon delete-icon" onclick="deleteTask(this)">'
    task.innerHTML += '<img src="img/icons/unchecked.png" class="icon unchecked" onclick="checkTask(this)">'
    const uniqueTitles = document.getElementsByClassName('task-name')
    Array.from(uniqueTitles).forEach(val => {
        if (taskInput.value === val.innerText) {
            isUnique = false
            taskInput.classList.add('danger-border')
            buttonDisable()
        }
    })
    if (isUnique) {
        taskInput.classList.remove('danger-border')
        task.classList.add('task')
        task.appendChild(taskName)
        taskName.append(taskInput.value)
        taskName.classList.add('task-name')
        tasks.appendChild(task)
        window.localStorage.setItem('tasks', tasks.innerHTML)
        taskInput.value = ''
        buttonDisable()
    }
}

function deleteTask(event) {
    event.closest('.task').remove()
    window.localStorage.setItem('tasks', tasks.innerHTML)
}

function checkTask(event) {
    event.closest('.task').classList.toggle('done-task')
    const taskName = event.closest('.task').querySelector('.task-name')
    let uncheckedImg = event.closest('.task').querySelector('.unchecked')
    taskName.classList.toggle('line-through')
    taskName.classList.contains('line-through') ? uncheckedImg.src = 'img/icons/check-mark.png' : uncheckedImg.src = 'img/icons/unchecked.png'
    window.localStorage.setItem('tasks', tasks.innerHTML)
}

searchInput.oninput = function() {
    clearTimeout(timeOutId);
    timeOutId = setTimeout(searchTask, 800);
}

function searchTask() {
    const tasks = document.getElementsByClassName('task-name')
        Array.from(tasks).forEach(el => {
            if (!el.innerText.includes(searchInput.value) && searchInput.value) {
                el.closest('.task ').classList.add('task-display')
            } else {
                el.closest('.task ').classList.remove('task-display')
            }
        })
}


function showAllTasks() {
    Array.from(document.getElementsByClassName('task ')).forEach(el => {
        el.classList.remove('task-display')
    })
}

function buttonDisable() {
    addButton.disabled = true
    taskInput.oninput = () => taskInput.value ? addButton.disabled = false : addButton.disabled = true
}

taskInput.onkeydown = (e) => {
    taskInput.classList.remove('danger-border')
    if (e.key === 'Enter') {
        addTask()
    }
}
