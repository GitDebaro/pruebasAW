const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellidos: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        "default": "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
    }
},
{ versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;
