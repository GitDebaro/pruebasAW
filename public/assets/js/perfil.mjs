import * as rest_api from "./modules/rest-api.mjs";
import * as html from "./modules/html-profile.mjs";

let usuario;

document.addEventListener("DOMContentLoaded", async (e) => {
    e.preventDefault();
    const response = await rest_api.getUserInfo();
    const result = await response.json();

    html.actualizarUsuario(result[0]);
    usuario = result[0];
});

document.getElementById('botVolver').addEventListener('click', (e) => {
    e.preventDefault();
    //Redirige a la persona al perfil
    window.location.replace('/dashboard');
});

document.getElementById('mostrarDiag').addEventListener('click', (e) => {
    e.preventDefault();
    const diag = document.getElementById('diag');
    diag.showModal();
});

document.getElementById('cerrarDiag').addEventListener('click', (e) => {
    e.preventDefault();
    const diag = document.getElementById('diag');
    diag.close();
});

document.getElementById('img-update').addEventListener('submit', async (e) => {
    try {
        const user = usuario;
        user.image = document.getElementById('url').value;
        document.getElementById('url').value = '';

        const response = await rest_api.updateUser(user);
        if (response.status !== 200) {
            alert("No se ha podido actualizar la foto de perfil.");
            throw new Error("No se ha podido actualizar la foto de perfil.");
        }
        const updated = await response.json();
        html.actualizarUsuario(updated);
        usuario = updated;
    }
    catch (error) {
        alert("Error al intentar actualizar la foto de perfil.");
        throw new Error("Error al intentar actualizar la foto de perfil.");
    }
});

document.getElementById('addArt').addEventListener('submit', async (e) => {
    e.preventDefault();
    const artData = new FormData(document.forms["addArt"]);
    artData.append("vendedor", usuario.email);

    try {
        const response = await rest_api.insertarArticulo(artData);
        await response.json();

        alert("Artículo añadido correctamente");
        document.forms["addArt"].reset();
        location.reload();  // Recargar la página
    }
    catch (error) {
        alert("Error al intentar crear el artículo.");
        throw new Error("Error al intentar crear el artículo.");
    }
})



// Función para crear una tarjeta de producto
function crearTarjetaProducto(producto) {
    // Crear un botón para representar el artículo
    const botonArticulo = document.createElement('button');
    botonArticulo.className = 'product-card';

    //Crear y añadir la imagen del producto
    const imagen = document.createElement('img');
    imagen.src = producto.imagen.hires;
    botonArticulo.appendChild(imagen);


    // Crear y añadir el título del producto
    const titulo = document.createElement('h2');
    titulo.innerText = producto.name;
    botonArticulo.appendChild(titulo);


    /*
      // Crear y añadir la descripción del producto
      const descripcion = document.createElement('p');
      descripcion.innerText = producto.descripcion;
      botonArticulo.appendChild(descripcion);
    */

    // Crear y añadir el precio del producto
    const precio = document.createElement('p');
    precio.innerText = `Precio: ${producto.precio}€`;
    botonArticulo.appendChild(precio);

    /*
    //Crear y añadir el vendedor
    const vendedor = document.createElement('p');
    vendedor.innerText = producto.vendedor;
    botonArticulo.appendChild(vendedor);
    */
    // Obtener el elemento para mostrar detalles adicionales
    const elementoDetalles = document.getElementById('detallesPerfil');

    // Añadir evento al pasar el ratón sobre el botón para mostrar detalles
    botonArticulo.addEventListener('mouseenter', () => {
        // Limpiar los detalles anteriores
        elementoDetalles.innerHTML = '';
        elementoDetalles.style.display = 'block';
        // Añadir los detalles del producto
        const detallesTitulo = document.createElement('h2');
        detallesTitulo.innerText = producto.name;
        elementoDetalles.appendChild(detallesTitulo);


        const detallesImagen = document.createElement('img');
        detallesImagen.src = producto.imagen.hires;
        elementoDetalles.appendChild(detallesImagen);


        const detallesDescripcion = document.createElement('p');
        detallesDescripcion.innerText = `Descripción: ${producto.descripcion}`;
        elementoDetalles.appendChild(detallesDescripcion);

        const detallesPrecio = document.createElement('p');
        detallesPrecio.innerText = `Precio: ${producto.precio}€`;
        elementoDetalles.appendChild(detallesPrecio);

    });

    // Añadir evento al quitar el ratón del botón para ocultar detalles
    botonArticulo.addEventListener('mouseleave', () => {
        elementoDetalles.innerText = '';

    });

    botonArticulo.addEventListener('click', () => {
        console.log("Click");
        retirarArtículo(producto.name);
    });

    // Retornar el botón del artículo completo
    return botonArticulo;
}

// Función para añadir tarjetas de productos al catálogo
function anadirProductosAlCatalogo(productos) {
    // Obtener el elemento del catálogo
    const catalogo = document.getElementById('productosPerfil');

    catalogo.innerHTML = '';

    // Iterar sobre cada producto y crear una tarjeta para añadirla al catálogo
    productos.forEach(producto => {
        const tarjeta = crearTarjetaProducto(producto);
        catalogo.appendChild(tarjeta);
    });
}


async function cargarCatalogoAlIniciar() {
    try {
        // Llama a la función 'buscarArticulo' del módulo 'rest_api' sin argumentos para obtener todos los artículos
        const response = await rest_api.obtenerInventario();

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

async function retirarArtículo(product){
    const opt = confirm(`¿Desea retirar ${product} de la venta?`);
    if (!opt) {
      return;
    }

    try{
        const response = await rest_api.eliminarArticulo(product);
        alert("El artículo se eliminó correctamente");
        location.reload();
    }
    catch(error){
        console.error('ERROR: ', error);
        alert('Error al eliminar el artículo: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', cargarCatalogoAlIniciar);

console.log("Módulo perfil cargado");

