const socket = io();

function enviarAoServer(){
    socket.emit("enviarPergunta",1);
}

let botoesProximo = document.getElementsByClassName("botaoProx");
for(botao of botoesProximo){  
    botao.addEventListener("click",enviarAoServer);
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
 
socket.on("AlertaPagina",function(valor){
    alert("VOCE FOI ALERTADO ME DE LASANHA");
})

let primeiraPergunta = document.querySelector("#pergunta0");
trocarClasses(primeiraPergunta);