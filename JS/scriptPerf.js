$(document).ready(function () {
    // Máscaras de entrada
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');

    // Verifica se o usuário está logado
    let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (usuarioLogado && usuarioLogado.logado) {
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuario = usuarios.find(user => user.email === usuarioLogado.email);

        if (usuario) {
            $('#nome').val(usuario.nome);
            $('#rg').val(usuario.rg);
            $('#cpf').val(usuario.cpf);
            $('#endereco').val(usuario.endereco);
            $('#telefone').val(usuario.telefone);
            $('#email').val(usuario.email);
        }
    } else {
        // Redireciona para a página de login se o usuário não estiver logado
        window.location.href = 'login.html';
    }

    $('#perfilForm').on('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        let nome = $('#nome').val();
        let rg = $('#rg').val();
        let endereco = $('#endereco').val();
        let telefone = $('#telefone').val();
        let senhaAtual = $('#senhaAtual').val();
        let novaSenha = $('#novaSenha').val();
        let confirmarNovaSenha = $('#confirmarNovaSenha').val();

        // Validação simples para verificar se a senha atual está correta
        let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        let usuario = usuarios.find(user => user.email === usuarioLogado.email);

        if (usuario && usuario.senha === senhaAtual) {
            if (novaSenha && novaSenha !== confirmarNovaSenha) {
                alert('A nova senha e a confirmação da nova senha não correspondem.');
            } else {
                // Atualiza os dados do usuário
                usuario.nome = nome;
                usuario.rg = rg;
                usuario.endereco = endereco;
                usuario.telefone = telefone;
                if (novaSenha) usuario.senha = novaSenha; // Atualiza a senha se fornecida

                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Perfil atualizado com sucesso!');
            }
        } else {
            alert('Senha atual incorreta.');
        }
    });

    // Configurar botão de logout
    $('#logoutLink').click(function () {
        localStorage.removeItem('usuarioLogado');
        window.location.href = 'login.html';
    });
});
