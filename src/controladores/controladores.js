const { contas } = require('../bancodedados');

// Listar todas as contas bancarias
const mostrarBanco = (req, res) => {
    res.json(contas);
}

// Criar conta bancaria

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const validaCpf = contas.find(conta => conta === cpf);
    let indiceContas = contas.length;
    //const validaEmail =
    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    if (!nome.trim() || !cpf.trim() || !data_nascimento.trim() || !telefone.trim() || !email.trim() || !senha.trim()) {
        return res.json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }
    if (validaCpf) {
        return res.send('existe');
    }
    if (indiceContas === 0) {
        contas.push(req.body);
        contas[indiceContas].conta = 0;
        return res.json(contas);
    } else {
        const ultimaConta = contas[indiceContas - 1].conta;
        contas.push(req.body);
        contas[indiceContas].conta = ultimaConta + 1;
        return res.json(contas);
    }
}


module.exports = {
    mostrarBanco,
    criarConta
}

