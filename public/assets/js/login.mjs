// Importa todas las funciones y variables del módulo "rest-api.mjs" y las asigna al alias "rest_api".
import * as rest_api from "./modules/rest-api.mjs";

// Añade un listener al formulario con id 'loginForm'. Cuando se envía el formulario,
// previene la acción predeterminada (recargar la página).
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtiene el valor del input con id 'email' y lo guarda en la variable 'email'.
  const email = document.getElementById('email').value;
  // Obtiene el valor del input con id 'password' y lo guarda en la variable 'password'.
  const password = document.getElementById('password').value;

  try {
    // Llama a la función 'loginUser' del módulo 'rest_api', pasándole 'email' y 'password' como argumentos.
    // Espera a que se resuelva la promesa y guarda la respuesta en la variable 'response'.
    const response = await rest_api.loginUser(email, password);

    // Convierte la respuesta en un objeto JSON y lo guarda en la variable 'user'.
    const user = await response.json();

    // Si hay un usuario (la longitud del objeto 'user' es mayor a 0), redirige al usuario al dashboard.
    if (user.length > 0) {
      window.location.replace('/dashboard');
    }

  } catch (error) {
    // Si ocurre un error durante la ejecución del bloque try, imprime el error en la consola.
    //console.error('ERROR: ', error);
    // Muestra una alerta indicando que las credenciales proporcionadas no son válidas.
    alert("Credenciales proporcionadas no válidas.");
  }
});

// Imprime en la consola "Módulo Login cargado", indicando que el script se ha cargado correctamente.
console.log("Módulo Login cargado");
