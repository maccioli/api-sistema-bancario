let { contas, saques, depositos, transferencias } = require('../bancodedados');
const { validarSenhaUsuarioBody } = require('../intermediarios');

function validarEntradasUsuario(req, res, index, numeroConta, valor) {
    if (!numeroConta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
    }
    if (index === -1) {
        return res.status(404).json({ mensagem: 'Conta não encontrada, verifique o numero.' })
    }
    if (valor < 1) {
        return res.status(400).json({ mensagem: 'Necessário deposito com valores positivos' });
    }
}

function localizarIndex(nconta) {
    const contaEncontrada = contas.findIndex(conta => conta.conta === nconta);
    return contaEncontrada;
}

const depositar = (req, res) => {
    const { numeroConta, valor } = req.body;
    const index = localizarIndex(numeroConta);
    validarEntradasUsuario(req, res, index, numeroConta, valor);
    contas[index].saldo = contas[index].saldo + valor;
    res.json(contas);
}

const sacar = (req, res) => {
    const { numeroConta, valor, senha } = req.body;
    const index = localizarIndex(numeroConta);
    const contaEncontrada = contas[index].senha;
    validarSenhaUsuarioBody(req, res, contaEncontrada, senha);
    validarEntradasUsuario(req, res, index, numeroConta, valor);
    if (contas[index].saldo - valor < 0) {
        return res.json({ mensagem: 'Saldo insuficiente!' });
    }
    contas[index].saldo = contas[index].saldo - valor;
    res.json(contas);
}

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const indexContaOrigem = localizarIndex(numero_conta_origem);
    const indexContaDestino = localizarIndex(numero_conta_destino);
    const contaEncontrada = contas[indexContaOrigem].senha;

    const senhaValida = validarSenhaUsuarioBody(req, res, contaEncontrada, senha);

    if (!numero_conta_origem || !numero_conta_destino || !valor) {
        return res.status(400).json({ mensage: 'Necessario informar os numeros da conta de origem, destino, o valor e a senha.' });
    }
    else if (indexContaOrigem === -1 || indexContaDestino === -1) {
        return res.status(404).json({ mensagem: 'A conta origem ou destino não existe.' });
    }
    else if (contas[indexContaOrigem].saldo - valor < 0) {
        return res.status(404).json({ mensagem: 'Saldo insuficiente!' });
    }
    else if (senhaValida) {
        contas[indexContaOrigem].saldo = contas[indexContaOrigem].saldo - valor;
        contas[indexContaDestino].saldo = contas[indexContaDestino].saldo + valor;
    }
    return res.json(contas);
}


module.exports = {
    depositar,
    sacar,
    transferencia
}