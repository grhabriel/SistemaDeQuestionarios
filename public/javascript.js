
let botaoJogar = document.querySelector("#jogar");

botaoJogar.addEventListener('click', function () {
    window.location = "/questionarios";
});

let botaoCriar = document.querySelector("#criar");

botaoCriar.addEventListener('click', function () {
    window.location = "/questionarios/adicionar";
});

let botaoParticipantes = document.querySelector("#participantes");
botaoParticipantes.addEventListener('click', abreModal);

function abreModal(e) {
    let janelaModalEl = document.querySelector('.modal');
    janelaModalEl.classList.add('visivel');
}

let botoesFecharModal = document.querySelectorAll('.fecharModal');

for (let fecharEl of botoesFecharModal) {
    fecharEl.addEventListener('click', fechaModal);
}

function fechaModal(e) {
    let janelaModalEl = document.querySelector('.modal');
    janelaModalEl.classList.remove('visivel');
}