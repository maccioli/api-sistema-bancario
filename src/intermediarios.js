const validarSenha = (req, res, next) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.json('Necessario validar com uma senha');
    }
    if (senha_banco !== 'Cubos123Bank') {
        return res.json('A senha está incorreta');
    }
    next();
}

module.exports = {
    validarSenha
}