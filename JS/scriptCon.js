$(document).ready(function () {
    $("#consultaForm").on("submit", function (event) {
      event.preventDefault();
      // Obtenção dos dados do formulário

      var email = $("#email").val();

      const dadosConsulta = {
        email: email
    };

      fetch('../PHP/consultar_cliente.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(dadosConsulta)
    })
    .then(response => response.json())
    .then(data => {
        if (data.sucesso) {
            exibirInformacoesCliente(data.cliente);
        } else {
            // Exibe uma mensagem de erro caso o cliente não seja encontrado
            alert(data.mensagem);
        }
    })
    .catch(error => console.error('Erro ao consultar cliente:', error));
    });
});

function exibirInformacoesCliente(cliente) {
  document.getElementById('infoCliente').removeAttribute("hidden");

  document.getElementById('nome').textContent = cliente.NOME;
  document.getElementById('rg').textContent = cliente.RG;
  document.getElementById('cpf').textContent = cliente.CPF;
  document.getElementById('endereco').textContent = cliente.ENDERECO;
  document.getElementById('telefone').textContent = cliente.TELEFONE;
  document.getElementById('email').textContent = cliente.EMAIL;
  document.getElementById('cartaoCredito').textContent = cliente.C_CREDITO;
  document.getElementById('cartaoDebito').textContent = cliente.C_DEBITO;
  document.getElementById('chavePix').textContent = cliente.PIX;

  localStorage.setItem('clienteEditar', JSON.stringify(cliente));
}

function editarCliente() {
  window.location.href = "altera_cliente.html";
}

function excluirCliente() {
      // Captura o e-mail do cliente exibido na tela
      const email = document.getElementById('email').textContent;

      // Confirmação antes de excluir
      if (!confirm(`Tem certeza de que deseja excluir o cliente com o e-mail: ${email}?`)) {
          return; // Se o usuário cancelar, não faz nada
      }
  
      // Cria um objeto com o e-mail do cliente
      const dadosExclusao = {
          email: email
      };
  
      // Faz uma requisição POST para o endpoint PHP
      fetch('../PHP/excluir_cliente.php', {
          method: 'POST', // Método HTTP POST para exclusão
          headers: {
              'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON
          },
          body: JSON.stringify(dadosExclusao) // Converte o objeto para JSON
      })
      .then(response => response.json()) // Converte a resposta para um objeto JavaScript
      .then(data => {
          // Exibe a mensagem do servidor
          alert(data.mensagem); // Exibe uma mensagem para o usuário
          if (data.sucesso) {
              // Se a exclusão for bem-sucedida, oculta a div de informações do cliente
              document.getElementById('infoCliente').setAttribute("hidden");
          }
      })
      .catch(error => console.error('Erro ao excluir cliente:', error));
}