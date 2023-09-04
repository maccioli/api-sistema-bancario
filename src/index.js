const express = require('express');
const rotas = require('./rotas/rotas');
const rotasusuarios = require('./rotas/rotausuario');

const app = express();
app.use(express.json());

app.use(rotas);
app.use(rotasusuarios);

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});