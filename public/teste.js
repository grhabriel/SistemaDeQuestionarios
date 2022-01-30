
// let questionarios = document.querySelectorAll('.divQuestionario');

// for (let quest of questionarios) {
//     quest.addEventListener('click', clicarDiv);
// }

// function clicarDiv(e) {
//     let div = e.currentTarget;
//     let id = document.querySelector("#id");
//     window.location = `/questionarios/fazer/${id.value}`;
// }


// function clicarDiv(e) {
//     let div = e.currentTarget;
//     let id = document.querySelector("#id");
//     window.location = `/questionarios/fazer/${id.value}`;
// }

let botaoCriarSala = document.getElementsByClassName("salaSincrona")


function criarNovaSala(e){
    botao = e.currentTarget;
    let id = botao.dataset.id
    let nomeSala = prompt("Digite o nome da sala: ");
    let linkClick = document.createElement("a");
    
    linkClick.href = `/questionarios/sincrono/${nomeSala}/${id}`
    
    linkClick.click();
}

for(let botao of botaoCriarSala){
    botao.addEventListener('click',criarNovaSala);
}