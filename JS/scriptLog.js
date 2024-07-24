$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        let email = $('#emailLogin').val();
        let senha = $('#senhaLogin').val();

        // Limpar erros
        $('#emailLoginError').text('');
        $('#senhaLoginError').text('');

        // Verifica se o e-mail e senha estão preenchidos
        if (email && senha) {
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let usuario = usuarios.find(user => user.email === email && user.senha === senha);

            if (usuario) {
                alert('Login bem-sucedido!');
                window.location.href = 'perfil.html'; // Redireciona para a página de perfil
            } else {
                $('#emailLoginError').text('E-mail ou senha inválidos.');
            }
        } else {
            if (!email) $('#emailLoginError').text('O campo e-mail é obrigatório.');
            if (!senha) $('#senhaLoginError').text('O campo senha é obrigatório.');
        }
    });
});
