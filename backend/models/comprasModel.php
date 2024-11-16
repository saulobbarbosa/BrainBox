<?php
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_POST['quantidade']) || empty($_POST['id_produtos']) || empty($_POST['cpf_usuario'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "INSERT INTO lojatcc.compras(quantidade, id_produtos, cpf_usuario) VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['quantidade'],
                $_POST['id_produtos'],
                $_POST['cpf_usuario']
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
    $sql = "SELECT * FROM compras";
    $resultado = $pdo->query($sql);
    $compras = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $compras[] = $row;
    }

    echo json_encode($compras);
}

if ($_POST['operacao'] == 'update') {
    if (empty($_POST['quantidade']) || empty($_POST['id_produtos']) || empty($_POST['cpf_usuario']) || empty($_POST['id_compras'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "UPDATE lojatcc.compras SET quantidade = ?, id_produtos = ?, cpf_usuario = ? WHERE id_compras = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['quantidade'],
                $_POST['id_produtos'],
                $_POST['cpf_usuario'],
                $_POST['id_compras']
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
        $sql = "DELETE FROM lojatcc.compras WHERE id_compras = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['id_compras']]);
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
