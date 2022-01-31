const socket = io();
let sala;

let quantidadePerguntas = document.querySelector("#quantidadePerguntas").value
let respostasSubmetidas = [];
let contadorPerguntaAtual =  0;
let container = document.querySelector("main");


function entrarSala(){
    let nomeSala = window.location.pathname;
    let string ="";
    let i = 24;
    while(nomeSala[i]!="/"){
        string+=nomeSala[i];
        i++;
    }
    sala = string
    socket.emit("entrarSala",string)
}

entrarSala();

function retornarId(){
    url = window.location.pathname;
    let id = "";
    for(let i = url.lastIndexOf("fazer/")+6;i<url.length;i++){
        id+=url[i]; 
    }
    alert(id);
    return id;
}


function enviarAoServer(){
    socket.emit("clickPergunta",1);
}

let botoesProximo = document.getElementsByClassName("botaoProx");
for(botao of botoesProximo){  
    botao.addEventListener("click",enviarAoServer);
}

function retornarId(){
    url = window.location.pathname;
    let id = "";
    for(let i = url.lastIndexOf("/")+1;i<url.length;i++){
        id+=url[i]; 
    }
    return id;
}


function trocarClasses(elemento){
    elemento.classList.remove("perguntaEscondida");
    elemento.classList.add("perguntaMostrar");
}
function deletarElementos(container,quantidade){
    for(let i = 0; i<quantidade; i++){
        container.removeChild(container.firstChild);
    }
}

 
socket.on("proximaPergunta",function(){
    proximaPergunta();
})



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


function enviar(){
    let campoMensagem = document.querySelector("#mensagem");
    let mensagem = campoMensagem.value;
    if(mensagem == "")
        return;
    let dados = {
        mensagem: mensagem,
        nome: window.localStorage.getItem("nome")
    }
    campoMensagem.value = "";
    socket.emit("mensagemEnviada",dados);
}

let botaoEnviar = document.querySelector("#enviarMMensagem");
botaoEnviar.addEventListener("click",enviar);

let campoMensagem = document.querySelector("#mensagem");
campoMensagem.addEventListener('keyup', function (e)
{
    if (e.key === "Enter")
    enviar();
});



socket.on("mensagemRecebida",(dados)=>{
    let container = document.querySelector("#chat");
    let elemento = document.createElement("p");
    elemento.innerHTML= `${dados.nome}: ${dados.mensagem}`;
    container.appendChild(elemento);
})