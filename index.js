const express = require("express");
const app = express();

app.get("/funcionarios", (req, res) => {
    res.send("ROTA DE FUNCIONÁRIOS");
})

app.get("/servicos", (req, res) => {
    res.send("ROTA DE SERVIÇOS");
})

app.get("/funcoes", (req, res) => {
    res.send("ROTA DE FUNÇÕES");
})

app.get("/agenda", (req, res) => {
    res.send("ROTA DE AGENDA");
})

//ouvindo a porta 8081
app.listen(8081, function () {
    console.log("servidor rodando na url http://localhost:8081");
});