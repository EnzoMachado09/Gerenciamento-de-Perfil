<?php
header("Content-Type: application/json; charset=UTF-8"); // Define o tipo de conteúdo como JSON

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "banco";

// Cria a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die(json_encode(["erro" => "Conexão falhou: " . $conn->connect_error]));
}

// Recebe os dados da requisição
$data = json_decode(file_get_contents("php://input"), true);

// Captura os dados a serem atualizados
$id = $data['id'];
$nome = $data['nome'];
$rg = $data['rg'];
$cpf = $data['cpf'];
$endereco = $data['endereco'];
$telefone = $data['telefone'];
$email = $data['email'];
$senha = $data['senha'];
$cartaoCredito = $data['cartaoCredito'];
$cartaoDebito = $data['cartaoDebito'];
$chavePix = $data['chavePix'];
$adm = $data['adm'];

// Verifica se o ID do cliente foi passado
if (empty($id)) {
    echo json_encode(["mensagem" => "ID do cliente é obrigatório.", "sucesso" => false]);
    exit;
}

// Verifica se todos os campos obrigatórios estão preenchidos (exemplo)
if (empty($nome) || empty($email)) {
    echo json_encode(["mensagem" => "Nome e email são obrigatórios.", "sucesso" => false]);
    exit;
}

// Consulta SQL para atualizar os dados do cliente
$sql = "UPDATE clientes SET NOME=?, ENDERECO=?, TELEFONE=?, SENHA=?, C_CREDITO=?, C_DEBITO=?, PIX=? WHERE ID=?";

// Preparação da declaração SQL para prevenir SQL Injection
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssss", $nome, $endereco, $telefone, $senha, $cartaoCredito, $cartaoDebito, $chavePix, $id);

// Executa a atualização
if ($stmt->execute()) {
    echo json_encode(["mensagem" => "Dados do cliente atualizados com sucesso!", "sucesso" => true]);
} else {
    echo json_encode(["mensagem" => "Erro ao atualizar os dados do cliente: " . $stmt->error, "sucesso" => false]);
}

// Fecha a conexão
$stmt->close();
$conn->close();
?>