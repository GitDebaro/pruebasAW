// Importa el módulo 'jsonwebtoken' que se utiliza para crear y verificar tokens JWT.
const jwt = require('jsonwebtoken');

// Define una función llamada 'protectURL' que recibe los objetos 'req' (solicitud), 'res' (respuesta) y 'next' (siguiente middleware).
const protectURL = (req, res, next) => {

    try {
        // Obtiene el token JWT de las cookies de la solicitud.
        const token = req.cookies.jwt_token;
        
        // Si no existe el token, lanza un error indicando que el acceso está denegado.
        if (!token) {
            throw new Error("Acceso denegado porque el token JWT no existe");
        }

        // Verifica el token JWT utilizando la clave secreta obtenida de las variables de entorno.
        const comprobar = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        // Imprime en la consola un mensaje indicando que el usuario puede acceder a la URL solicitada.
        console.log(`El usuario ${comprobar.name} puede acceder a ${req.baseUrl}.`);

        // Llama a la siguiente función en la cadena de middleware.
        next();
    } catch (error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 401 (no autorizado) y un mensaje de error en formato JSON.
        res.status(401).json({ message: error.message });
    }

};

// Exporta la función 'protectURL' para que pueda ser utilizada en otros módulos.
module.exports = protectURL;
