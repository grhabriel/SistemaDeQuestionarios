/*   Variaveis Necessarias */
let quantidadePerguntas = document.querySelector("#quantidadePerguntas").value
let respostasSubmetidas = [];
let contadorPerguntaAtual =  0;
let container = document.querySelector("main");

/* -------------------------------------------------------- */
/*        Funções auxiliares         */

function deletarElementos(container,quantidade){
    for(let i = 0; i<quantidade; i++){
        container.removeChild(container.firstChild);
    }
}

function retornarId(){
    url = window.location.pathname;
    let id = "";
    for(let i = url.lastIndexOf("fazer/")+6;i<url.length;i++){
        id+=url[i]; 
    }
    return id;
}

function trocarClasses(elemento){
    elemento.classList.remove("perguntaEscondida");
    elemento.classList.add("perguntaMostrar");
}
/* -------------------------------------------------------- */
/*        Codigo Principal         */

function enviarRespostas(){
    let identificacao = retornarId();
    let stringRespostas = "";
    for(let i = 0; i<respostasSubmetidas.length;i++){
        stringRespostas+=respostasSubmetidas[i];
    }
    console.log(stringRespostas);
    window.location.replace(`/questionarios/verificar/${identificacao}/${stringRespostas}`);
}


let primeiraPergunta = document.querySelector("#pergunta0");
trocarClasses(primeiraPergunta);
function proximaPergunta(){
    let input = document.querySelector(`input[name="respostaPergunta${contadorPerguntaAtual}"]:checked`);
    respostasSubmetidas.push(input.value);

    deletarElementos(container,2);
    contadorPerguntaAtual++;
    
    //Sistema para enviar as respostas
    if(contadorPerguntaAtual == quantidadePerguntas){
        botaoEnviar = document.createElement("button");
        botaoEnviar.innerHTML = "teste";
        botaoEnviar.addEventListener("click",enviarRespostas);
        container.appendChild(botaoEnviar);
    }

    let novaPergunta = document.querySelector(`#pergunta${contadorPerguntaAtual}`);
    if(!novaPergunta){
        return null;
    }
    trocarClasses(novaPergunta);
}

let botoesProximo = document.getElementsByClassName("botaoProx");
for(botao of botoesProximo){
    botao.addEventListener("click",proximaPergunta);
}

