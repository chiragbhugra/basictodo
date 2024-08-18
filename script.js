document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const li = document.createElement('li');
            li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
            li.innerHTML = `
                <input type="checkbox" ${todo.completed ? 'checked' : ''}>
                <span class="todo-text">${todo.text}</span>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            `;

            const checkbox = li.querySelector('input[type="checkbox"]');
            checkbox.addEventListener('change', () => {
                todos[index].completed = checkbox.checked;
                saveTodos();
                renderTodos();
            });

            const editBtn = li.querySelector('.edit-btn');
            editBtn.addEventListener('click', () => {
                enterEditMode(li, todo, index);
            });

            const deleteBtn = li.querySelector('.delete-btn');
            deleteBtn.addEventListener('click', () => {
                todos.splice(index, 1);
                saveTodos();
                renderTodos();
            });

            todoList.appendChild(li);
        });
    }

    function enterEditMode(li, todo, index) {
        li.innerHTML = `
            <input type="text" class="edit-input" value="${todo.text}">
            <button class="save-btn">Save</button>
            <button class="delete-btn">Delete</button>
        `;

        const editInput = li.querySelector('.edit-input');
        const saveBtn = li.querySelector('.save-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        editInput.focus();

        saveBtn.addEventListener('click', () => {
            const newText = editInput.value.trim();
            if (newText) {
                todos[index].text = newText;
                saveTodos();
                renderTodos();
            }
        });

        deleteBtn.addEventListener('click', () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });
    }

    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const todoText = todoInput.value.trim();
        if (todoText) {
            todos.push({ text: todoText, completed: false });
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    renderTodos();
});