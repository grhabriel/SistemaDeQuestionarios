let quantidadePerguntas = document.querySelector("#quantidadePerguntas")
let botaoProximo = document.querySelector(".botaoProx");

let respostasSubmetidas = [];
let contadorPerguntaAtual =  1;



botaoProximo.addEventListener("click", ()=>{
    let radios = document.getElementsByName(`respostaPergunta${contadorPerguntaAtual}`);
    for(radio of radios){
        console.log(radio.checked);
        console.log("Valor: "+radio.value);
    }

});
