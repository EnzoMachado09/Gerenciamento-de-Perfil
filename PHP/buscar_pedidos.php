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
$id_cliente = $data['id_cliente'];

// Verifica se o ID do usuário foi fornecido
if (empty($id_cliente)) {
    echo json_encode(["mensagem" => "O ID do usuário é obrigatório.", "sucesso" => false]);
    exit;
}

// Consulta SQL para buscar os pedidos do usuário pelo ID
$sql = "SELECT * FROM pedidos WHERE ID_CLIENTE = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_cliente);
$stmt->execute();
$result = $stmt->get_result();

$pedidos = [];

if ($result->num_rows > 0) {
    // Armazena os pedidos em um array
    while ($row = $result->fetch_assoc()) {
        $pedidos[] = $row;
    }
}

// Retorna os pedidos em formato JSON
echo json_encode(["pedidos" => $pedidos]);

$stmt->close();
$conn->close();
?>
