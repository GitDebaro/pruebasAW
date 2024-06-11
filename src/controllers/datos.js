const User = require("../models/User");
const Articulo = require("../models/Articulo");

const volcado = async (req, res) => {
    try{
        const users = await User.find();
        const arts = await Articulo.find();
        res.status(200).json({Usuarios: users, Articulos: arts});
    }
    catch(error){
        res.status(400).json({ message: error.message });        
    }
};

module.exports = {volcado};