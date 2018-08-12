document.addEventListener('DOMContentLoaded', e => {
    const addTodoButton = document.querySelector('.add-todo__square');
    const form = document.querySelector('.form');
    const formInput = document.querySelector('.form__input');
   
    const removeTodo = function() {
        const elementId = this.parentElement.getAttribute('mongo-id');

        fetch(`http://127.0.0.1:3000/todos/${elementId}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            const todoToRemove = document.querySelector(`[mongo-id="${String(json._id)}"]`);
            todoToRemove.parentElement.removeChild(todoToRemove);
        })
        .catch(e => console.log(e))
    };

    const toggleTodo = function() {
        const todo = this.parentElement.parentElement;
        const elementId = todo.getAttribute('mongo-id');
        const tick = this.nextElementSibling.children[0];

        fetch(`http://127.0.0.1:3000/todos/${elementId}`,{
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Access-Control-Allow-Origin':'*' ,
                'Access-Control-Allow-Methods': 'PATCH',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({finished: todo.classList.contains('todo--complete')? false : true})
        })
        .then(res => {
            console.log(todo.classList)
            if(todo.classList.contains('todo--complete')) {
                todo.classList.remove('todo--complete');
                tick.classList.add('hidden');
            } else {
                todo.classList.add('todo--complete');
                tick.classList.remove('hidden');
            }
        })
            
        .catch(e => console.error(e))
    };

    const buildTodo = (content, finished, id) => {
        e.preventDefault();
        const newTodo = document.createElement('li');
        newTodo.classList.add('todo');
        newTodo.setAttribute('mongo-id', id);
        if(finished === true) {
            newTodo.classList.add('todo--complete');
        }

        const todoList = document.getElementById('todo-list');

        const newTodoSqr = document.createElement('div');
        newTodoSqr.classList.add('todo__square');
       
        const newCheckbox = document.createElement('input');
        newCheckbox.classList.add('todo__square__checkbox');
        newCheckbox.addEventListener('click', toggleTodo)
        
        const newTick = document.createElement('span');
        newTick.classList.add('tick');
        if(finished === false) {
            newTick.classList.add('hidden');
        }
        
        const newCheckboxStyled = document.createElement('span');
        newCheckboxStyled.classList.add('todo__square__checkbox-styled');

        const newTodoText = document.createElement('span');
        newTodoText.classList.add('todo__text');
        newTodoText.innerText = content;

        const newTrash = document.createElement('a');
        newTrash.classList.add('todo__trash');
        
        const newTrashLayer = document.createElement('div');
        newTrashLayer.classList.add('todo__trash__layer');
        newTrash.addEventListener('click', removeTodo);
        
        newTodo.appendChild(newTodoSqr);
        newTodoSqr.appendChild(newCheckbox);
        newTodoSqr.appendChild(newCheckboxStyled);
        newCheckboxStyled.appendChild(newTick)
        newTodo.appendChild(newTodoText);
        newTodo.appendChild(newTrash);
        newTrash.appendChild(newTrashLayer);

        todoList.appendChild(newTodo);
        formInput.value = '';
    };

    const getTodos = () => {
        fetch('http://127.0.0.1:3000/todos')
        .then(res => res.json())
        .then(json =>  {
            json.forEach(element => {
                buildTodo(element.content, element.finished, element._id);
            });
        })
        .catch(err => console.log('error occured!'));
    }

    const addTodo = text => {
        fetch('http://127.0.0.1:3000/todos', {
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({content: text, finished: false})
        })
        .then(res => res.json())
        .then(json =>{
            if (json.message === 'such todo already exsts!') {
                alert('You cannot make duplicate todo!');
            } else {
                buildTodo(json.content, json.finished, json._id);
            }
        })
        .catch(err => console.log(err));
    }

    getTodos();
    
    form.addEventListener('submit', e => {
        
        e.preventDefault();
        const todoText = formInput.value;
        addTodo(todoText);
    });
});





