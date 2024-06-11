// Importa todas las funciones y variables del módulo "rest-api.mjs" y las asigna al alias "rest_api".
import * as rest_api from "./modules/rest-api.mjs";

// Importa la función específica "anadirProductosAlCatalogo" del módulo "html-components.mjs".
import { anadirProductosAlCatalogo } from "./modules/html-components.mjs";

//cesta de la compra
export let cesta = [];

//variable que almacena los articulos de la bbdd
let articulos = [];

//====================================================================================


// Añade un listener al formulario con id 'searchForm'. Cuando se envía el formulario,
// previene la acción predeterminada (recargar la página).
document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  // Obtiene el valor del input con id 'name' y lo guarda en la variable 'busqueda'.
  const busqueda = document.getElementById('name').value;

  try {
    // Llama a la función 'buscarArticulo' del módulo 'rest_api', pasándole 'busqueda' como argumento.
    // Espera a que se resuelva la promesa y guarda la respuesta en la variable 'response'.
    const response = await rest_api.buscarArticulo(busqueda);

    // Convierte la respuesta en un objeto JSON y lo guarda en la variable 'articulos'.
    const articulos = await response.json();

    // Si hay artículos en el array, imprime "Articulos encontrados" en la consola.
    if (articulos != null && articulos.length > 0) {
      anadirProductosAlCatalogo(articulos);
    }
    // Si no hay artículos en el array, muestra una alerta indicando que no se encontró el objeto.
    else {
      alert("Objeto no encontrado");
    }

  } catch (error) {
    // Si ocurre un error durante la ejecución del bloque try, imprime el error en la consola.
    //console.error('ERROR: ', error);

    // Muestra una alerta con el mensaje de error.
    alert('Objeto no encontrado');
  }
});

document.getElementById('boton-pagar').addEventListener('click', (e) => {
  e.preventDefault();
  pagarYquitar();
});

document.getElementById('botPerfil').addEventListener('click', (e) => {
  e.preventDefault();
  //Redirige a la persona al perfil
  window.location.replace('/perfil');
});

document.getElementById('logout').addEventListener('click', async (e) => {
  e.preventDefault();
  //Pedir al usuario confirmación
  const opt = confirm("¿Desea cerrar sesión?");
  if (!opt) {
    return;
  }

  try {
    const response = await rest_api.logoutUser();

    console.log(response.status);
    if (response.status !== 204) {
      throw new Error("No se ha podido cerrar sesión.");
    }

    window.location.replace('/');
  } catch (error) {
    alert("Error al cerrar sesión");
  }
});
//funcion para aniadir a la cesta un articulo
export const addArticuloCarrito = (nombreArticulo) => {

  const nombreToLower = nombreArticulo.toLowerCase();
  if (cesta.length === 0) {
    cesta.push([nombreArticulo, 1]);
    console.log(cesta.length);
    console.log('cesta estaba vacía');
  } else {


    for (let i = 0; i < cesta.length; i++) {
      if ((cesta[i][0].toLowerCase()).includes(nombreToLower)) {
        return;
      }
    }

    cesta.push([nombreArticulo, 1]);
    console.log(cesta);
    console.log(`Añado articulo "${nombreArticulo}" a cesta con articulos`);
  }
};

//eliminar del carrito un producto
export const removeArticuloCarrito = (nombreArticulo) => {

  const articuloToLower = nombreArticulo.toLowerCase();

  for (let i = 0; i < cesta.length; i++) {
    if ((cesta[i][0].toLowerCase()).includes(articuloToLower)) {
      if (cesta[i][1] > 1) {
        cesta[i][1] = cesta[i][1] - 1;
        console.log(`Articulo "${nombreArticulo}" reducido en 1 unidad`);
      } else {
        cesta.splice(i, 1);
        console.log(`Articulo "${nombreArticulo}" eliminado de la cesta`);
      }
      return;
    }
  }
  console.log(`El articulo "${nombreArticulo}" no está en la cesta.`);
};


// Función para cargar el catálogo al iniciar la página
async function cargarCatalogoAlIniciar() {
  try {
    // Llama a la función 'buscarArticulo' del módulo 'rest_api' sin argumentos para obtener todos los artículos
    const response = await rest_api.buscarArticulo("");

    // Convierte la respuesta en un objeto JSON
    const articulos = await response.json();

    // Añade los artículos al catálogo usando la función 'anadirProductosAlCatalogo'
    anadirProductosAlCatalogo(articulos);

  } catch (error) {
    // Si ocurre un error, imprime el error en la consola
    console.error('ERROR: ', error);
    // Muestra una alerta con el mensaje de error
    alert('Error al cargar el catálogo: ' + error.message);
  }
}
async function pagarYquitar() {
  const cesta = document.getElementById("cesta-compra");
  const articulosCesta = cesta.querySelectorAll("li");

  if(articulosCesta.length === 0){
    alert("La cesta está vacía. Introduzca algún producto para realizar una compra.");
    return;
  }

  articulosCesta.forEach(articulo => {
    const boton = articulo.querySelector("button");

    if (boton) {
      console.log(boton.name);
    }

    const articuloTexto = boton.name;

    console.log(articuloTexto);
    eliminarArticuloBBDD(articuloTexto);
  });
  

  alert("La compra ha sido realizada");
  location.reload();  // Recargar la página
}

async function eliminarArticuloBBDD(nombreArticulo) {
  try {

    const response = await rest_api.eliminarArticulo(nombreArticulo);

  } catch (error) {
    console.error('ERROR: ', error);
    alert('Error al eliminar el artículo: ' + error.message);
  }
}

// Llama a la función 'cargarCatalogoAlIniciar' cuando se carga la página
document.addEventListener('DOMContentLoaded', cargarCatalogoAlIniciar);

// Imprime en la consola "Módulo dashboard cargado", indicando que el script se ha cargado correctamente.
console.log("Módulo dashboard cargado");
