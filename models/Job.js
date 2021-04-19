const Sequelize = require('sequelize');
const sequelize = require('../db/conection');
const db = require('../db/conection');
//MODEL
//nome e tipo igual esta na tabela 
const job = db.define('job',{

        title:{
            type: Sequelize.STRING,
        }, 
        description:{
            type: Sequelize.STRING,
        },
        salary:{
            type: Sequelize.STRING,
        },
        company:{
            type:Sequelize.STRING,
        },
        email:{
            type: Sequelize.STRING,
        },
        new_job:{
            type: Sequelize.INTEGER,
        }
       
    
});
//exportar para usar onde precisar
module.exports = job;