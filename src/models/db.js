// Importa el módulo 'mongoose' que se utiliza para interactuar con la base de datos MongoDB.
const mongoose = require("mongoose");

// Define una función asincrónica llamada 'createConnection' para establecer una conexión con la base de datos.
const createConnection = async () => {
    // Obtiene la URI de conexión a la base de datos desde las variables de entorno.
    const conn_uri = process.env.WEBAPP_DB_URI;

    // Establece un manejador de eventos para el evento 'error' de la conexión de Mongoose.
    // Cuando ocurre un error, imprime un mensaje de error en la consola.
    mongoose.connection.on("error", (error) => {
        console.error(`[Mongoose] ${error}.`);
    });

    // Establece un manejador de eventos para el evento 'connected' de la conexión de Mongoose.
    // Cuando se establece la conexión, imprime un mensaje en la consola indicando el nombre de la base de datos.
    mongoose.connection.on("connected", () => {
        console.log(`[Mongoose] Conexión establecida con la base de datos ${mongoose.connection.name}.`);
    });

    // Establece un manejador de eventos para el evento 'disconnected' de la conexión de Mongoose.
    // Cuando se pierde la conexión, imprime un mensaje en la consola indicando que se ha desconectado.
    mongoose.connection.on("disconnected", () => {
        console.log(`[Mongoose] Desconexión con la base de datos.`);
    });

    // Intenta conectar a la base de datos utilizando la URI de conexión y devuelve la promesa resultante.
    return mongoose.connect(conn_uri);
};

// Exporta la función 'createConnection' para que pueda ser utilizada en otros módulos.
module.exports = { createConnection };
