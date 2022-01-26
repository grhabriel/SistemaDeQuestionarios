let botaoInscreverEl = document.querySelector('#cadastrar');
let botaoLoginEl = document.querySelector('#login');
let divCadastro = document.querySelector("#cadastro");
let botaoManterConectado = document.querySelector('#manterConectado');
let divPrincipal = document.querySelector("#quadroInicial");

if (localStorage.getItem("manter-conectado") === "true")
    divCadastro.style.display = 'none';
else {
    if (divCadastro.style.display != "none") {
        divPrincipal.style.display = "none";
    }
    botaoInscreverEl.addEventListener('click', inscricao);
    function inscricao() {
        let nomeUsuarioEl = document.querySelector('#nome');
        let nomeUsuario = nomeUsuarioEl.value;
        if (nomeUsuario) {
            localStorage.setItem('nome', nomeUsuario);
            alert("Inscrição feita com sucesso!");

            if (botaoManterConectado.checked === true)
                localStorage.setItem("manter-conectado", "true");
            else
                localStorage.setItem("manter-conectado", "false");

            divCadastro.style.display = 'none';
            divPrincipal.style.display = 'block';
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

            if (nomeLocal == nomeUsuario) {
                window.alert('Login realizado com sucesso!');
                if (botaoManterConectado.checked === true)
                    localStorage.setItem("manter-conectado", "true");
                else
                    localStorage.setItem("manter-conectado", "false");
                divCadastro.style.display = "none";
                divPrincipal.style.display = "block";
            }
            else
                window.alert('Usuário inválido, tente novamente!');
        }
        else
            alert("Digite seu nome pra continuar!");
    }
}
let botaoDeslogar = document.querySelector('#deslogar');
botaoDeslogar.addEventListener('click', function () {
    localStorage.setItem('manter-conectado', 'false');
    divCadastro.style.display = 'block';
    divPrincipal.style.display = 'none';
});