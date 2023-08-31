const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.json({ mensagem: 'Teste ok' });
});

app.listen(3000, () => {
    console.log('Servidor iniciado na porta 3000');
});