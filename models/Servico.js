const db = require("./db");

const Servico = db.sequelize.define('servicos', {
    nome: {
        type: db.Sequelize.STRING
    },
    funcao: {
        type: db.Sequelize.STRING
    }
});

Servico.sync({force: true});

module.exports = Servico;