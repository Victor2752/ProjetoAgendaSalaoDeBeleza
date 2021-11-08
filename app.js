const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require('body-parser');

//importar models
const Servico = require('./models/Servico');
const Funcao = require('./models/Funcao');
const Funcionario = require('./models/Funcionario');

//importar rotas
const servicos = require("./routes/servicos");
const funcoes = require("./routes/funcoes");
const funcionarios = require("./routes/funcionarios");

//configuração handlebars
app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.static("public"));

//configuração body parser
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Rotas
app.use("/servicos", servicos);
app.use("/funcoes", funcoes);
app.use("/funcionarios", funcionarios);

//rota agenda
app.get("/agenda", (req, res) => {
    res.render("agenda");
});

//ouvindo a porta 8081
app.listen(8081, function () {
    console.log("servidor rodando na url http://localhost:8081");
});

