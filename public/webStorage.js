let botaoInscreverEl = document.querySelector('#cadastrar');
let botaoLoginEl = document.querySelector('#login');
let divCadastro = document.querySelector("#cadastro");
let botaoManterConectado = document.querySelector('#manterConectado');

if (localStorage.getItem("manter-conectado") === "true")
    divCadastro.style.display = 'none';
else {
    botaoInscreverEl.addEventListener('click', inscricao);
    function inscricao() {
        let nomeUsuarioEl = document.querySelector('#nome');
        let nomeUsuario = nomeUsuarioEl.value;
        if (nomeUsuario) {
            localStorage.setItem('nome', JSON.stringify(nomeUsuario));
            alert("Inscrição feita com sucesso!");

            if (botaoManterConectado.checked === true)
                localStorage.setItem("manter-conectado", "true");
            else
                localStorage.setItem("manter-conectado", "false");
            
            divCadastro.style.display = 'none';
        }
        else
            alert("Digite seu nome pra continuar!");
    }

    botaoLoginEl.addEventListener('click', logar);
    function logar() {
        let nomeUsuarioEl = document.querySelector('#nome');
        let nomeUsuario = nomeUsuarioEl.value;

        if (nomeUsuario) {
            let nomeLocal = localStorage.getItem('nome');
            nomeLocal = JSON.parse(nomeLocal);

            if (nomeLocal == nomeUsuario) {
                window.alert('Login realizado com sucesso!');
                if (botaoManterConectado.checked === "true")
                    localStorage.setItem("manter-conectado", "true");
                else
                    localStorage.setItem("manter-conectado", "false");
                divCadastro.style.display = "none";
            }
            else
                window.alert('erro');
        }
        else
            alert("Digite seu nome pra continuar!");
    }
}
