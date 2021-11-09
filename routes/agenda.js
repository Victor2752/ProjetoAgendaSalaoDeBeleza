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

//rota visualizar agenda
router.get("/", (req, res) => {
    //encontra agenda e funções do banco e renderiza a página "servico" passando dados do banco para ela
    Agenda.findAll().then(function (agenda) {
        Funcionario.findAll().then(function (funcionarios) {
            Servico.findAll().then(function (servicos) {
                res.render("agenda", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
            });
        });
    });
});
router.get("/adicionar", (req, res) => {
    Agenda.findAll().then(function (agenda) {
        Funcionario.findAll().then(function (funcionarios) {
            Servico.findAll().then(function (servicos) {
                res.render("agenda", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
            });
        });
    });
});
//rota adicionar funcionarios
router.post("/adicionar", (req, res) => {
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
                    res.render("agenda", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
                });
            });
        });
    }).catch(function (erro) {
        res.send("Falha ao agendar servico: " + erro);
    });
});

//rota remover funcionarios
router.get("/remover:id", (req, res) => {
    //remove o funcionário do banco com o nome recebido na requisição do formulário
    Agenda.destroy({ where: { "id": req.body.selectHora } }).then(function () {
        //encontra funcionarios e funções do banco e renderiza a página "funcoes" passando dados do banco para ela
        Agenda.findAll().then(function (agenda) {
            Funcionario.findAll().then(function (funcionarios) {
                Servico.findAll().then(function (servicos) {
                    res.render("agenda", { agenda: agenda, funcionarios: funcionarios, servicos: servicos,});
                });
            });
        });
    }).catch(function (erro) {
        res.send("Falha ao remover o servico agendado: " + erro);
    });
});

module.exports = router;