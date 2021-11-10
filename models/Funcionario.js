const db = require("./db");

const Funcionario = db.sequelize.define('funcionarios', {
    nome: {
        type: db.Sequelize.STRING
    },
    funcao: {
        type: db.Sequelize.STRING
    }
});

// Funcionario.sync({force: true});

module.exports = Funcionario;