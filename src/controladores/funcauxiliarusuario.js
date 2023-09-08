let { contas, saques, depositos, transferencias } = require('../bancodedados');

function dataFormatada(date) {
    const ano = date.getFullYear();
    const dia = String(date.getDate()).padStart(2, '0');
    const mes = String(date.getMonth() + 1).padStart(2, '0');
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');

    return `${ano}-${dia}-${mes} ${horas}:${minutos}:${segundos}`;
}

function validarEntradasUsuario(req, res, index, numeroConta, valor) {
    if (!numeroConta || !valor) {
        res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' })
        return false;
    }
    if (index === -1) {
        res.status(404).json({ mensagem: 'Conta não encontrada, verifique o numero.' })
        return false;
    }
    if (valor < 1) {
        res.status(400).json({ mensagem: 'Necessário deposito com valores positivos' });
        return false;
    }
    return true;
}

function validarSaldoExtrato(req, res, index, numero_conta, senhaQuery) {
    if (!numero_conta || !senhaQuery) {
        res.status(400).json({ mensagem: 'O campo senha é obrigatório' });
        return false;
    }
    if (index === -1) {
        res.status(404).json({ mensagem: 'Conta não encontrada, verifique o numero.' })
        return false;
    }
    if (contas[index].senha !== senhaQuery) {
        return res.json({ mensagem: 'A senha do usuario informada é inválida!' })
    }
}

function localizarIndex(nconta) {
    const contaEncontrada = contas.findIndex(conta => conta.conta === nconta);
    return contaEncontrada;
}

module.exports = {
    dataFormatada,
    validarEntradasUsuario,
    validarSaldoExtrato,
    localizarIndex
}