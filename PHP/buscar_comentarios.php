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

// Consulta SQL para buscar todos os comentários
$sql = "SELECT * FROM comentarios";
$result = $conn->query($sql);

$comentarios = [];

if ($result->num_rows > 0) {
    // Armazena os dados em um array
    while ($row = $result->fetch_assoc()) {
        $comentarios[] = $row;
    }
}

// Retorna os comentários em formato JSON
echo json_encode(["comentarios" => $comentarios]);

$conn->close();
?>
