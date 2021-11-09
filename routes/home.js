//importando o express e cria uma variável para criar as rotas
const express = require("express");
const router = express.Router();
//importando as tabelas do banco de dados da pasta "models" (precisa ter um modelo para cada tabela)
const Funcionario = require('../models/Funcionario');
const Agenda = require('../models/Agenda');
const Servico = require('../models/Servico');
//importando handlebars e bodyparser (mesmo que não estejam sendo usados diretamente precisam ser importados)
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

router.get("/", (req, res) => {
    //encontra agenda e funções do banco e renderiza a página "servico" passando dados do banco para ela
    Agenda.findAll().then(function (agenda) {
        Funcionario.findAll().then(function (funcionarios) {
            Servico.findAll().then(function (servicos) {
                res.render("home", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
            });
        });
    });
});

router.get("/visualizar", (req, res) => {
    Agenda.findAll().then(function (agenda) {
        Funcionario.findAll().then(function (funcionarios) {
            Servico.findAll().then(function (servicos) {
                res.render("home", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
            });
        });
    });
});

router.post("/visualizar", (req, res) => {
    //adiciona um funcionário no banco com o nome recebido na requisição do formulário
    Agenda.create({
        servico: req.body.selectServico,
        funcionario: req.body.selectFuncionario,
        cliente: req.body.inputCliente,
        data: req.body.inputData,
        horainicio: req.body.inputHoraInicio,
        horafim: req.body.inputHoraFim
    }).then(function () {
        //encontra funcionarios e funções do banco e renderiza a página "funcoes" passando dados do banco para ela
        Agenda.findAll().then(function (agenda) {
            Funcionario.findAll().then(function (funcionarios) {
                Servico.findAll().then(function (servicos) {
                    res.render("home", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
                });
            });
        });
    }).catch(function (erro) {
        res.send("Falha ao agendar servico: " + erro);
    });
});

module.exports = router;