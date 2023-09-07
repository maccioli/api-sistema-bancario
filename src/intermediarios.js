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

const validarSenhaUsuario = (req, res, next) => {
    const { senha_usuario } = req.query;
    if (!senha_usuario) {
        return res.status(400).json('Necessario validar com uma senha');
    }
    if (senha_usuario !== 'Cubos123Bank') {
        return res.status(401).json({ mensage: 'A senha do usuario informada é inválida!' });
    }
    next();
}

const validarSenhaUsuarioBody = (req, res, contaEncontrada, senha) => {
    if (!senha) {
        res.status(400).json('Necessario validar com uma senha');
        return false;
    }
    else if (senha !== contaEncontrada) {
        res.status(401).json({ mensage: 'A senha do usuario informada é inválida!' });
        return false;
    } else {
        return true;
    }
}

module.exports = {
    validarSenha,
    validarSenhaUsuario,
    validarSenhaUsuarioBody
}