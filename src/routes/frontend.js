/*
* @module routes/frontend
*/

// Importa el módulo 'express' que se utiliza para crear un servidor web.
const express = require('express');
// Importa el módulo 'path' que se utiliza para trabajar con rutas de archivos y directorios.
const path = require('path');
// Importa el middleware 'protectURL' desde el archivo correspondiente para proteger rutas específicas.
const protectURL = require('../middlewares/protector');

// Crea un nuevo enrutador utilizando Express.
const router = express.Router();
// Define la ruta al directorio público donde se encuentran los archivos estáticos.
const publicDir = `${__dirname}/../../public/`;

// Ruta para mostrar el index: utiliza 'express.static' para servir archivos estáticos desde 'publicDir'.
router.use('/', express.static(publicDir));

// Ruta para mostrar el dashboard: utiliza 'protectURL' como middleware para proteger la ruta '/dashboard'.
// Sirve el archivo estático 'dashboard.html' desde el directorio público.
router.use('/dashboard', protectURL, express.static(`${publicDir}dashboard.html`));

// Ruta para mostrar el perfil: utiliza 'protectURL' como middleware para proteger la ruta '/perfil'.
// Sirve el archivo estático 'perfil.html' desde el directorio público.
router.use('/perfil', protectURL, express.static(`${publicDir}perfil.html`));
// Exporta el enrutador para que pueda ser utilizado en otros módulos.
module.exports = router;