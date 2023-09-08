const { Router } = require('express');
const { mostrarBanco, criarConta, atualizarConta, excluirConta } = require('../controladores/controladores');
const { validarSenha } = require('../intermediarios');

const rotas = Router();

//Lista contas
rotas.get('/contas', validarSenha, mostrarBanco);

//Cria conta
rotas.post('/contas', validarSenha, criarConta);

//Atualiza conta
rotas.put('/contas/:numeroConta/usuario', validarSenha, atualizarConta);

//Excluir conta
rotas.delete('/contas/:numeroConta', validarSenha, excluirConta);


module.exports = rotas;