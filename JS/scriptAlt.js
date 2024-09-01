$(document).ready(function () {
    if (!localStorage.getItem("logado")) {
        // Redirecionamento para a página de login, caso não esteja logado
        alert("Você precisa estar logado para acessar esta página.");
        window.location.href = "index.html";
        return;
    }

    var cliente = JSON.parse(localStorage.getItem("clienteEditar"));

    // Preenchimento dos campos do formulário
    $("#nome").val(cliente.NOME);
    $("#rg").val(cliente.RG);
    $("#cpf").val(cliente.CPF);
    $("#endereco").val(cliente.ENDERECO);
    $("#telefone").val(cliente.TELEFONE);
    $("#email").val(cliente.EMAIL);
    $("#cartaoCredito").val(cliente.C_CREDITO);
    $("#cartaoDebito").val(cliente.C_DEBITO);
    $("#chavePix").val(cliente.PIX);

    // Máscaras
    $("#cpf").mask("000.000.000-00");
    $("#rg").mask("00.000.000-0");
    $("#telefone").mask("(00) 00000-0000");
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    $("#perfilForm").on("submit", function (event) {
        event.preventDefault();
        // Obtenção dos dados do formulário


        // Atualização dos dados do cliente
        cliente.nome = $("#nome").val();
        cliente.rg = $("#rg").val();
        cliente.cpf = $("#cpf").val();
        cliente.endereco = $("#endereco").val();
        cliente.telefone = $("#telefone").val();
        cliente.email = $("#email").val();
        cliente.cartaoCredito = $("#cartaoCredito").val();
        cliente.cartaoDebito = $("#cartaoDebito").val();
        cliente.chavePix = $("#chavePix").val();

        // Atualização do cliente
        var clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        var index = clientes.findIndex(c => c.cpf === cliente.cpf);
        if (index !== -1) {
            localStorage.setItem("clienteLogado", JSON.stringify(cliente));
            clientes[index] = cliente;
            localStorage.setItem('clientes', JSON.stringify(clientes));

            fetch('../PHP/atualizar_cliente.php', {
                method: 'POST', // Método HTTP POST para atualização
                headers: {
                    'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
                },
                body: JSON.stringify(cliente) // Converte o objeto para JSON
            })
            .then(response => response.json()) // Converte a resposta para um objeto JavaScript
            .then(data => {
                // Exibe a mensagem do servidor
                alert(data.mensagem); // Exibe uma mensagem para o usuário
                if (data.sucesso) {
                    console.log('Cliente atualizado com sucesso.');
                } else {
                    console.error('Erro ao atualizar cliente:', data.mensagem);
                }
            })
            .catch(error => console.error('Erro ao enviar requisição:', error));


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
        window.location.href = "index.html";
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
