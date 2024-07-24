$(document).ready(function () {
    // Máscaras de entrada
    $('#telefone').mask('(00) 00000-0000');

    let loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'));

    if (!loggedInUser) {
        alert('Você precisa estar logado para acessar esta página.');
        window.location.href = 'login.html';
        return;
    }

    // Preencher os campos com os dados do usuário logado
    $('#nome').val(loggedInUser.nome);
    $('#rg').val(loggedInUser.rg);
    $('#cpf').val(loggedInUser.cpf);
    $('#endereco').val(loggedInUser.endereco);
    $('#telefone').val(loggedInUser.telefone);
    $('#email').val(loggedInUser.email);

    $('#perfilForm').on('submit', function (event) {
        event.preventDefault();

        let senhaAtual = $('#senhaAtual').val();
        let novaSenha = $('#novaSenha').val();
        let confirmarNovaSenha = $('#confirmarNovaSenha').val();

        if (senhaAtual !== loggedInUser.senha) {
            alert('Senha atual incorreta.');
            return;
        }

        if (novaSenha && novaSenha !== confirmarNovaSenha) {
            alert('A nova senha e a confirmação da nova senha não coincidem.');
            return;
        }

        // Atualizar os dados do usuário
        loggedInUser.nome = $('#nome').val();
        loggedInUser.rg = $('#rg').val();
        loggedInUser.endereco = $('#endereco').val();
        loggedInUser.telefone = $('#telefone').val();
        if (novaSenha) {
            loggedInUser.senha = novaSenha;
        }

        // Atualizar no localStorage
        let clientes = JSON.parse(localStorage.getItem('clientes')) || [];
        let index = clientes.findIndex(cliente => cliente.email === loggedInUser.email);
        if (index !== -1) {
            clientes[index] = loggedInUser;
            localStorage.setItem('clientes', JSON.stringify(clientes));
            sessionStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
            alert('Perfil atualizado com sucesso!');
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
