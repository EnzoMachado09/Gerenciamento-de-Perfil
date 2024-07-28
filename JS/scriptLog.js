$(document).ready(function () {
    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        var emailOrCpfLogin = $("#emailOrCpfLogin").val();
        var senhaLogin = $("#senhaLogin").val();

        var cliente = JSON.parse(localStorage.getItem("cliente"));

        if (!cliente) {
            alert("Nenhum cliente cadastrado.");
            return;
        }

        if (
            (emailOrCpfLogin === cliente.email || emailOrCpfLogin === cliente.cpf) &&
            senhaLogin === cliente.senha
        ) {
            alert("Login bem-sucedido!");
            localStorage.setItem("loggedIn", true);
            updateNavbar();
            window.location.href = "perfil.html";
        } else {
            alert("E-mail/CPF ou senha incorretos.");
        }
    });

    updateNavbar();
});

function updateNavbar() {
    var isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        $("#perfilLink").show();
        $("#loginId").hide();
    } else {
        $("#perfilLink").hide();
        $("#loginId").show();
    }
}
