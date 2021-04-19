//transforma dados em bstração para o db
const Sequelize= require('sequelize');//squelize é para usar bancos relacionais com o nde
//cria instancia

const sequelize = new Sequelize({
    dialect:'sqlite',//qual banco
    storage:'./db/app.db'//onde vai estar
});
//exportar oque estiver fora do app.js

module.exports = sequelize;