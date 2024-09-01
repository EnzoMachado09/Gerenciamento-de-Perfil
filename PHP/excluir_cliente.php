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

// Consulta SQL para excluir o cliente pelo e-mail
$sql = "DELETE FROM clientes WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);

// Executa a exclusão
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(["mensagem" => "Cliente excluído com sucesso!", "sucesso" => true]);
    } else {
        echo json_encode(["mensagem" => "Nenhum cliente encontrado com este e-mail.", "sucesso" => false]);
    }
} else {
    echo json_encode(["mensagem" => "Erro ao excluir o cliente: " . $stmt->error, "sucesso" => false]);
}

$stmt->close();
$conn->close();
?>