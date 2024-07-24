$(document).ready(function () {
    $('#comentarioForm').on('submit', function (event) {
        event.preventDefault();

        let nome = $('#nome').val();
        let comentario = $('#comentario').val();

        let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        comentarios.push({ nome, comentario });

        localStorage.setItem('comentarios', JSON.stringify(comentarios));
        alert('Comentário enviado com sucesso!');
        $('#comentarioForm')[0].reset();
        loadComentarios();
    });

    function loadComentarios() {
        let comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        $('#listaComentarios').empty();
        comentarios.forEach(function (comentario) {
            $('#listaComentarios').append(`<li><strong>${comentario.nome}:</strong> ${comentario.comentario}</li>`);
        });
    }

    function updateNavbar() {
        let isLoggedIn = sessionStorage.getItem('loggedInUser') !== null;
        if (isLoggedIn) {
            $('#perfilLink').show();
        } else {
            $('#perfilLink').hide();
        }
    }

    updateNavbar();
    loadComentarios();
});
