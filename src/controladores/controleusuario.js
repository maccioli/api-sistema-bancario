let { contas, saques, depositos, transferencias } = require('../bancodedados');

function validarEntradasUsuario(req, numeroConta, valor) {
    if (!numeroConta || !valor) {
        return res.json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }
    if (req === -1) {
        return res.json({ mensagem: 'Conta não encontrada, verifique o numero.' })
    }
    if (valor < 1) {
        return res.json({ mensagem: 'Necessário deposito com valores positivos' });
    }
}

const depositar = (req, res) => {
    const { numeroConta, valor } = req.body
    const contaEncontrada = contas.findIndex(conta => conta.conta === Number(req.body.numeroConta));
    validarEntradasUsuario(contaEncontrada, numeroConta, valor);

    contas[contaEncontrada].saldo = contas[contaEncontrada].saldo + valor;
    res.json(contas);
}

const sacar = (req, res) => {
    const { numeroConta, valor } = req.body
    const contaEncontrada = contas.findIndex(conta => conta.conta === Number(req.body.numeroConta));
    validarEntradasUsuario(contaEncontrada, numeroConta, valor);
    contas[contaEncontrada].saldo = contas[contaEncontrada].saldo - valor;
    res.json(contas);
}
/*
const transferir = (res, req) => {

}
*/

module.exports = {
    depositar,
    sacar
}