let audioEl = document.querySelector('#som');
let botaoMusica = document.querySelector('#musica');
botaoMusica.addEventListener('click', function() {
  
    let musicIcon = document.querySelector("#musica img");
        if (musicIcon.id == "mutado") 
        {
            audioEl.pause();
            musicIcon.src = "/imagens/mute.png";
            musicIcon.id = "";
        }
        else
        {
            audioEl.play();
            musicIcon.src = "/imagens/som.png";
            musicIcon.id = "mutado";
        }
});