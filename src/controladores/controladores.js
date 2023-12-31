let { contas } = require('../bancodedados');


// Validar entrada de dados
function validarEntradasContas(req, res, nome, cpf, data_nascimento, telefone, email, senha) {

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        res.status(400).json({ mensagem: 'Todos os campos são obrigatórios' });
        return false;
    }
    if (!nome.trim() || !cpf.trim() || !data_nascimento.trim() || !telefone.trim() || !email.trim() || !senha.trim()) {
        res.status(400).json({ mensagem: 'Todos os campos devem ser preenchidos' });
        return false;
    }
    return true;
}

// Listar todas as contas bancarias
const mostrarBanco = (req, res) => {
    res.status(200).json(contas);
}

// Criar conta bancaria

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const validaCpf = contas.find(contaCpf => contaCpf.cpf === cpf);
    const validaEmail = contas.find(contaEmail => contaEmail.email === email);

    let indiceContas = contas.length;

    validarEntradasContas(req, res, nome, cpf, data_nascimento, telefone, email, senha);

    if (validaCpf || validaEmail) {
        return res.status(409).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    }
    if (indiceContas === 0) {
        contas.push(req.body);
        contas[indiceContas].saldo = 0;
        contas[indiceContas].conta = 1;
        return res.status(201).json(contas);
    } else {
        const ultimaConta = contas[indiceContas - 1].conta;
        contas.push(req.body);
        contas[indiceContas].saldo = 0;
        contas[indiceContas].conta = ultimaConta + 1;
        return res.status(201).json(contas);
    }
}

//Atualizar conta bancaria

const atualizarConta = (req, res) => {

    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const contaEncontrada = contas.find(conta => conta.conta === Number(req.params.numeroConta));
    const verificaCpf = contas.filter(conta => conta.cpf === cpf);
    const verificaEmail = contas.filter(conta => conta.email === email);

    validarEntradasContas(req, res, nome, cpf, data_nascimento, telefone, email, senha);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }
    if (verificaCpf.length > 1) {
        return res.status(409).json({ mensagem: 'O CPF informado já existe cadastrado!' });
    }
    if (verificaEmail.length > 1) {
        return res.status(409).json({ mensagem: 'O e-mail informado já existe cadastrado!' });
    }

    contaEncontrada.nome = nome;
    contaEncontrada.cpf = cpf;
    contaEncontrada.data_nascimento = data_nascimento;
    contaEncontrada.telefone = telefone;
    contaEncontrada.email = email;
    contaEncontrada.senha = senha;

    res.json(contas);
}

//Excluir conta bancaria

const excluirConta = (req, res) => {
    const numeroConta = req.params.numeroConta
    const contaEncontrada = contas.find(conta => conta.conta === Number(numeroConta));
    console.log(contaEncontrada);

    if (!contaEncontrada) {
        return res.status(404).json({ mensagem: 'Conta não encontrada' });
    }
    contas = contas.filter((conta) => {
        return conta.conta !== Number(numeroConta);
    });

    return res.json(contas);
}


module.exports = {
    mostrarBanco,
    criarConta,
    atualizarConta,
    excluirConta
}

