const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const celula = {
    nome:{
        type: String,
        required: true
    },
    pontuacao: {
        type:String,
        required: true
    }
}

const pergunta ={
    titulo:{
        type: String,
        required: true
    },
    respostas: [String],
    respostaCerta: {
        type: Number,
        required: true
    }
};

const Questionario = new Schema({
    titulo: {
        type: String,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    },
    quantidadePerguntas: {
        type: Number,
        required: true
    },
    perguntas: [pergunta],
    // criador: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: '_id',
    //     required: true
    // }
    tabela: [celula]
});

mongoose.model("questionarios",Questionario);