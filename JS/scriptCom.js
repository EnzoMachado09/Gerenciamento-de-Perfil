
$(document).ready(function () {
    // Função de envio de comentários
    $("#comentarioForm").on("submit", function (event) {
        event.preventDefault();

        // Obtenção dos dados do formulário
        var nome = $("#nome").val();
        var comentario = $("#comentario").val();

        // Validação dos campos
        if (!nome || !comentario) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

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
        window.location.href = "login.html";
    });

    // Atualização do menu
    attMenu();
});

// Função para renderizar os comentários
function renderComentarios() {
    var comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    var comentariosList = $("#listaComentarios");
    comentariosList.empty();

    comentarios.forEach(function (c) {
        comentariosList.append(
            "<li><strong>" + c.nome + ":</strong> " + c.comentario + "</li>"
        );
    });
}

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
