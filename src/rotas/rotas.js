const { Router } = require('express');
const controladorAgencia = require('../controladores/controladores');
const mostrarBanco = require('../controladores/controladores');

const rotas = Router();

rotas.get('/', mostrarBanco);

module.exports = rotas;