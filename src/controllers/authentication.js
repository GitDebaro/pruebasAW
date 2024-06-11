// Importa el módulo 'jsonwebtoken' que se utiliza para crear y verificar tokens JWT.
const jwt = require("jsonwebtoken");
// Importa el modelo de datos 'User' del archivo correspondiente.
const User = require("../models/User");

// Función para crear un token JWT con los datos proporcionados.
// La opción 'expiresIn' define la duración del token.
const createToken = (data) => {
    const opt = {
        expiresIn: '20min'
    };
    // Crea un token firmado con los datos y una clave secreta obtenida de las variables de entorno.
    const token = jwt.sign(data, process.env.JWT_TOKEN_SECRET, opt);

    return token;
};

// Función asincrónica para manejar el inicio de sesión.
const login = async (req, res) => {
    try {
        // Obtiene el email y la contraseña del cuerpo de la solicitud.
        let name = req.body.email;
        let pass = req.body.password;
    
        // Busca en la base de datos usuarios que coincidan con el email y la contraseña proporcionados.
        const results = await User.find({ email: name, password: pass }).exec();
    
        // Imprime en la consola el número de usuarios encontrados.
        console.log(`${results.length} usuarios encontrados.`);
    
        // Si no se encontraron usuarios, lanza un error.
        if (results.length === 0) {
            throw new Error("Credenciales proporcionadas no válidas.");
        }
    
        // Crea un token JWT con el email del usuario.
        const token = createToken({ name });
    
        // Establece una cookie con el token JWT, configurada como solo accesible por HTTP y con 'sameSite' estricta.
        res.cookie('jwt_token', token, { httpOnly: true, sameSite: 'Strict' });
    
        // Envía una respuesta con estado 200 y los resultados en formato JSON.
        res.status(201).json(results);
    } 
    catch (error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 404 y un mensaje de error en formato JSON.
        res.status(404).json({ message: error.message });
    }
};

// Función asincrónica para manejar el registro de nuevos usuarios.
const register = async (req, res) => {
    try {
        // Obtiene los datos del cuerpo de la solicitud.
        const data = req.body;
        // Crea un nuevo usuario en la base de datos con los datos proporcionados.
        const result = await User.create(data);

        // Imprime en la consola un mensaje indicando que el usuario ha sido creado correctamente.
        console.log(`Usuario ${result.email} creado correctamente.`);

        // Envía una respuesta con estado 201 y el resultado en formato JSON.
        res.status(201).json(result);
    } 
    catch (error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 400 y un mensaje de error en formato JSON.
        res.status(400).json({ message: error.message });
    }
};

// Función asincrónica para manejar el cierre de sesión.
const logout = async (req, res) => {
    try {
        // Obtiene el token JWT de las cookies de la solicitud.
        const token = req.cookies.jwt_token;

        // Si no existe el token, lanza un error.
        if (!token) {
            throw new Error("No se puede cerrar sesión porque el token JWT no existe.");
        }

        // Decodifica el token JWT para obtener los datos del usuario.
        const datos = jwt.decode(token);

        // Limpia la cookie que contiene el token JWT.
        res.clearCookie('jwt_token');

        // Imprime en la consola un mensaje indicando que el usuario ha cerrado sesión correctamente.
        console.log(`El usuario ${datos.name} ha cerrado sesión correctamente.`);

        // Envía una respuesta con estado 204 (sin contenido).
        res.sendStatus(204);

    } 
    catch (error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 404 y un mensaje de error en formato JSON.
        res.status(404).json({ message: error.message });
    }
};

const info = async (req, res) => {
    try{
        const token = req.cookies.jwt_token;
        const datos = jwt.decode(token);
        const results = await User.find({ email: datos.name}).exec();

        res.status(200).json(results);
    }
    catch(error){
        console.error(error);
        res.status(404).json({ message: error.message });
    }
};

const update = async (req, res) => {
    try{
        console.log("HOla");
        const data = req.body;
        console.log(data._id);
        const result = await User.findByIdAndUpdate(data._id, data, {new: true});

        res.status(200).json(result);
    }
    catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
    }
};

// Exporta las funciones 'login', 'register' y 'logout' para que puedan ser utilizadas en otros módulos.
module.exports = { login, register, logout, info, update };
