//Iniciar los modulos de necesarios
const express = require("express");
const mongoose = require("mongoose");
const frontend = require('./routes/frontend');
const authRoutes = require('./routes/auth');
const log_requests = require("./middlewares/logger");
const bd = require("./models/db");
const articulosRoutes = require('./routes/articulo');
const protectURL = require("./middlewares/protector");
const cookieParser = require('cookie-parser');
const path = require('path');
const data = require('./routes/datos');


const app = express();

const StartServer = async  () =>{
    try{
        
        //conexion para el mongodb
        bd.createConnection();
        console.log('Connected to MongoDB');

        // Middlewares
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use(cookieParser());

        //Plantillas para lo del ejs
        app.set('view engine', 'ejs');
        app.set('views', path.join(__dirname, 'views'));

        //rutas
        app.use("/api", data);
        app.use("/api/tradeWing/users", log_requests,authRoutes);
        app.use("/api/tradeWing/dashboard", log_requests, protectURL, articulosRoutes);
        app.use("/", frontend);

        
        //app.use(express.static('public'));
        app.use('/public', express.static(path.join(__dirname, '../public')));

        //Manejo de errores 404
        app.use((req, res, next) => {
            res.status(404).render('404', { title: '404 - Error' });
        });
        
        // Manejo de errores 500
        app.use((err, req, res, next) => {
            console.error(err.stack);
            res.status(500).render('500', { title: '500 - Error de servidor' });
        });

        const port = process.env.WEBAPP_PORT;

        app.listen(port, () => {
            console.log(`Servidor web iniciado en el puerto ${port}. Pulse Ctrl+C para detenerlo.`);
        });
    } catch (e) {
        console.log('Failed to start server', e);
    }
    
};

console.log("Iniciando el servidor");
StartServer();