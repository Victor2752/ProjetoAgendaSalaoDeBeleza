//importando o express e cria uma variável para criar as rotas
const express = require("express");
const router = express.Router();
//importando as tabelas do banco de dados da pasta "models" (precisa ter um modelo para cada tabela)
const Funcionario = require('../models/Funcionario');
const Funcao = require('../models/funcao');
//importando handlebars e bodyparser (mesmo que não estejam sendo usados diretamente precisam ser importados)
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

//rota visualizar funcionarios
router.get("/", (req, res) => {
    //encontra funcionarios e funções do banco e renderiza a página "funcoes" passando dados do banco para ela
    Funcionario.findAll().then(function (funcionarios) {
        Funcao.findAll().then(function (funcoes) {
            res.render("funcionarios", { funcionarios: funcionarios, funcoes: funcoes });
        });
    });
});

//rota adicionar funcionarios
router.post("/adicionar", (req, res) => {
    //adiciona um funcionário no banco com o nome recebido na requisição do formulário
    Funcionario.create({
        nome: req.body.inputFuncionario,
        funcao: req.body.selectFuncao
    }).then(function () {
        //encontra funcionarios e funções do banco e renderiza a página "funcoes" passando dados do banco para ela
        Funcionario.findAll().then(function (funcionarios) {
            Funcao.findAll().then(function (funcoes) {
                res.render("funcionarios", { funcionarios: funcionarios, funcoes: funcoes });
            });
        });
    }).catch(function (erro) {
        res.send("Falha ao adicionar o funcionário: " + erro);
    });
});

//rota remover funcionarios
router.post("/remover", (req, res) => {
    //remove o funcionário do banco com o nome recebido na requisição do formulário
    Funcionario.destroy({ where: { "id": req.body.selectFuncionarios } }).then(function () {
        //encontra funcionarios e funções do banco e renderiza a página "funcoes" passando dados do banco para ela
        Funcionario.findAll().then(function (funcionarios) {
            Funcao.findAll().then(function (funcoes) {
                res.render("funcionarios", { funcionarios: funcionarios, funcoes: funcoes });
            });
        });
    }).catch(function (erro) {
        res.send("Falha ao remover o funcionário: " + erro);
    });
});

module.exports = router;