const { Router } = require('express');
const { depositar, sacar, transferencia } = require('../controladores/controleusuario');
//const { validarSenhaUsuario } = require('../intermediarios');

const rotasUsuarios = Router();

//Depositar /transacoes/depositar
rotasUsuarios.post('/transacoes/depositar', depositar);
//Sacar
rotasUsuarios.post('/transacoes/sacar', sacar);
//Transferir
rotasUsuarios.post('/transacoes/transferir', transferencia);
//Saldo

//Extrato

module.exports = rotasUsuarios;
