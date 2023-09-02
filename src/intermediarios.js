const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(400).json('Necessario validar com uma senha');
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.status(401).json({ mensage: 'A senha do banco informada é inválida!' });
    }
    next();
}

module.exports = {
    validarSenha
}