$(document).ready(function () {
    // Função para carregar comentários do localStorage
    function loadComentarios() {
        var comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
        $('#comentariosList').empty();
        comentarios.forEach(function (comentario) {
            $('#comentariosList').append('<p><strong>' + comentario.nome + ':</strong> ' + comentario.comentario + '</p>');
        });
    }

    // Carregar comentários ao iniciar
    loadComentarios();

    // Enviar comentário
    $('#comentarioForm').on('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        // Limpar erros
        $('.error').text('');

        // Variáveis para os valores dos campos
        var nome = $('#nome').val();
        var comentario = $('#comentario').val();

        // Verificador de erro
        var hasError = false;

        // Validação do nome
        if (nome === '') {
            $('#nomeError').text('O campo nome é obrigatório.');
            hasError = true;
        }

        // Validação do comentário
        if (comentario === '') {
            $('#comentarioError').text('O campo comentário é obrigatório.');
            hasError = true;
        }

        // Processar o formulário em caso de tudo estar ok
        if (!hasError) {
            var comentarios = JSON.parse(localStorage.getItem('comentarios')) || [];
            comentarios.push({ nome: nome, comentario: comentario });
            localStorage.setItem('comentarios', JSON.stringify(comentarios));
            loadComentarios();

            $('#nome').val('');
            $('#comentario').val('');

            alert('Comentário enviado com sucesso!');
        }
    });
});