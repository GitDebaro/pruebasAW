// Importa todas las funciones y variables del módulo "rest-api.mjs" y las asigna al alias "rest_api".
import * as rest_api from "./modules/rest-api.mjs";

// Añade un listener al formulario con id 'loginForm'. Cuando se envía el formulario,
// previene la acción predeterminada (recargar la página).
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Crea un objeto FormData a partir del formulario con el nombre "loginForm".
    const userData = new FormData(document.forms["loginForm"]);

    // Itera sobre las entradas de userData y las imprime en la consola.
    for (let pair of userData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
    }

    // Verifica si las contraseñas no coinciden. Si no coinciden, muestra una alerta.
    if(userData.get('loginPassword') !== userData.get('loginPasswordrepeat')){
        alert("Las contraseñas no coinciden.");
    } else {
        try {
            // Llama a la función 'registerUser' del módulo 'rest_api', pasándole 'userData' como argumento.
            // Espera a que se resuelva la promesa y guarda la respuesta en la variable 'response'.
            const response = await rest_api.registerUser(userData);
            await response.json();

            // Muestra una alerta indicando que el usuario ha sido creado correctamente.
            alert("Usuario creado correctamente");

            // Reinicia el formulario.
            document.forms["loginForm"].reset();

            // Redirige al usuario a la página de inicio de sesión.
            window.location.href = '/login.html';
        } 
        catch (error) {
            // Si ocurre un error durante la ejecución del bloque try, imprime el error en la consola.
            console.error('ERROR: ', error);
            // Muestra una alerta indicando que hubo un error al intentar registrarse.
            alert('Error al intentar registrarse: ' + error.message);
        }
    }
});

// Imprime en la consola "Módulo registro cargado", indicando que el script se ha cargado correctamente.
console.log("Módulo registro cargado");
