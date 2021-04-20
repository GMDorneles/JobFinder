//o express proteje  o acesso as pastas onde estão os index, permiindo apenas acessar o que etá nas sessions
const express       =  require('express');//cria servidor
const app           =  express();//para definir rotas e funcionalidades utilizadas pelo express
const db            = require('./db/conection');
const path          = require("path");
const exphbs        =  require ("express-handlebars");//conexao entre express e handle bars
const Job           = require('./models/Job');
const Sequelize     = require('sequelize');
const Op = Sequelize.Op;//para consultas mais complexas
//pacote instalado para importar dados  do JOB.js
const bodyParser    =  require('body-parser');//permite interagir com dadosde formulario

const PORT = 3003;//porta
//faz serv ouvir
app.listen(PORT, function(){
    console.log(`o express edta na porta ${PORT}`);
});
//body parser
//app.use é para utilizar  a session
//pega dados
app.use(bodyParser.urlencoded({extended:false}));
//Static folder qual a pasta de arquivos estáticos
//ai nao precisa mais do public no href
app.use(express.static(path.join(__dirname,'public')));
//main.handlebars
//onde fica o diretorio com os dados a serem renderizados acessa a past  viewa
app.set('views',path.join(__dirname,'views'));
app.engine('handlebars',exphbs({defaultLayout:'main'}));//arquivo principal  a ser carregado
app.set('view engine','handlebars');//framework de renderização de views



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
//middleware express  
//se um middleware der um retorno(res.send) os próximos nao serao executados
//para passar para o proximo da um next();
//pode ser usaddo um set time out
//req requisição mensagens enviadas pelo client
//res resposta mensagens enviadsa pelo serv

app.get("/", (req, res) => {
    let search = req.query.job;
    let query = "%" + search + "%";
//ve se tem parametro ou n
    if (!search) {
        Job.findAll({
            order: [
                ["createdAt", "DESC"]
            ]
        })
            .then(jobs => {
                res.render("index", {
                    jobs
                });
            })
            .catch(err => console.log(err));
    } else {
        Job.findAll({
            where: { title: { [Op.like]: query } },
            order: [
                ["createdAt", "DESC"]
            ]
        })
            .then(jobs => {
                res.render("index", {
                    jobs, search
                });
            })
            .catch(err => console.log(err));
    }
});

//rotas
//inicio de todas as rotas
app.use("/jobs", require("./routes/jobs"));