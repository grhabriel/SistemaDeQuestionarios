
const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const mongoose = require("mongoose");

require("../models/Questionario");
const Questionarios = mongoose.model("questionarios");



router.get("/",function(req,res){
    Questionarios.find().then(function(categorias){
        res.render("questionarios/index",{questionarios: categorias});
    }).catch(function(err){
        console.log("Erro:" +err);
    })
});
router.get("/adicionar",function(req,res){
    res.render("questionarios/adicionar");
});

router.post("/add",function(req,res){ 
    let todosOsRegistros = Object.entries(req.body);
    
    let quantidadeQuestoes = parseInt(todosOsRegistros[0][1]);
    let arrayPerguntas = []; 
    for(let i = 1; i<=quantidadeQuestoes;i++){
    
        let tituloPergunta = req.body[`tituloPergunta${i}`];
        let  arrayRepostas = [];
        for(let j = 1; j<=4;j++){
            arrayRepostas.push(req.body[`pergunta${i}Resposta${j}`]);
        }
        let respostaCerta = req.body[`respostaCertaPergunta${i}`];
        const novaPergunta = {
            titulo: tituloPergunta,
            respostas: arrayRepostas,
            respostaCerta: respostaCerta
        }
        arrayPerguntas.push(novaPergunta);
    }
    
    const novoQuestionario = {
        titulo: todosOsRegistros[1][1],
        perguntas: arrayPerguntas,
        quantidadePerguntas: quantidadeQuestoes,
        tabela: []
    }

    console.log(novoQuestionario);
    new Questionarios(novoQuestionario).save().then(function(){
        console.log("Questionario salvo com sucesso");
    }).catch(function(err){
        console.log("Erro ao salvar o questionario"+ err);
    })
    res.redirect("/questionarios/adicionar");
});



router.get("/fazer/:id",function(req,res){
    Questionarios.findOne({_id:req.params.id}).then((questionario)=>{
        res.render("questionarios/fazerQuestionario",{questionario: questionario});
    }).catch((err)=>{
        console.log("Erro",+err);
    })
    
})
router.get("/sincrono/:id",function(req,res){

    Questionarios.findOne({_id:req.params.id}).then((questionario) =>{
        res.render("questionarios/sincrono",{questionario:questionario});
    }).catch((err)=>{
        console.log("Erro: "+err);
    })
})

function contabilizarAcertos(questionario,respostasSubmetidas){
    let contadorAcertos = 0;
    let quantidadePerguntas = questionario.quantidadePerguntas;
    for(let i = 0; i<quantidadePerguntas;i++){
        if(respostasSubmetidas[i] == questionario.perguntas[i].respostaCerta){
            console.log("Submeteu: "+ respostasSubmetidas[i]);
            console.log("Certa: " + questionario.perguntas[i].respostaCerta);
            contadorAcertos++;
            console.log(contadorAcertos);
        }
    }
    return contadorAcertos;
}



router.post("/checkarRespostas",function(req,res){
    Questionarios.findOne({_id:req.body.id}).then((questionario)=>{
        
        
        let total = contabilizarAcertos(questionario,req.body.respostas);

        const novoRegistro = {
            nome:req.body.nome,
            pontuacao:total
        };
        let registros = questionario.tabela
        registros.push(novoRegistro);
        
        Questionarios.updateOne({_id:req.body.id},
            {tabela:registros},function(err,docs){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Atualizado com sucesso: ",docs);
                }
            });

        req.flash("success_msg",`Você acertou ${total} questões!`);
        res.redirect(`/questionarios/paginaQuestionario/${req.body.id}`);
    }).catch((err)=>{
        res.send("Erro"+err);
    })
})

router.get("/paginaQuestionario/:id",function(req,res){
    
    Questionarios.findOne({_id:req.params.id}).then((questionario)=>{
        let mensagem = req.flash();
        console.log()
        console.log(questionario.tabela);
        res.render("questionarios/paginaQuestionarios",{questionario: questionario,
                                                        mensagem: mensagem});
    }).catch((err)=>{
        res.send("Questionario invalido"+err);
    })
});







module.exports = router;
