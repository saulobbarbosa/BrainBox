<?php
session_start();
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_POST['id_produto'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe um campo obrigatório vazio'
        );
        echo json_encode($result);
    } else {
        try {
            $sqlCheck = "SELECT COUNT(*) AS count FROM lojatcc.historico WHERE cpf = ? AND id_produtos = ?";
            $stmtCheck = $pdo->prepare($sqlCheck);
            $stmtCheck->execute([
                $_SESSION['user_id'], 
                $_POST['id_produto']
            ]);
            $row = $stmtCheck->fetch(PDO::FETCH_ASSOC);

            if ($row['count'] > 0) {
                $sqlUpdate = "UPDATE lojatcc.historico SET data_vis = CURRENT_TIMESTAMP WHERE cpf = ? AND id_produtos = ?";
                $stmtUpdate = $pdo->prepare($sqlUpdate);
                $stmtUpdate->execute([
                    $_SESSION['user_id'], 
                    $_POST['id_produto']
                ]);
                $result = array(
                    'type' => 'success',
                    'message' => 'Data de visualização atualizada com sucesso'
                );
            } else {
                $sqlInsert = "INSERT INTO lojatcc.historico (cpf, id_produtos) VALUES (?, ?)";
                $stmtInsert = $pdo->prepare($sqlInsert);
                $stmtInsert->execute([
                    $_SESSION['user_id'], 
                    $_POST['id_produto']
                ]);

                $sqlCount = "SELECT COUNT(*) AS total FROM lojatcc.historico WHERE cpf = ?";
                $stmtCount = $pdo->prepare($sqlCount);
                $stmtCount->execute([$_SESSION['user_id']]);
                $rowCount = $stmtCount->fetch(PDO::FETCH_ASSOC);

                if ($rowCount['total'] > 5) {
                    $sqlGetMinDataVis = "
                        SELECT MIN(data_vis) AS min_data_vis
                        FROM lojatcc.historico 
                        WHERE cpf = ?";
                    $stmtGetMinDataVis = $pdo->prepare($sqlGetMinDataVis);
                    $stmtGetMinDataVis->execute([$_SESSION['user_id']]);
                    $minDataVis = $stmtGetMinDataVis->fetch(PDO::FETCH_ASSOC)['min_data_vis'];

                    $sqlDelete = "
                        DELETE FROM lojatcc.historico 
                        WHERE cpf = ? 
                        AND data_vis = ?
                        LIMIT 1";
                    $stmtDelete = $pdo->prepare($sqlDelete);
                    $stmtDelete->execute([$_SESSION['user_id'], $minDataVis]);
                }

                $result = array(
                    'type' => 'success',
                    'message' => 'Registro cadastrado com sucesso'
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



if ($_POST['operacao'] == 'read') {
    $sql = "SELECT id_produtos,arquivo_img FROM view_historico_produtos WHERE cpf = ".$_SESSION['user_id'];
    $resultado = $pdo->query($sql);
    $dados = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $dados[] = $row;
    }

    echo json_encode($dados);
}
?>
