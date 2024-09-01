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
$email = $data['email'];

// Verifica se o e-mail foi fornecido
if (empty($email)) {
    echo json_encode(["mensagem" => "O campo de e-mail é obrigatório.", "sucesso" => false]);
    exit;
}

// Consulta SQL para buscar o cliente pelo e-mail
$sql = "SELECT * FROM clientes WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Cliente encontrado
    $cliente = $result->fetch_assoc(); // Obtém as informações do cliente
    echo json_encode(["mensagem" => "Cliente encontrado.", "sucesso" => true, "cliente" => $cliente]);
} else {
    // Cliente não encontrado
    echo json_encode(["mensagem" => "Nenhum cliente encontrado com este e-mail.", "sucesso" => false]);
}

$stmt->close();