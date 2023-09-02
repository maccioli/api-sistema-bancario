const { Router } = require('express');
const { mostrarBanco, criarConta } = require('../controladores/controladores');

const rotas = Router();

//Lista contas
rotas.get('/contas', mostrarBanco);

//Cria conta
rotas.post('/contas', criarConta);


module.exports = rotas;