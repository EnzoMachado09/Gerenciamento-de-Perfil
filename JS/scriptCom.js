$(document).ready(function() {
    $("#comentarioForm").on("submit", function(event) {
        event.preventDefault();

        var nome = $("#nome").val();
        var comentario = $("#comentario").val();

        if (!nome || !comentario) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        var comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push({ nome: nome, comentario: comentario });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        renderComentarios();
        alert("Comentário enviado com sucesso!");
        $("#comentarioForm")[0].reset();
    });

    renderComentarios();

    $("#btLogout").click(function() {
        localStorage.removeItem("loggedIn");
        updateNavbar();
        alert('Perfil Deslogado com sucesso!');
        window.location.href = "login.html";
    });

    updateNavbar();
});

function renderComentarios() {
    var comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    var comentariosList = $("#listaComentarios");
    comentariosList.empty();

    comentarios.forEach(function(c) {
        comentariosList.append(
            "<li><strong>" + c.nome + ":</strong> " + c.comentario + "</li>"
        );
    });
}

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
