const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

require("../models/Questionario");
const Questionarios = mongoose.model("questionarios");



router.get("/",function(req,res){
    Questionarios.find().then(function(categorias){
        res.render("questionarios/index",{categorias: categorias});
    }).catch(function(err){
        console.log("Erro:" +err);
    })
});
router.get("/adicionar",function(req,res){
    res.render("questionarios/adicionar");
});

router.post("/add",function(req,res){
    let qntPerguntas = req.body.qntPerguntas;
    const novoQuestionario = {
        titulo: req.body.tituloQuestionario,
        perguntas:[]
    }
    for(let i = 1; i<=qntPerguntas; i++){
        console.log(req.body.tituloPergunta`${i}`);
        const pergunta = {
            titulo: req.body.tituloPergunta`${i}`,
            respostas: [req.body.resposta`${i}`,
                        req.body.resposta`${i}`,
                        req.body.resposta`${i}`,
                        req.body.resposta`${i}`],
            respostaCerta: req.body.respostaCerta`${qntPerguntas}`
        }
        console.log(pergunta);
        console.log(pergunta.respostas);
        novoQuestionario.perguntas.append(pergunta);
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

router.post("/verificar",function(req,res){
    let cont = 0;
    let identificacao = req.body.idQuestionario;
    let respostaSubmetida = req.body.respostaPergunta;
    let respostaCorreta = req.body.correta;
    if(respostaSubmetida == respostaCorreta){
        cont++;
    }
    res.send("Voce acertou "+cont + " Questões");
    //Fazer um loop para poder contar quantas perguntas for preciso
});







module.exports = router;
