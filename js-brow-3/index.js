// Obtener elementos del DOM
const form = document.querySelector('form');
const inputName = document.querySelector('#name');
const inputEmail = document.querySelector('#email')
const section = document.querySelector('section');

// Manejar el evento de enviar el formulario
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = inputName.value; // para obtener el nombre que estamos introduciendo en el input
  const email = inputEmail.value;
  let userList = localStorage.getItem('userList'); // obtener lista de usuarios del localStorage
  userList = userList ? JSON.parse(userList) : [];

  const newUser = { name, email};
  userList.push(newUser); // para agregar datos de nuevo usuario a la lista

  localStorage.setItem("userList", JSON.stringify(userList));// para guardar la lista en el localStorage
  showUserList();// para mostrar la lista de usuarios en la seccion
});

// Función para mostrar el nombre guardado en localStorage
function showUserList() {
    const userList = localStorage.getItem('userList');
   if(userList){
      const users = JSON.parse(userList)
      if(users.length > 0){
         const userListHTML = users.map((user, index) =>{
            return(
            `<div>
                <p>Nombre: ${user.name}</p>
                <p>Correo Electronico: ${user.email}</p>
                <button class="deleteButton" data-index="${index}">Borrar</button>
            </div>`
        )}).join('')
        section.innerHTML = userListHTML;
        const deleteButtons = document.querySelectorAll('.deleteButton')
        deleteButtons.forEach((button) => {
           button.addEventListener('click', deleteUserData); 
        });
        
      }else{
        section.innerHTML = '<p>no hay usuarios registrados</p>'
      }
   } else{
     section.innerHTML = '<p>no hay usuarios registrados</p>'
   }
}
// funcion para borrar la lista de usuarios
function deleteUserData(event){
    const index = event.target.dataset.index;

    let userList = localStorage.getItem('userList');
    userList = userList ? JSON.parse(userList) : []; // para obtener lista de usuarios

    userList.splice(index, 1);// eliminar el indice especificado

   localStorage.setItem('userList', JSON.stringify(userList)); // actualizar lista 

   showUserList();
}
// Mostrar el nombre guardado al cargar la página
showUserList();