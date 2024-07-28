$(document).ready(function () {
    $("#cpf").mask("000.000.000-00");
    $("#rg").mask("00.000.000-0");
    $("#telefone").mask("(00) 00000-0000");
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    $("#cadastroForm").on("submit", function (event) {
        event.preventDefault();

        var nome = $("#nome").val();
        var rg = $("#rg").val();
        var cpf = $("#cpf").val();
        var endereco = $("#endereco").val();
        var telefone = $("#telefone").val();
        var email = $("#email").val();
        var senha = $("#senha").val();
        var cartaoCredito = $("#cartaoCredito").val();
        var cartaoDebito = $("#cartaoDebito").val();
        var chavePix = $("#chavePix").val();

        var cliente = {
            nome: nome,
            rg: rg,
            cpf: cpf,
            endereco: endereco,
            telefone: telefone,
            email: email,
            senha: senha,
            cartaoCredito: cartaoCredito,
            cartaoDebito: cartaoDebito,
            chavePix: chavePix
        };

        localStorage.setItem("cliente", JSON.stringify(cliente));
        alert("Cliente cadastrado com sucesso!");
        window.location.href = "login.html";
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
