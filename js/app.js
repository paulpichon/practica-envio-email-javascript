//variables
const btnEnviar = document.querySelector('#enviar');
//variables para validar el formulario
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
//formuario
const formulario = document.querySelector('#enviar-mail');
//expresion regular
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


//eventListeners
eventListeners();

function eventListeners() {
    //iniciamos app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //validar formulario
    email.addEventListener('blur', validarFormulario);
    asunto.addEventListener('blur', validarFormulario);
    mensaje.addEventListener('blur', validarFormulario);
    //enviar correo
    formulario.addEventListener('submit', enviarCorreo);
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

    //enviar mensajes despues de validar que lso campos son correctos
    if ( er.test( email.value ) && asunto.value !== '' && mensaje.value !== '' ) {
        //activamos el boton enviar
        btnEnviar.disabled = false;
        //quitamos clases
        btnEnviar.classList.remove('cursor-not-allowed', 'opacity-50');
        
    }else{
        //desactivamos le boton enviar
        btnEnviar.disabled = true;
        //agregamos clases
        btnEnviar.classList.add('cursor-not-allowed', 'opacity-50');
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

//enviar mensaje/correo
function enviarCorreo( e ) {
    //PREVENIR EL REFRESH DE LA PAGINA
    e.preventDefault();
    //spinner
    const spinner = document.querySelector('#spinner');
    //mostramos el spinner
    spinner.style.display = 'flex';

    //quitamos despues de 3 segundos
    setTimeout(() => {
        //quitamos el spinner
        spinner.style.display = 'none';
        //mostramos mensaje
        const parrafo = document.createElement('p');
        //añadimos clases
        parrafo.classList.add('text-center', 'my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase')
        //añadimos texto
        parrafo.textContent = 'MENSAJE ENVIADO';
        //renderizamos el mensaje
        formulario.insertBefore(parrafo, spinner);

        //quitamos mensaje despues de 4 segundos
        setTimeout(() => {
            //quitar mensaje
            parrafo.remove();
            //reseteamos el formulario
            resetearFormulario();
        }, 4000);

    }, 3000);
}
//resetear el formulario
function resetearFormulario() {
    //reseteo
    formulario.reset();
    //inicar app
    iniciarApp();
    //quitar clases
    if ( email.classList.contains('border-green-500') || 
        asunto.classList.contains('border-green-500') ||
        mensaje.classList.contains('border-green-500')) {
        
            email.classList.remove('border', 'border-green-500');
            asunto.classList.remove('border', 'border-green-500');
            mensaje.classList.remove('border', 'border-green-500');

    }
}