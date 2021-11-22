const db = require("./db");

const Agenda = db.sequelize.define('agenda', {
    servico: {
        type: db.Sequelize.STRING
    },
    cliente: {
        type: db.Sequelize.STRING
    },
    funcionario: {
        type: db.Sequelize.STRING
    },
    data: {
        type: db.Sequelize.STRING
    },
    horainicio: {
        type: db.Sequelize.STRING
    },
    horafim: {
        type: db.Sequelize.STRING
    },
});

Agenda.sync({force: true});

module.exports = Agenda;