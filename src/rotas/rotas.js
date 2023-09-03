const { Router } = require('express');
const { mostrarBanco, criarConta, atualizarConta, excluirConta } = require('../controladores/controladores');

const rotas = Router();

//Lista contas
rotas.get('/contas', mostrarBanco);

//Cria conta
rotas.post('/contas', criarConta);

//Atualiza conta
rotas.put('/contas/:numeroConta', atualizarConta);

//Excluir conta
rotas.delete('/contas/:numeroConta', excluirConta);


module.exports = rotas;