const express= require('express');//cria servidor
const app= express();
const db =require('./db/conection');
//pacote instalado para importar dados  do JOB.js
const bodyParser = require('body-parser');

const PORT = 3002;//porta

app.listen(PORT, function(){
    console.log(`o express edta na porta ${PORT}`);
});
//body parser
app.use(bodyParser.urlencoded({extended:false}));
//db connection 
db
.authenticate()
.then(()=>{
    console.log("conectou com sucesso");
})
.catch(err=>{
    console.log("erro o conectar",err);
});

//rotas
app.get('/',(req,res)=> {//rot
    res.send("Está funcionando5");
});
//rotas
//inicio de todas as rotas
app.use('/jobs', require('./routes/jobs'));