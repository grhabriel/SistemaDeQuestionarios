let quantidadePerguntas = document.querySelector("#quantidadePerguntas")
let respostasSubmetidas = [];
let contadorPerguntaAtual =  0;

let container = document.querySelector("main");


let primeiraPergunta = document.querySelector("#pergunta0");
primeiraPergunta.classList.remove("perguntaEscondida");
primeiraPergunta.classList.add("perguntaMostrar");

function proximaPergunta(e){
    let input = document.querySelector(`input[name="respostaPergunta${contadorPerguntaAtual}"]:checked`);
    respostasSubmetidas.push(input.value);
    for(let i = 0; i<2; i++){
        container.removeChild(container.firstChild);
    }
   
    contadorPerguntaAtual++;
    if(contadorPerguntaAtual >= quantidadePerguntas-1){
        console.log("a");
        return null;
    }
    let novaPergunta = document.querySelector(`#pergunta${contadorPerguntaAtual}`);
    if(!novaPergunta){
        return null;
    }
    novaPergunta.classList.add("perguntaMostrar");
  
    

    novaPergunta.classList.add("perguntaMostrar");
    console.log(respostasSubmetidas);
    
}

let botoesProximo = document.getElementsByClassName("botaoProx");
for(botao of botoesProximo){
    botao.addEventListener("click",proximaPergunta);
}

