// Importa el módulo 'express' que se utiliza para crear un servidor web.
const express = require('express');
// Crea un nuevo enrutador utilizando Express.
const router = express.Router();
// Importa el modelo de datos 'User' desde el archivo correspondiente.
const User = require('../models/User');
// Importa el controlador de autenticación desde el archivo correspondiente.
const auth_controller = require("../controllers/authentication");

// Ruta de login: define una ruta POST para '/email' que utiliza la función 'login' del controlador 'auth_controller'.
router.post('/email', auth_controller.login);

// Ruta de registro: define una ruta POST para '/register' que utiliza la función 'register' del controlador 'auth_controller'.
router.post('/register', auth_controller.register);

//Ruta de logout
router.get('/logout', auth_controller.logout);

//Ruta para obtener los datos de un usuario
router.get('/info', auth_controller.info);

router.put('/info', auth_controller.update);

// Exporta el enrutador para que pueda ser utilizado en otros módulos.
module.exports = router;
