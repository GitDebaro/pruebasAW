// Importa el módulo 'express' que se utiliza para crear un servidor web.
const express = require("express");
// Importa el controlador de la API de artículos desde el archivo correspondiente.
const artic_api_controller = require("../controllers/articulo");

// Crea un nuevo enrutador utilizando Express.
const router = express.Router();

// Define una ruta GET para '/articulo' que utiliza la función 'get' del controlador 'artic_api_controller'.
router.get("/articulo", artic_api_controller.get);

//Añadir un articulo a la Base de Datos
router.post("/articulo", artic_api_controller.post);

//Borrar un artículo de la base de datos
router.delete("/articulo", artic_api_controller.deleteArticulo );

//Obtener el inventario de un usuario
router.get("/articulo/inventario", artic_api_controller.getInventory);

// Exporta el enrutador para que pueda ser utilizado en otros módulos.
module.exports = router;
