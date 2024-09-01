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
$senha = $data['senha'];

// Verifica se os campos estão preenchidos
if (empty($email) || empty($senha)) {
    echo json_encode(["mensagem" => "Usuário e senha são obrigatórios.", "sucesso" => false]);
    exit;
}

// Consulta SQL para verificar se o usuário e senha estão corretos
$sql = "SELECT * FROM clientes WHERE EMAIL = '$email' AND SENHA = '$senha'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Usuário encontrado e senha correta
    $cliente = $result->fetch_assoc();
    echo json_encode(["mensagem" => "Login realizado com sucesso!", "sucesso" => true, "cliente" => $cliente]);
} else {
    // Usuário não encontrado ou senha incorreta
    echo json_encode(["mensagem" => "Usuário ou senha incorretos.", "sucesso" => false]);
}

$conn->close();
?>