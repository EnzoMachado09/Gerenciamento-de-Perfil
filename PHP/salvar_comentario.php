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
$nome = $data['nome'];
$comentario = $data['comentario'];
$id_cliente = $data['id_cliente'];

// Verifica se o nome e o comentário foram fornecidos
if (empty($nome) || empty($comentario)) {
    echo json_encode(["mensagem" => "Nome e comentário são obrigatórios.", "sucesso" => false]);
    exit;
}

// Consulta SQL para salvar o comentário
$sql = "INSERT INTO comentarios (ID_CLIENTE, NOME_CLIENTE, COMENTARIO) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("iss", $id_cliente, $nome, $comentario);

// Executa a inserção
if ($stmt->execute()) {
    echo json_encode(["mensagem" => "Comentário enviado com sucesso!", "sucesso" => true]);
} else {
    echo json_encode(["mensagem" => "Erro ao salvar o comentário: " . $stmt->error, "sucesso" => false]);
}

$stmt->close();
$conn->close();
?>
