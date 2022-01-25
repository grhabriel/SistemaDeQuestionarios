
let questionarios = document.querySelectorAll('.divQuestionario');

for (let quest of questionarios) {
    quest.addEventListener('click', clicarDiv);
}

function clicarDiv(e) {
    let div = e.currentTarget;
    let id = document.querySelector("#id");
    window.location = `/questionarios/fazer/${id.value}`;
}
let questionarios = document.querySelectorAll('.divQuestionario');

for (let quest of questionarios) {
    quest.addEventListener('click', clicarDiv);
}

function clicarDiv(e) {
    let div = e.currentTarget;
    let id = document.querySelector("#id");
    window.location = `/questionarios/fazer/${id.value}`;
}
