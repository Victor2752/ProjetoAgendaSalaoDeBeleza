//importando o express e cria uma variável para criar as rotas
const express = require("express");
const router = express.Router();
//importando o banco de dados da pasta "models" (precisa ter um modelo para cada tabela)
const Servico = require('../models/Servico');
//importando handlebars e bodyparser (mesmo que não estejam sendo usados diretamente precisam ser importados)
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

//rota visualizar servicos
router.get("/", (req, res) => {
    Servico.findAll().then(function(servicos) {
        res.render("servicos", {servicos: servicos});
    });
});

//rota adicionar servico
router.post("/adicionar", (req, res) => {
    Servico.create({
        nome: req.body.inputServico,
        funcao: req.body.selectFuncao
    }).then(function() {
        //encontra serviços do banco e renderiza a página "servicos" passando dados do banco para ela
        Servico.findAll().then(function(servicos) {
            res.render("servicos", {servicos: servicos});
        });
    }).catch(function(erro) {
        res.send("Falha ao adicionar serviço: " + erro);
    });
});

//rota remover servico
router.post("/remover", (req, res) => {
    Servico.destroy({where: {"id": req.body.selectServico}}).then(function() {
        console.log(req.body.selectServico);
        //encontra serviços do banco e renderiza a página "servicos" passando dados do banco para ela
        Servico.findAll().then(function(servicos) {
            res.render("servicos", {servicos: servicos});
        });
    }).catch(function(erro) {
        res.send("Falha ao adicionar o serviço: " + erro);
    });
});

module.exports = router;