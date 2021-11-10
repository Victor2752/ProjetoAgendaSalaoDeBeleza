const db = require("./db");

const Funcao = db.sequelize.define('funcoes', {
    nome: {
        type: db.Sequelize.STRING
    }
});

// Funcao.sync({force: true});

module.exports = Funcao;