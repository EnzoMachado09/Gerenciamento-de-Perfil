$(document).ready(function () {
    if (!localStorage.getItem("loggedIn")) {
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    var cliente = JSON.parse(localStorage.getItem("cliente"));

    $("#nome").val(cliente.nome);
    $("#rg").val(cliente.rg);
    $("#cpf").val(cliente.cpf);
    $("#endereco").val(cliente.endereco);
    $("#telefone").val(cliente.telefone);
    $("#email").val(cliente.email);
    $("#senha").val(cliente.senha);
    $("#cartaoCredito").val(cliente.cartaoCredito);
    $("#cartaoDebito").val(cliente.cartaoDebito);
    $("#chavePix").val(cliente.chavePix);

    $("#cpf").mask("000.000.000-00");
    $("#rg").mask("00.000.000-0");
    $("#telefone").mask("(00) 00000-0000");

    $("#perfilForm").on("submit", function (event) {
        event.preventDefault();

        cliente.nome = $("#nome").val();
        cliente.rg = $("#rg").val();
        cliente.cpf = $("#cpf").val();
        cliente.endereco = $("#endereco").val();
        cliente.telefone = $("#telefone").val();
        cliente.email = $("#email").val();
        cliente.senha = $("#senha").val();
        cliente.cartaoCredito = $("#cartaoCredito").val();
        cliente.cartaoDebito = $("#cartaoDebito").val();
        cliente.chavePix = $("#chavePix").val();

        localStorage.setItem("cliente", JSON.stringify(cliente));
        alert("Dados do cliente atualizados com sucesso!");
    });

    $("#btLogout").click(function () {
        localStorage.removeItem("loggedIn");
        updateNavbar();
        alert('Perfil Deslogado com sucesso!');
        window.location.href = "login.html";
    });

    updateNavbar();
});

function updateNavbar() {
    var isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) {
        $("#perfilLink").show();
        $("#loginId").hide();
        $("#btLogout").show();
    } else {
        $("#perfilLink").hide();
        $("#loginId").show();
        $("#btLogout").hide();
    }
}
