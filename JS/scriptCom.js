
$(document).ready(function () {
    // Função de envio de comentários
    $("#comentarioForm").on("submit", function (event) {
        event.preventDefault();

        var cliente = JSON.parse(localStorage.getItem("clienteLogado"));

        // Obtenção dos dados do formulário
        var nome = $("#nome").val();
        var comentario = $("#comentario").val();

        // Validação dos campos
        if (!nome || !comentario) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Cria um objeto com os dados do comentário
        const dadosComentario = {
            nome: nome,
            comentario: comentario,
            id_cliente: cliente.id
        };

        // Faz uma requisição POST para o endpoint PHP
        fetch('../PHP/salvar_comentario.php', {
            method: 'POST', // Método HTTP POST para envio
            headers: {
                'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
            },
            body: JSON.stringify(dadosComentario) // Converte o objeto para JSON
        })
        .then(response => response.json()) // Converte a resposta para um objeto JavaScript
        .then(data => {
            // Exibe a mensagem do servidor
            alert(data.mensagem); // Exibe uma mensagem para o usuário
            if (data.sucesso) {
                document.getElementById('comentarioForm').reset();
            }
        })
        .catch(error => console.error('Erro ao enviar comentário:', error));

        // Armazenamento dos comentários
        var comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push({ nome: nome, comentario: comentario });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        renderComentarios();
        alert("Comentário enviado com sucesso!");
        $("#comentarioForm")[0].reset();
    });

    // Renderização dos comentários
    renderComentarios();

    // Função de logout
    $("#btLogout").click(function () {
        localStorage.removeItem("logado");
        attMenu();
        alert('Perfil Deslogado com sucesso!');
        window.location.href = "../../index.html";
    });

    // Atualização do menu
    attMenu();
});

// Função para renderizar os comentários
function renderComentarios() {
    fetch('../PHP/buscar_comentarios.php')
                .then(response => response.json())
                .then(data => {
                    var comentariosList = $("#listaComentarios");
                    comentariosList.empty();
                    
                    data.comentarios.forEach(c => {
                        comentariosList.append(
                            "<li><strong>" + c.NOME_CLIENTE + ":</strong> " + c.COMENTARIO + "</li>"
                        );
                    });
                })
                .catch(error => console.error('Erro ao carregar comentários:', error));
}

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
