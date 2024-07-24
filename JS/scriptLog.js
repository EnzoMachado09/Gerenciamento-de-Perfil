$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        let email = $('#emailOrCpfLogin').val();
        let senha = $('#senhaLogin').val();
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];

        let usuarioEncontrado = clientes.find(cliente => cliente.email === email && cliente.senha === senha);

        if (usuarioEncontrado) {
            sessionStorage.setItem('loggedInUser', JSON.stringify(usuarioEncontrado));
            alert('Login realizado com sucesso!');
            window.location.href = 'perfil.html';
        } else {
            $('#emailOrCpfLoginError').text('E-mail ou senha incorretos.');
        }
    });

    function updateNavbar() {
        let isLoggedIn = sessionStorage.getItem('loggedInUser') !== null;
        if (isLoggedIn) {
            $('#perfilLink').show();
        } else {
            $('#perfilLink').hide();
        }
    }

    updateNavbar();
});
