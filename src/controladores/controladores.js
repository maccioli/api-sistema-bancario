const clientes = require('../bancodedados');

const mostrarBanco = (req, res) => {
    res.json(clientes);
}

module.exports = mostrarBanco