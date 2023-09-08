let { contas, saques, depositos, transferencias } = require('../bancodedados');
const { dataFormatada, validarEntradasUsuario, validarSaldoExtrato, localizarIndex } = require('./funcauxiliarusuario');
const { validarSenhaUsuarioBody } = require('../intermediarios');

const dataSet = dataFormatada(new Date());

const depositar = (req, res) => {
    const { numeroConta, valor } = req.body;
    const index = localizarIndex(numeroConta);
    validarEntradasUsuario(req, res, index, numeroConta, valor);
    contas[index].saldo = contas[index].saldo + valor;
    depositos.push({ "data": dataSet, "numero_conta": numeroConta, "valor": valor });
    res.json(depositos);
}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;
    const index = localizarIndex(numero_conta);
    console.log(index);
    const contaEncontrada = contas[index].senha;
    validarSenhaUsuarioBody(req, res, contaEncontrada, senha);
    validarEntradasUsuario(req, res, index, numero_conta, valor);
    if (contas[index].saldo - valor < 0) {
        res.status(400).json({ mensagem: 'Saldo insuficiente!' });
        return false;
    }
    contas[index].saldo = contas[index].saldo - valor;
    saques.push({ "data": dataSet, "numero_conta": numero_conta, "valor": valor });
    res.json(contas);
}

const transferencia = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;
    const indexContaOrigem = localizarIndex(numero_conta_origem);
    const indexContaDestino = localizarIndex(numero_conta_destino);
    const contaEncontrada = contas[indexContaOrigem].senha;

    const senhaValida = validarSenhaUsuarioBody(req, res, contaEncontrada, senha);

    if (!numero_conta_origem || !numero_conta_destino || !valor) {
        res.status(400).json({ mensage: 'Necessario informar os numeros da conta de origem, destino, o valor e a senha.' });
        return false;
    }
    else if (indexContaOrigem === -1 || indexContaDestino === -1) {
        res.status(404).json({ mensagem: 'A conta origem ou destino não existe.' });
        return false;
    }
    else if (contas[indexContaOrigem].saldo - valor < 0) {
        res.status(404).json({ mensagem: 'Saldo insuficiente!' });
        return false;
    }
    else if (senhaValida) {
        contas[indexContaOrigem].saldo = contas[indexContaOrigem].saldo - valor;
        contas[indexContaDestino].saldo = contas[indexContaDestino].saldo + valor;
        transferencias.push({ "data": dataSet, "numero_conta_origem": numero_conta_origem, "numero_conta_destino": numero_conta_destino, "valor": valor });
    }

    return res.json(transferencias);
}

const saldo = (req, res) => {
    const numero_conta = Number(req.query.numero_conta);
    const senhaQuery = req.query.senha;
    const index = localizarIndex(numero_conta);
    validarSaldoExtrato(req, res, index, numero_conta, senhaQuery);

    return res.send({ saldo: contas[index].saldo * 100 });
}

const extrato = (req, res) => {
    const numero_conta = Number(req.query.numero_conta);
    const senhaQuery = req.query.senha;
    const index = localizarIndex(numero_conta);
    validarSaldoExtrato(req, res, index, numero_conta, senhaQuery);

    const extratoDeposito = depositos.filter((conta) => {
        return conta.numero_conta === numero_conta;
    });
    const extratoSaques = saques.filter((conta) => {
        return conta.numero_conta === numero_conta;
    });
    const extratoTransferencias = transferencias.filter((conta) => {
        return conta.numero_conta_origem === numero_conta;
    });

    return res.json({ extratoDeposito, extratoSaques, extratoTransferencias });
}


module.exports = {
    depositar,
    sacar,
    transferencia,
    saldo,
    extrato
}