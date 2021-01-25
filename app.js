'use strict';

//Selector
const form = document.querySelector('.todo_input');
const input = document.querySelector('input');
const ul = document.querySelector('.content');
const refresh = document.querySelector('#refresh');
const filter = document.querySelector('#filter');

//Variable
const UNCHECK = 'fa-circle';
const CHECK = 'fa-check-circle';
const TRASH = 'fa-trash';
const LINE_THROUGH = 'lineThrough';

let LIST;
let ID;
let data = localStorage.getItem('todos');

if (data) {
    LIST = JSON.parse(data);
    ID = LIST.length;
    LIST.forEach(todo => {
        addTodo(todo.text, todo.id, todo.done, todo.trash);
    });
} else {
    LIST = [];
    ID = 0;
};


//addEventListener

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const todo = input.value;
    if (todo) {
        const arr = {
            text: input.value,
            id: ID,
            done: false,
            trash: false
        }

        LIST.push(arr);
        localStorage.setItem('todos', JSON.stringify(LIST));
        addTodo(todo, ID, false, false);
        ID++;
    }
    input.value = '';
});

ul.addEventListener('click', (event) => {
    const i = event.target;
    if (i.getAttribute('job') == 'complete') {
        setCheck_Uncheck(i);
    } else if (i.getAttribute('job') == 'trash') {
        TodoDelete(i);
    }
    localStorage.setItem('todos', JSON.stringify(LIST));
});

refresh.addEventListener('click', refreshTodo);

filter.addEventListener('click', filterTodo);



//Function 

function filterTodo(event) {
    const list = ul.children;
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        switch (event.target.value) {
            case 'all':

                element.style.display = 'flex';
                break;
            case 'complete':
                if (element.firstChild.className == `far ${CHECK}`) {
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }
                break;
            case 'uncomplete':
                if (element.firstChild.className !== `far ${CHECK}`) {
                    // 체크되지 않은 것을 보여주라 
                    element.style.display = 'flex';
                } else {
                    element.style.display = 'none';
                }
                break;
        }
    }
}


function refreshTodo() {
    localStorage.clear();
    location.reload();
};

function addTodo(todo, id, done, trash) {
    if (trash) { //trash가 true이면 바꾸 시킴 
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const checkBtn = done ? LINE_THROUGH : 'text';

    const li = document.createElement('li');
    const i = document.createElement('i');
    const p = document.createElement('p');
    const i2 = document.createElement('i');
    li.classList = 'item';
    i.classList = `far ${DONE}`;
    i.id = id;
    p.classList = checkBtn;
    p.innerText = todo;
    i2.classList = `fas fa-trash`;
    i2.id = id;
    i.setAttribute('job', 'complete');
    i2.setAttribute('job', 'trash');
    i2.setAttribute('title', '삭제하기');
    ul.appendChild(li);
    li.appendChild(i);
    li.appendChild(p);
    li.appendChild(i2);
};

function setCheck_Uncheck(i) {
    i.classList.toggle(UNCHECK);
    i.classList.toggle(CHECK);
    i.parentNode.querySelector('.text').classList.toggle(LINE_THROUGH);
    LIST[i.id].done = LIST[i.id].done ? false : true;
}

function TodoDelete(i) {
    LIST[i.id].trash = true;
    const todo = i.parentNode;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', () => {
        todo.remove();
    });
};








