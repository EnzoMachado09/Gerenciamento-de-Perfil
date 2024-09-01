<?php
header("Content-Type: application/json; charset=UTF-8");

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
$rg = $data['rg'];
$cpf = $data['cpf'];
$endereco = $data['endereco'];
$telefone = $data['telefone'];
$email = $data['email'];
$senha = $data['senha'];
$cartaoCredito = $data['cartaoCredito'];
$cartaoDebito = $data['cartaoDebito'];
$chavePix = $data['chavePix'];

// Validações para campos obrigatórios
$erros = [];

// Verifica cada campo individualmente
if (empty($nome)) {
    $erros[] = "nome";
}

if (empty($rg)) {
    $erros[] = "rg";
}

if (empty($cpf)) {
    $erros[] = "cpf";
}

if (empty($endereco)) {
    $erros[] = "endereco";
}

if (empty($telefone)) {
    $erros[] = "telefone";
}

if (empty($email)) {
    $erros[] = "email";
}

if (empty($senha)) {
    $erros[] = "senha";
}

if (empty($cartaoCredito)) {
    $erros[] = "cartaoCredito";
}

if (empty($cartaoDebito)) {
    $erros[] = "cartaoDebito";
}

if (empty($chavePix)) {
    $erros[] = "chavePix";
}

// Verifica se há algum campo vazio
if (!empty($erros)) {
    echo json_encode(["erro" => "Os seguintes campos são obrigatórios: " . implode(", ", $erros) . "."]);
    exit;
}

//$senhaHash = password_hash($senha, PASSWORD_BCRYPT);

// Insere os dados no banco de dados usando prepared statement
$stmt = $conn->prepare("INSERT INTO clientes (NOME, RG, CPF, ENDERECO, TELEFONE, EMAIL, SENHA, C_CREDITO, C_DEBITO, PIX) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"); 
$stmt->bind_param("ssssssssss", $nome, $rg, $cpf, $endereco, $telefone, $email, $senha, $cartaoCredito, $cartaoDebito, $chavePix);

if ($stmt->execute()) {
    echo json_encode(["mensagem" => "Usuário cadastrado com sucesso!"]);
} else {
    echo json_encode(["erro" => "Erro ao cadastrar usuário: " . $stmt->error]);
}

$stmt->close();
$conn->close();
?>