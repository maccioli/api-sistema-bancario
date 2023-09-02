const { contas } = require('../bancodedados');

// Validar entrada de dados
function validarEntradasContas(req, res, nome, cpf, data_nascimento, telefone, email, senha) {

    const validaCpf = contas.find(contaCpf => contaCpf.cpf === cpf);
    const validaEmail = contas.find(contaEmail => contaEmail.email === email);

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.json({ mensagem: 'Todos os campos são obrigatórios' });
    }
    if (!nome.trim() || !cpf.trim() || !data_nascimento.trim() || !telefone.trim() || !email.trim() || !senha.trim()) {
        return res.json({ mensagem: 'Todos os campos devem ser preenchidos' });
    }
    if (validaCpf || validaEmail) {
        return res.json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }
}

// Listar todas as contas bancarias
const mostrarBanco = (req, res) => {
    res.json(contas);
}

// Criar conta bancaria

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    let indiceContas = contas.length;

    validarEntradasContas(req, res, nome, cpf, data_nascimento, telefone, email, senha);

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

