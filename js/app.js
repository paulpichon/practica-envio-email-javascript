//variables
const btnEnviar = document.querySelector('#enviar');
//variables para validar el formulario
const email = document.querySelector('#email');


//eventListeners
eventListeners();

function eventListeners() {
    //iniciamos app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //validar formulario
    email.addEventListener('blur', validarFormulario);
}

//funciones
//iniciar app
function iniciarApp() {
    //desactivamos le boton enviar
    btnEnviar.disabled = true;
    //agregamos clases
    btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
}

//validar los campos del formulario
function validarFormulario( e ) {
    //console.log( e.target.value.length );
    //validamos que no esten vacios los campos
    if ( e.target.value.length > 0) {
        console.log("hay algo");
    }else {
        //agregamos clases de error
        e.target.classList.add('border', 'border-red-500');
        //lo enviamos a funcion para mostrar mensaje
        mostrarMensaje('TODOS LOS CAMPOS SON OBLIGATORIOS');
    }
    
}