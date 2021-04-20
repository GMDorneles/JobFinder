//rota que adiciona jobs
const express   = require('express');
const router    = express.Router();
const job       = require('../models/Job');

router.get('/test',(req,res)=>{
    res.send('deu certo');
});
//detalhe da vaga
//pega por id
router.get('/view/:id',(req,res)=>job.findOne({//busca 1 onde foi igual o id
    where:{id: req.params.id} //compara
}).then(job=>{//view 
    res.render('view',{
        job//dado do backend
    });
}).catch(err=>console.log(err)));


router.get('/add',(req,res)=>{

    res.render("add");

})

//inserção no sistema
//add job via post
router.post('/add',(req, res) =>{//variaveis vem do body que é importado no app
    let {title, salary, company,description, email, new_job} = req.body;
    //insert
    //create é um método do sequelize
    job.create({
        title,
        description,
        salary,
        company,
        email,
        new_job
    })
    //quando da certo a adiçao de vaga volta pr home
    .then(( )=> res.redirect('/'))
    //caso de erro
    .catch(err=>console.log(err));
});
module.exports=router;
