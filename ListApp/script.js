// Class: represent task
class Task {
    constructor(title, description, city, date){
        this.title = title;
        this.description = description;
        this.city = city;
        this.date = date;
    }
}

//Store
class Store {
    static getTasks () {
        let tasks;
        if(localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }

    static addTask(task) {
        const tasks = Store.getTasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static removeTask(title) {
        const tasks = Store.getTasks();

        tasks.forEach((task, index) => {
            if(task.title === title) {
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

// UI
class UI {
    static displayTasks () {
        const tasks = Store.getTasks();

        tasks.forEach((task) => UI.addTaskToList(task));
    }

    static addTaskToList(task) {
        const list = document.getElementById('task-list');

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${task.title}</td>
        <td>${task.description}</td>
        <td>${task.city}</td>
        <td>${task.date}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    static deleteTask(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.getElementById('task-form');
        container.insertBefore(div, form);
        // vanish
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearInputs() {
        document.getElementById('title').value = '';
        document.getElementById('description').value = '';
        document.getElementById('city').value = '';
        document.getElementById('date').value = '';
    }
}

// Event dsiplay tasks
UI.displayTasks();


//add a task
document.getElementById('task-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get from values
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const city = document.getElementById('city').value;
    const date = document.getElementById('date').value;

    //validate
    if(title === '' || description === '' || city === '' || date === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
    // instatiate task
    const task = new Task(title, description, city, date);

    //add task to UI
    UI.addTaskToList(task);

    //add task to store
    Store.addTask(task);

    // successfully added task
    UI.showAlert('Task Added', 'success');

    //clear inputs
    UI.clearInputs();
    }

    
});

//remove a task
document.getElementById('task-list').addEventListener('click', (e) => {
    // remove task from UI
    UI.deleteTask(e.target)

    //remove task from store
    Store.removeTask(e.target.parentElement.previousElementSibling.textContent);

    // Task removed
    UI.showAlert('Task Removed', 'success');
});