let tasks = [] // se declara un array vacio para almacenar las tareas
let id = 1; // se declara el id de las tareas que comienza en 1

const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");
const listItems = document.getElementById("listItems");

function renderTask(task){ // funcion para mostrar las tareas en la pagina html y recibe como parametro una tarea
    const li = document.createElement('li'); // para crear un elemento (li) es decir una tarea de la lista
    const input = document.createElement('input');// se crea tambien un input
    input.setAttribute('type', 'checkbox');// se le crea un atributo al input (atributo checkbox)
    const span = document.createElement('span'); // se crea un elemento "span" para guardar el item (la tarea)

    span.textContent = task.title; // para mostrar solo el titulo de la tarea

    li.appendChild(input); // para agregar  el input de tipo checkbox a la lista renderizada (html)
    li.appendChild(span);// para agregar el titulo (span) de la tarea a la lista renderizada (html)
    li.addEventListener('click', function(event,task){ // evento para actualizar la tarea
        handleCheckTask(event,task)
    });

    listItems.appendChild(li);// se agrega la tarea a la lista de tareas
}


function handleSubmit(event){
    event.preventDefault();// para evitar que se recarge la pagina al presionar el boton
    const input = document.getElementById('tarea');// obtenemos el elemento imput del html para poder manipularlo
    const task = { // creacion de la nueva tarea
        id,
        title: input.value,
        complete: false
    }
    tasks.push(task);// se agrega la tarea creada (task) al array (tasks)
    id += 1; // se aumenta el valor del id
    input.value = '';// se limpa el campo input

    renderTask(task);
}



function handleCheckTask(event){
  
  const input = event.currentTarget.querySelector('input');
  const span = event.currentTarget.querySelector('span');

  const isChecked = input.getAttribute('checked');
  
  if (isChecked){
    input.removeAttribute('checked');
    span.classList.remove('is-completed');
    tasks = tasks.map(item => item.id === task.id ? {...item, complete: false} : item);
  }else{
    input.setAttribute('checked', true);
    span.classList.add('is-completed');
    tasks = tasks.map(item => item.id === task.id ? {...item, complete: true} : item);

  }
}

function handleDelete(event){// funcion para eliminar una tarea de la lista
    event.preventDefault(); // metodo para evitar la recarga de la pagina
    const list = listItems.querySelectorAll('li'); // se declara una variable (list) para almacenar todos los elementos (li) de la lista de elementos (ul)
    list.forEach(element => { // metodo (forEach) para recorrer los elementos de la lista
        const isChecked = element.children[0].getAttribute('checked'); // se declara una variable que es igual al elemento 'li' en la posicion 0 es decir el input tipo chekbox que tenga el atributo checked
        isChecked ? element.remove() : null  // si la variable isChecked es verdadero elimine el elemento (remove()) o si es falso no haga nada (null)

    })
}

addButton.addEventListener('click', function(event){
    handleSubmit(event); // se crea el evento de escucha asociado al boton el cual llamara a la funcion handleSubmit
});

deleteButton.addEventListener('click', function(event){
  handleDelete(event);
});

