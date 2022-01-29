let audioEl = document.querySelector('#som');
let botaoMusica = document.querySelector('#musica');
let musicIcon = document.querySelector("#musica img");
localStorage.setItem('muteOuUnmute', musicIcon.id);
function ligaOuDesliga() {

    if (localStorage.getItem("muteOuUnmute") === "mutado"){
        audioEl.pause();
        musicIcon.src = "/imagens/mute.png";
        musicIcon.id = "";
        localStorage.setItem('muteOuUnmute', musicIcon.id);
    }
    else {
        audioEl.play();
        musicIcon.src = "/imagens/som.png";
        musicIcon.id = "mutado";
        localStorage.setItem('muteOuUnmute', musicIcon.id);
    }
}
botaoMusica.addEventListener('click', ligaOuDesliga);