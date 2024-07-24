$(document).ready(function () {
    // Máscaras de entrada
    $('#cpf').mask('000.000.000-00', { reverse: true });
    $('#telefone').mask('(00) 00000-0000');
    $('#cartaoCredito').mask('0000 0000 0000 0000');
    $('#cartaoDebito').mask('0000 0000 0000 0000');

    $('#cadastroForm').on('submit', function (event) {
        event.preventDefault(); // Impede o envio do formulário para validação

        let nome = $('#nome').val();
        let rg = $('#rg').val();
        let cpf = $('#cpf').val();
        let endereco = $('#endereco').val();
        let telefone = $('#telefone').val();
        let email = $('#email').val();
        let senha = $('#senha').val(); // Captura o valor da senha
        let cartaoCredito = $('#cartaoCredito').val();
        let cartaoDebito = $('#cartaoDebito').val();
        let chavePix = $('#chavePix').val();

        // Validação simples para verificar se os campos estão preenchidos
        if (nome && rg && cpf && endereco && telefone && email && senha && cartaoCredito && cartaoDebito && chavePix) {
            // Armazena os dados no localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
            let usuarioExistente = usuarios.find(user => user.email === email || user.cpf === cpf);

            if (usuarioExistente) {
                alert('Usuário já cadastrado com este e-mail ou CPF.');
            } else {
                usuarios.push({
                    nome: nome,
                    rg: rg,
                    cpf: cpf,
                    endereco: endereco,
                    telefone: telefone,
                    email: email,
                    senha: senha,
                    cartaoCredito: cartaoCredito,
                    cartaoDebito: cartaoDebito,
                    chavePix: chavePix
                });
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                alert('Cadastro realizado com sucesso!');
                // Redireciona para a página de login após o cadastro
                window.location.href = 'login.html';
            }
        } else {
            alert('Por favor, preencha todos os campos.');
        }
    });
});
