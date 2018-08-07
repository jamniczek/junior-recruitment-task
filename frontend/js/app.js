document.addEventListener('DOMContentLoaded', e => {
    const addTodoButton = document.querySelector('.add-todo__square');
    const formInput = document.querySelector('.form__input');

    addTodoButton.addEventListener('click', e => {
        
        e.preventDefault();
        const removeTodoButtons = document.querySelectorAll('.todo__trash');
        const newTodo = document.createElement('li')
        newTodo.classList.add('todo')
        const todoList = document.getElementById('todo-list');

        const newTodoSqr = document.createElement('div')
        newTodoSqr.classList.add('todo__square');
        const newCheckbox = document.createElement('input')
        newCheckbox.classList.add('todo__square__checkbox');
        const newTick = document.createElement('span');
        newTick.classList.add('tick', 'hidden')
        const newCheckboxStyled = document.createElement('span')
        newCheckboxStyled.classList.add('todo__square__checkbox-styled');
        newCheckbox.addEventListener('click', function(e) {
            this.parentElement.parentElement.classList.toggle('todo--complete');
            // this.children[1].classList.toggle('hidden');
            console.log(this.nextElementSibling.children[0].classList.toggle('hidden'))

        });

        const newTodoText = document.createElement('span')
        newTodoText.classList.add('todo__text');
        newTodoText.innerText = formInput.value;
        const newTrash = document.createElement('a')
        newTrash.classList.add('todo__trash');
        const newTrashLayer = document.createElement('div')
        newTrashLayer.classList.add('todo__trash__layer');
        newTrash.addEventListener('click', function(e) {
            this.parentElement.parentElement.removeChild(this.parentElement)
        })

        
        newTodo.appendChild(newTodoSqr);
        newTodoSqr.appendChild(newCheckbox);
        newTodoSqr.appendChild(newCheckboxStyled);
        newCheckboxStyled.appendChild(newTick)
        newTodo.appendChild(newTodoText);
        newTodo.appendChild(newTrash);
        newTrash.appendChild(newTrashLayer);

        todoList.appendChild(newTodo);
        formInput.value = '';
    });
});



{/* <li class="todo">
<div class="todo__square">
    <input class="todo__square__checkbox" type="checkbox" name="taskDone" id="taskDone">
    <span class="todo__square__checkbox-styled"></span>
</div>
<span class="todo__text">some to do dsadsad dsadsada sadsadad sadsada sadsad asdsadsad</span>
<a href="" class="todo__trash">
    <div class="todo__trash__layer"></div>
</a>
</li> */}


