const { Router } = require('express');
const { depositar, sacar, transferencia, saldo, extrato } = require('../controladores/controleusuario');

const rotasUsuarios = Router();

//Depositar
rotasUsuarios.post('/transacoes/depositar', depositar);

//Sacar
rotasUsuarios.post('/transacoes/sacar', sacar);

//Transferir
rotasUsuarios.post('/transacoes/transferir', transferencia);

//Saldo
rotasUsuarios.get('/contas/saldo', saldo);

//Extrato
rotasUsuarios.get('/contas/extrato', extrato);

module.exports = rotasUsuarios;
