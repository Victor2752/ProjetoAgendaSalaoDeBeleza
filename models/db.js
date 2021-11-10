const Sequelize = require("sequelize");
//conecção com o banco de dados
const sequelize = new Sequelize("sistemaSalao", "root", "1234", {
    host: "localhost",
    dialect: "mysql"
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}