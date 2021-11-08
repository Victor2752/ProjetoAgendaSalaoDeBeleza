const express = require("express");
const router = express.Router();
const Funcao = require('../models/Funcao');
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

//rota visualizar funções
router.get("/", (req, res) => {
    //encontra funções do banco e renderiza a página "funcoes" passando dados do banco para ela
    Funcao.findAll().then(function(funcoes) {
        res.render("funcoes", {funcoes: funcoes});
    });
});

//rota adicionar funções
router.post("funcoes/adicionar", (req, res) => {
    //adiciona uma função no banco com o nome recebido na requisição do formulario
    Funcao.create({
        nome: req.body.inputFuncao
    }).then(function() {
        //encontra funções do banco e renderiza a página "funcoes" passando dados do banco para ela
        Funcao.findAll().then(function(funcoes) {
            res.render("funcoes", {funcoes: funcoes});
        });
    }).catch(function(erro) {
        res.send("Falha ao adicionar funcionário: " + erro);
    });
});

//rota remover funções
router.post("funcoes/remover", (req, res) => {
    //remove a função do banco com o nome recebido na requisição do formulário
    Funcao.destroy({where: {"id": req.body.selectFuncao}}).then(function() {
        console.log(req.body.selectFuncao);
        Funcao.findAll().then(function(funcoes) {
            res.render("funcoes", {funcoes: funcoes});
        });
    }).catch(function(erro) {
        res.send("Falha ao adicionar a funcao: " + erro);
    });
});

module.exports = router;