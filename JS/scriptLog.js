$(document).ready(function () {
    // Função de login
    $("#loginForm").on("submit", function (event) {
        event.preventDefault();

        var email = $("#email").val();
        var senha = $("#senha").val();

        // Verificação de cliente existente
         var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
         //var clienteLogado = clientes.find(c => c.email === email && c.senha === senha);

        const credenciais = {
            email: email,
            senha: senha
        };
    
        // Faz uma requisição POST para o endpoint PHP
        fetch('Gerenciamento-de-Perfil/PHP/login.php', {
            method: 'POST', // Método HTTP POST
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(credenciais) // Converte o objeto para JSON
        })
        .then(response => response.json())
        .then(data => {
            // Exibe a resposta do servidor
            //document.getElementById('mensagem').innerText = data.mensagem;
            if (data.sucesso) {
                // Redireciona para outra página ou realiza outra ação de sucesso

                console.log(data.cliente);

                var clienteLogado = {
                    id: data.cliente.ID,
                    nome: data.cliente.NOME,
                    rg: data.cliente.RG,
                    cpf: data.cliente.CPF,
                    endereco: data.cliente.ENDERECO,
                    telefone: data.cliente.TELEFONE,
                    email: data.cliente.EMAIL,
                    senha: data.cliente.SENHA,
                    cartaoCredito: data.cliente.C_CREDITO,
                    cartaoDebito: data.cliente.C_DEBITO,
                    chavePix: data.cliente.PIX,
                    adm: data.cliente.ADM
                };

                localStorage.setItem("logado", "true");
                localStorage.setItem("clienteLogado", JSON.stringify(clienteLogado));
                alert("Login realizado com sucesso!");
                window.location.href = "Gerenciamento-de-Perfil/HTML/perfil.html";
            }
            else{
                alert("E-mail ou senha incorretos.");
            }
        })
        .catch(error => console.error('Erro ao fazer login:', error));

    });

    // Função de logout
    $("#btLogout").click(function () {
        localStorage.removeItem("logado");
        localStorage.removeItem("clienteLogado");
        attMenu();
        alert('Perfil deslogado com sucesso!');
        window.location.href = "Gerenciamento-de-Perfil/index.html";
    });

    // Atualização do menu
    attMenu();
});

// Função para atualizar o menu de navegação
// Função para atualizar o menu de navegação
function attMenu() {
    var estaLogado = localStorage.getItem("logado");
    if (estaLogado) {
        $("#perfilLink").show();
        $("#loginId").hide();
        $("#btLogout").show();
        $("#consultaId").hide();

        //Verifica se usuário é ADM
        var cliente = JSON.parse(localStorage.getItem("clienteLogado"));
        if(cliente.adm == 1)
            $("#consultaId").show();

    } else {
        $("#perfilLink").hide();
        $("#loginId").show();
        $("#btLogout").hide();
        $("#consultaId").hide();
    }
}
