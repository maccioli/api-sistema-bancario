const { Router } = require('express');
const { depositar, sacar } = require('../controladores/controleusuario');
const { validarSenhaUsuario } = require('../intermediarios');

const rotasUsuarios = Router();

//Depositar /transacoes/depositar
rotasUsuarios.post('/transacoes/depositar', depositar);

//Sacar
//rotasUsuarios.post('/transacoes/sacar', sacar);
//Transferir
//rotasUsuarios.post('/transacoes/transferir', );
//Saldo

//Extrato

module.exports = rotasUsuarios;
