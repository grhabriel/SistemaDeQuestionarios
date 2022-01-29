const express = require("express");
const handlebars = require("express-handlebars")
const app = express();
const http = require("http");
const server = http.createServer(app);
const path = require("path"); // arquivos
const mongoose = require("mongoose"); //Banco de dados MongoDb

const {Server} = require("socket.io");
const io = new Server(server);


const session = require("express-session");
const flash = require("connect-flash");



//Rotas
const questionarios = require("./routes/questionarios");

//Chamando collections
require("./models/Questionario");
const Questionarios = mongoose.model("questionarios");

//Configurações
    //Sessão
    app.use(session({
        secret:"sistema",
        resave: true,
        saveUninitialized: true
    }));
    app.use(flash());
    app.use(function(req,res,next){
        res.locals.success_msg = req.flash("sucess_msg");
        res.locals.error_msg = req.flash("error_msg");
        next();
    });

    //Banco de dados
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/SistemaQuestionarios").then(function(){
            console.log("Banco de dados conectado");
        }).catch(function(err){
            console.log("Erro: "+err);
        })
    
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
    app.get("/",function(req,res){
        res.sendFile("index");
    });

    //WebSocket
    io.on("connection",(socket)=>{
        socket.on("enviarPergunta",(valor)=>{
            io.emit("AlertaPagina",{valor:1});
            console.log("ALGUEM ENVIOU UMA PERGUNTA");
        })
        console.log("Sabado dia ruim");
    })

//Servidor
    const porta = 8081;
    server.listen(porta,function(){
        console.log("Servidor rodando na porta" + porta);
    });

