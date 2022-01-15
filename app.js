const express = require("express");
const handlebars = require("express-handlebars")
const app = express();
const path = require("path"); // arquivos
const mongoose = require("mongoose"); //Banco de dados MongoDb
//const flash = require("connect-flash");

//Rotas
const questionarios = require("./routes/questionarios");

//Chamando collections
require("./models/Questionario");
const Questionarios = mongoose.model("questionarios");

//Configurações
    //Sessão
    //app.use(flash());
    //Banco de dados
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/SistemaQuestionarios").then(function(){
            console.log("Banco de dados conectado");
        }).catch(function(err){
            console.log("Erro: "+err);
        })
    //MidleWare
    // app.use(function(req,res,next){
    //     res.locals.success_msg = req.flash("sucess_msg");
    //     res.locals.error_msg = req.flash("error_msg");
    //     res.locals.user = req.user || null;
    //     next();
        
    // });

    //Configurando bodyparser
    app.use(express.urlencoded({extended:true}));
    app.use(express.json());
    
    
    //Configurando HandleBars
    const hbs = handlebars.create({
        defaultLayout: "main",
        runtimeOptions:{
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true,
        }
    });
    app.engine('handlebars',hbs.engine);
    app.set('view engine', 'handlebars')
    
    //Arquivos estaticos
    app.use(express.static(path.join(__dirname,"public"))); //Onde estão os arquivos estaticos
//Rotas
    app.use("/questionarios",questionarios)


//Servidor
    const porta = 8081;
    app.listen(porta,function(){
        console.log("Servidor rodando na porta" + porta);
    });


