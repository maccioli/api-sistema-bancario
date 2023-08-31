const express = require('express');
const { validarSenha } = require('./intermediarios');
const rotas = require('./rotas/rotas');

const app = express();
app.use(express.json());

app.use(validarSenha);

app.use(rotas);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});