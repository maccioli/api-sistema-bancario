const validarSenha = (req, res, next) => {
    const { senha } = req.query;
    if (!senha) {
        return res.json('Necessario validar com uma senha')
    }
}