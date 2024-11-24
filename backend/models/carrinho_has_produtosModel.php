<?php
session_start();
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_SESSION['id_carrinho']) || empty($_POST['id_produtos']) || empty($_POST['quantidade'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "CALL sp_add_to_carrinho (?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_SESSION['id_carrinho'],
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
    $sql = "SELECT * FROM vw_carrinho_produtos";
    $resultado = $pdo->query($sql);
    $carrinho_has_produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $carrinho_has_produtos[] = $row;
    }

    echo json_encode($carrinho_has_produtos);
}

if ($_POST['operacao'] == 'adicionar') {
    if (empty($_POST['id_produtos'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "UPDATE lojatcc.carrinho_has_produtos SET quantidade = quantidade + 1 WHERE id_carrinho = ? AND id_produtos = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_SESSION['id_carrinho'],
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

if ($_POST['operacao'] == 'diminuir') {
    if (empty($_POST['id_produtos'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            // Consultar a quantidade atual do produto no carrinho
            $sqlCheck = "SELECT quantidade FROM lojatcc.carrinho_has_produtos 
                         WHERE id_carrinho = ? AND id_produtos = ?";
            $stmtCheck = $pdo->prepare($sqlCheck);
            $stmtCheck->execute([$_SESSION['id_carrinho'], $_POST['id_produtos']]);
            $currentQuantity = $stmtCheck->fetchColumn();

            if ($currentQuantity === false) {
                $result = array(
                    'type' => 'error',
                    'message' => 'Produto não encontrado no carrinho.'
                );
                echo json_encode($result);
                exit;
            }

            if ($currentQuantity == 1) {
                // Excluir o produto do carrinho
                $sqlDelete = "DELETE FROM lojatcc.carrinho_has_produtos 
                              WHERE id_carrinho = ? AND id_produtos = ?";
                $stmtDelete = $pdo->prepare($sqlDelete);
                $stmtDelete->execute([$_SESSION['id_carrinho'], $_POST['id_produtos']]);
                $result = array(
                    'type' => 'success',
                    'message' => 'Produto removido do carrinho.'
                );
            } else {
                // Diminuir a quantidade do produto no carrinho
                $sqlUpdate = "UPDATE lojatcc.carrinho_has_produtos 
                              SET quantidade = quantidade - 1 
                              WHERE id_carrinho = ? AND id_produtos = ?";
                $stmtUpdate = $pdo->prepare($sqlUpdate);
                $stmtUpdate->execute([$_SESSION['id_carrinho'], $_POST['id_produtos']]);
                $result = array(
                    'type' => 'success',
                    'message' => 'Quantidade atualizada com sucesso!'
                );
            }

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

if ($_POST['operacao'] == 'deleteByIds') {
    if (empty($_POST['ids']) || !isset($_SESSION['id_carrinho'])) {
        $result = array(
            'type' => 'error',
            'message' => 'IDs dos produtos ou carrinho não fornecido.'
        );
        echo json_encode($result);
        exit;
    }

    try {
        $ids = json_decode($_POST['ids'], true); // Decodifica os IDs recebidos como JSON

        // Gera placeholders para a consulta
        $placeholders = implode(',', array_fill(0, count($ids), '?'));
        $sql = "DELETE FROM lojatcc.carrinho_has_produtos 
                WHERE id_carrinho = ? AND id_produtos IN ($placeholders)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute(array_merge([$_SESSION['id_carrinho']], $ids));

        $result = array(
            'type' => 'success',
            'message' => 'Produtos selecionados foram removidos do carrinho.'
        );
        echo json_encode($result);
    } catch (PDOException $e) {
        $result = array(
            'type' => 'error',
            'message' => 'Erro ao remover produtos: ' . $e->getMessage()
        );
        echo json_encode($result);
    }
}


?>
