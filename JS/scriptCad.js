$(document).ready(function () {
    // Máscaras de entrada
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    // Mostrar/ocultar perfil com base no login
    updateNavbar();

    $('#cadastroForm').on('submit', function (event) {
        event.preventDefault();

        let nome = $('#nome').val();
        let rg = $('#rg').val();
        let cpf = $('#cpf').val();
        let endereco = $('#endereco').val();
        let telefone = $('#telefone').val();
        let email = $('#email').val();
        let senha = $('#senha').val();
        let cartaoCredito = $('#cartaoCredito').val();
        let cartaoDebito = $('#cartaoDebito').val();
        let chavePix = $('#chavePix').val();

        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        clientes.push({
            nome,
            rg,
            cpf,
            endereco,
            telefone,
            email,
            senha,
            cartaoCredito,
            cartaoDebito,
            chavePix
        });

        localStorage.setItem('clientes', JSON.stringify(clientes));
        alert('Cadastro realizado com sucesso!');
        $('#cadastroForm')[0].reset();
    });

    function updateNavbar() {
        let isLoggedIn = sessionStorage.getItem('loggedInUser') !== null;
        if (isLoggedIn) {
            $('#perfilLink').show();
        } else {
            $('#perfilLink').hide();
        }
    }
});
