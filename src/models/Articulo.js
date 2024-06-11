/**
 * Módulo que define un esquema y un modelo de datos de los articulos utilizando
 * el ODM Mongoose.
 *
 */

const mongoose = require('mongoose');

const esquemaArticulo = new mongoose.Schema({
  name: {
    type: String, required: true
  },
  precio: {
    type: Number, required: true
  },
  imagen: {
    hires: String //Lo quite el require 
  },
  vendedor: {
    type: String, required: true
  },
  descripcion: {
    type: String, required: true
  }
},
  { versionKey: false });

const Articulo = mongoose.model('Articulo', esquemaArticulo);

module.exports = Articulo;