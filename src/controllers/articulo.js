// Importa el modelo de datos 'Articulo' del archivo correspondiente.
const Articulo = require("../models/Articulo");
const jwt = require("jsonwebtoken");

// Define una función asincrónica llamada 'get' que maneja las solicitudes GET.
const get = async (req, res) => {

    try {
        // Obtiene el valor del parámetro de consulta 'search' de la solicitud y lo guarda en la variable 'name'.
        let name = req.query.search;

        const token = req.cookies.jwt_token;
        const datos = jwt.decode(token);
        
        // Busca artículos en la base de datos cuyo nombre contenga la cadena proporcionada en 'name',
        // ignorando mayúsculas y minúsculas gracias a la opción 'i' del regex.
        const results = await Articulo.find({ name: { $regex: name, $options: 'i' }, vendedor: {$ne: datos.name} }).exec();
    
        // Imprime en la consola el número de objetos encontrados.
        console.log(`${results.length} objetos encontrados.`);
    
        // Si no se encontraron resultados, lanza un error.
        if(results.length === 0){
            throw new Error("El objeto no se ha encontrado.");
        }
    
        // Envía una respuesta con estado 200 y los resultados en formato JSON.
        res.status(200).json(results);
    } 
    catch(error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 400 y un mensaje de error en formato JSON.
        res.status(400).json({ message: error.message });
    }
};

const post = async (req, res) => {
    try{
        const data = req.body;
        const result = await Articulo.create(data);

        console.log(`Artículo ${result.name} de ${result.email} creado correctamente.`);

        res.status(201).json(result);
    }
    catch(error){
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

const deleteArticulo  = async (req, res) => {
    try {
        const { name } = req.body;
        const result = await Articulo.deleteOne({ name });

        if (result.deletedCount > 0) {
            console.log(`Artículo ${name} eliminado correctamente.`);
            res.status(204).json({ message: `Artículo ${name} eliminado correctamente.` });
        } else {
            res.status(404).json({ message: `Artículo ${name} no encontrado.` });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
}

const getInventory = async (req, res) => {
    
    try {

        const token = req.cookies.jwt_token;
        const datos = jwt.decode(token);
        
        // Busca artículos en la base de datos cuyo nombre contenga la cadena proporcionada en 'name',
        // ignorando mayúsculas y minúsculas gracias a la opción 'i' del regex.
        const results = await Articulo.find({ vendedor: datos.name }).exec();
    
        // Imprime en la consola el número de objetos encontrados.
        console.log(`${results.length} objetos encontrados.`);
    
        // Si no se encontraron resultados, lanza un error.
        if(results.length === 0){
            throw new Error("El objeto no se ha encontrado.");
        }
    
        // Envía una respuesta con estado 200 y los resultados en formato JSON.
        res.status(200).json(results);
    } 
    catch(error) {
        // Si ocurre un error, lo imprime en la consola.
        console.error(error);
        // Envía una respuesta con estado 400 y un mensaje de error en formato JSON.
        res.status(400).json({ message: error.message });
    }
}

// Exporta la función 'get' para que pueda ser utilizada en otros módulos.
module.exports = { get, post, getInventory, deleteArticulo};
