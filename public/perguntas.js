let contadorPerguntas = 1;

botaoPergunta = document.querySelector("#novaPergunta");
botaoPergunta.addEventListener('click',function(){
    if(contadorPerguntas==9){
        return;
    }
    let containerSection = document.querySelector(".adicionarPerguntas");
    let novaAreaPergunta = document.createElement("article");
    contadorPerguntas++;
    novaAreaPergunta.classList.add(`pergunta${contadorPerguntas}`);
    
    
    novaAreaPergunta.innerHTML = `  <label for="tituloPergunta${contadorPerguntas}">Pergunta ${contadorPerguntas}:</label>
    <input type="text" name="tituloPergunta${contadorPerguntas}" required> <br><br>
    <label for="pergunta${contadorPerguntas}Respota1">Alternativa 1</label>
        <input type="text" name="pergunta${contadorPerguntas}Resposta1" required> <br><br>
    <label for="pergunta${contadorPerguntas}Respota2">Alternativa 2</label>
        <input type="text" name="pergunta${contadorPerguntas}Resposta2" required> <br><br>
    <label for="pergunta${contadorPerguntas}Respota3">Alternativa 3</label> 
        <input type="text" name="pergunta${contadorPerguntas}Resposta3" required> <br><br>
    <label for="pergunta${contadorPerguntas}Respota4">Alternativa 4</label> 
        <input type="text" name="pergunta${contadorPerguntas}Resposta4" required>
        <br> <br> <br>
    <label for="respostaCertaPergunta${contadorPerguntas}">Resposta Certa:</label>
        <select name="respostaCertaPergunta${contadorPerguntas}" id="">
            <option value="0"> Alternativa 1</option>
            <option value="1"> Alternativa 2</option>
            <option value="2"> Alternativa 3</option>
            <option value="3"> Alternativa 4</option>
        </select>`

    mudarInput  = document.querySelector("#qnt");  
    mudarInput.value = contadorPerguntas;  
    containerSection.appendChild(novaAreaPergunta);

});