<?php
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_POST['tipo'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe um campo obrigatório vazio'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "INSERT INTO lojatcc.categoria(tipo) VALUES (?)";
            $stmp = $pdo->prepare($sql);
            $stmp->execute([
                $_POST['tipo']
            ]);
            $result = array(
                'type' => 'success',
                'message' => 'Registro cadastrado com sucesso'
            );
            echo json_encode($result);
        } catch (PDOException $e) {
            $result = array(
                'type' => 'error',
                'message' => 'Error: ' . $e->getMessage()
            );
            echo json_encode($result);
        }
    }
}

if ($_POST['operacao'] == 'read') {
    $sql = "SELECT * FROM categoria ";
    $resultado = $pdo->query($sql);
    $autores = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $autores[] = $row;
    }

    echo json_encode($autores);
}

if ($_POST['operacao'] == 'update') {
    if (empty($_POST['tipo']) || empty($_POST['id_categoria'])) {
        $dados = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($dados);
    } else {
        try {
            $sql = "UPDATE lojatcc.categoria  SET tipo = ? WHERE id_categoria = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['tipo'],
                $_POST['id_categoria']
            ]);
            $dados = array(
                'type' => 'success',
                'message' => 'Registro atualizado com sucesso!'
            );
            echo json_encode($dados);
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
        $sql = "DELETE FROM lojatcc.categoria  WHERE id_categoria = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['id_categoria']]);

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
