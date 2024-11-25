<?php
session_start();
include('./connection/conn.php');

if ($_POST['operacao'] == 'login') {
    $email = $_POST['email'];
    $senha = sha1($_POST['senha']);

    if (empty($email) || empty($senha)) {
        echo json_encode(array('type' => 'error', 'message' => 'E-mail e senha são obrigatórios.'));
        exit();
    }

    try {
        // Busca o usuário pelo e-mail e senha
        $sql = "SELECT * FROM lojatcc.usuario WHERE email = ? AND senha = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$email, $senha]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            // Iniciar a sessão se o usuário for encontrado
            $_SESSION['user_id'] = $user['cpf'];
            $_SESSION['user_name'] = $user['nome'];
            $_SESSION['id_carrinho'] = $user['id_carrinho'];
            echo json_encode(array('type' => 'success', 'message' => 'Login realizado com sucesso.'));
        } else {
            echo json_encode(array('type' => 'error', 'message' => 'Credenciais inválidas.'));
        }
    } catch (PDOException $e) {
        echo json_encode(array('type' => 'error', 'message' => 'Erro: ' . $e->getMessage()));
    }
}

if($_POST['operacao'] == 'verifica'){
    if(isset($_SESSION['user_id'])){
        echo json_encode(array('nome' => $_SESSION['user_name']));
    }else{
        echo json_encode(array('type' => 'error', 'message' => 'Não logado'));
    }
}

if($_POST['operacao'] == 'sair'){
    session_destroy();
    echo json_encode(array('type' => 'success', 'message' => 'Logout realizado com sucesso.'));
}
?>