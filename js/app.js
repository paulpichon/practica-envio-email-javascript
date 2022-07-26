//variables
const btnEnviar = document.querySelector('#enviar');
//variables para validar el formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//formuario
const formulario = document.querySelector('#enviar-mail');

//eventListeners
eventListeners();

function eventListeners() {
    //iniciamos app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //validar formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
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
        
        //quitamos mensaje
        const error = document.querySelector('.error');
        if ( error ) {
            error.remove();
        }

        //quitamos clases de error
        e.target.classList.remove('border', 'border-red-500');
        //agregamos clases de error
        e.target.classList.add('border', 'border-green-500');
        
    }else {
        //quitamos clases de success
        e.target.classList.remove('border', 'border-green-500');
        //agregamos clases de error
        e.target.classList.add('border', 'border-red-500');
        //lo enviamos a funcion para mostrar mensaje
        mostrarMensaje('TODOS LOS CAMPOS SON OBLIGATORIOS');
    }
    //validar correo
    if ( e.target.type === 'email' ) {
        //expresion regular
        const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        //validar que sea un correo
        if ( er.test( e.target.value ) ) {
            
            //quitamos mensaje
            const error = document.querySelector('.error');

            if ( error ) {
                error.remove();
            }

            //quitamos clases de error
            e.target.classList.remove('border', 'border-red-500');
            //agregamos clases de error
            e.target.classList.add('border', 'border-green-500');
            
        }else{
            //quitamos clases de success
            e.target.classList.remove('border', 'border-green-500');
            //agregamos clases de error
            e.target.classList.add('border', 'border-red-500');
            //lo enviamos a funcion para mostrar mensaje
            mostrarMensaje('EMAIL INVALIDO');    
        }
    }

}
//creacion funcion mostrar mensajes
function mostrarMensaje( mensaje ) {
    //crear elemento html
    const mensajeError = document.createElement('p');
    //añadimos clases
    mensajeError.classList.add('border', 'border-red-500', 'background-red-100', 'text-red-500', 
    'p-3', 'mt-5', 'text-center', 'error');
    //agregamos texto
    mensajeError.textContent = mensaje;
    //validar que solo se muetre una vez el mensaje
    const errores = document.querySelectorAll('.error');
    //console.log( errores.length );

    if ( errores.length  === 0) {
        //renderizamos en el html
        formulario.appendChild( mensajeError );    
    }

}