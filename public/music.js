let audioEl = document.querySelector('#som');
let botaoMusica = document.querySelector('#musica');
let musicIcon = document.querySelector("#musica img");
function ligaOuDesliga() {

    if (musicIcon.id === "mutado") {
        audioEl.pause();
        musicIcon.src = "/imagens/mute.png";
        musicIcon.id = "";
    }
    else {
        audioEl.play();
        musicIcon.src = "/imagens/som.png";
        musicIcon.id = "mutado";
    }
}
botaoMusica.addEventListener('click', ligaOuDesliga);