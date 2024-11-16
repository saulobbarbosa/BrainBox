<?php
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_POST['id_carrinho']) || empty($_POST['id_produtos']) || empty($_POST['quantidade'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "INSERT INTO lojatcc.carrinho_has_produtos(id_carrinho, id_produtos, quantidade) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['id_carrinho'],
                $_POST['id_produtos'],
                $_POST['quantidade']
            ]);
            $result = array(
                'type' => 'success',
                'message' => 'Registro cadastrado com sucesso'
            );
            echo json_encode($result);
        } catch (PDOException $e) {
            $result = array(
                'type' => 'error',
                'message' => 'Erro: ' . $e->getMessage()
            );
            echo json_encode($result);
        }
    }
}

if ($_POST['operacao'] == 'read') {
    $sql = "SELECT * FROM carrinho_has_produtos";
    $resultado = $pdo->query($sql);
    $carrinho_has_produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $carrinho_has_produtos[] = $row;
    }

    echo json_encode($carrinho_has_produtos);
}

if ($_POST['operacao'] == 'update') {
    if (empty($_POST['id_carrinho']) || empty($_POST['id_produtos']) || empty($_POST['quantidade'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "UPDATE lojatcc.carrinho_has_produtos SET quantidade = ? WHERE id_carrinho = ? AND id_produtos = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['quantidade'],
                $_POST['id_carrinho'],
                $_POST['id_produtos']
            ]);
            $result = array(
                'type' => 'success',
                'message' => 'Registro atualizado com sucesso!'
            );
            echo json_encode($result);
        } catch (PDOException $e) {
            $result = array(
                'type' => 'error',
                'message' => 'Erro: ' . $e->getMessage()
            );
            echo json_encode($result);
        }
    }
}

if ($_POST['operacao'] == 'delete') {
    try {
        $sql = "DELETE FROM lojatcc.carrinho_has_produtos WHERE id_carrinho = ? AND id_produtos = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['id_carrinho'], $_POST['id_produtos']]);
        $dados = array(
            'type' => 'success',
            'message' => 'Registro excluído com sucesso!'
        );
        echo json_encode($dados);
    } catch (PDOException $e) {
        $dados = array(
            'type' => 'error',
            'message' => 'Erro: ' . $e->getMessage()
        );
        echo json_encode($dados);
    }
}
?>
