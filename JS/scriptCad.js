$(document).ready(function () {
    // Máscaras de entrada
    $("#cpf").mask("000.000.000-00");
    $("#rg").mask("00.000.000-0");
    $("#telefone").mask("(00) 00000-0000");
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    // Função de cadastro
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

        // Verificação de cliente existente
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var clienteExistente = clientes.find(c => c.cpf === cliente.cpf || c.email === cliente.email);

        
        if (clienteExistente) {
            alert('Já existe um cliente cadastrado com esse CPF ou E-mail.');
        } else {
            clientes.push(cliente);
            localStorage.setItem('clientes', JSON.stringify(clientes));
            localStorage.setItem("cliente", JSON.stringify(cliente));
            alert("Cliente cadastrado com sucesso!");
            window.location.href = "login.html";
        }
    });

    // Função de logout
    $("#btLogout").click(function () {
        localStorage.removeItem("logado");
        attMenu();
        alert('Perfil deslogado com sucesso!');
        window.location.href = "login.html";
    });

    // Atualização do menu
    attMenu();
});

// Função para atualizar o menu de navegação
function attMenu() {
    var estaLogado = localStorage.getItem("logado");
    if (estaLogado) {
        $("#perfilLink").show();
        $("#loginId").hide();
        $("#btLogout").show();
    } else {
        $("#perfilLink").hide();
        $("#loginId").show();
        $("#btLogout").hide();
    }
}
