
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
    console.log(stringRespostas);

    //window.location.replace(`/questionarios//verificar/${nome}/${identificacao}/${stringRespostas}`);
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
        let stringRespostas = "";
        for(let i = 0; i<respostasSubmetidas.length;i++){
            stringRespostas+=respostasSubmetidas[i];
        }
        let nome = localStorage.getItem("nome");
        
        formulario = document.createElement("form");
        formulario.setAttribute("action",`/questionarios/checkarRespostas`)
        formulario.setAttribute("method","post");
        formulario.method = "post";    
        
        formulario.innerHTML = `<input type="text" name="nome" hidden value="${nome}">
                                <input type="text" name="respostas" hidden value="${stringRespostas}">
                                <input type="text" name="id" hidden value="${retornarId()}">`
        
        botaoEnviar = document.createElement("button");
        botaoEnviar.type = "submit";
        botaoEnviar.innerHTML = "Enviar";
        
        
        formulario.appendChild(botaoEnviar);
        container.appendChild(formulario);
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

