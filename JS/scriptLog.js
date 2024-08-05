$(document).ready(function () {
    // Função de login
    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var senha = $("#senha").val();

        // Verificação de cliente existente
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var clienteLogado = clientes.find(c => c.email === email && c.senha === senha);

        // Login do cliente
        if (clienteLogado != null) {
            localStorage.setItem("logado", "true");
            localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
            alert("Login realizado com sucesso!");
            window.location.href = "perfil.html";
        } else {
            alert("E-mail ou senha incorretos.");
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
