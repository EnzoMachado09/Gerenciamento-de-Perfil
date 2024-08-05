$(document).ready(function () {
    if (!localStorage.getItem("logado")) {
        // Redirecionamento para a página de login, caso não esteja logado
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "login.html";
        return;
    }

    var cliente = JSON.parse(localStorage.getItem("clienteLogado"));

    // Preenchimento dos campos do formulário
    $("#nome").val(cliente.nome);
    $("#rg").val(cliente.rg);
    $("#cpf").val(cliente.cpf);
    $("#endereco").val(cliente.endereco);
    $("#telefone").val(cliente.telefone);
    $("#email").val(cliente.email);
    $("#cartaoCredito").val(cliente.cartaoCredito);
    $("#cartaoDebito").val(cliente.cartaoDebito);
    $("#chavePix").val(cliente.chavePix);

    // Máscaras
    $("#cpf").mask("000.000.000-00");
    $("#rg").mask("00.000.000-0");
    $("#telefone").mask("(00) 00000-0000");
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    $("#perfilForm").on("submit", function (event) {
        event.preventDefault();
        // Obtenção dos dados do formulário

        var senha = $("#novaSenha").val();
        var confirmarSenha = $("#confirmarNovaSenha").val();

        // Validação dos campos
        if (senha && senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        // Atualização dos dados do cliente
        cliente.nome = $("#nome").val();
        cliente.rg = $("#rg").val();
        cliente.cpf = $("#cpf").val();
        cliente.endereco = $("#endereco").val();
        cliente.telefone = $("#telefone").val();
        cliente.email = $("#email").val();
        cliente.senha = senha ? senha : cliente.senha;
        cliente.cartaoCredito = $("#cartaoCredito").val();
        cliente.cartaoDebito = $("#cartaoDebito").val();
        cliente.chavePix = $("#chavePix").val();

        // Atualização do cliente
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var index = clientes.findIndex(c => c.cpf === cliente.cpf);
        if (index !== -1) {
            clientes[index] = cliente;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            localStorage.setItem("clienteLogado", JSON.stringify(cliente));
            alert("Dados do cliente atualizados com sucesso!");
        } else {
            alert("Erro ao atualizar o cliente.");
        }
    });

    // Função de logout
    $("#btLogout").click(function () {
        localStorage.removeItem("logado");
        localStorage.removeItem("clienteLogado");
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
