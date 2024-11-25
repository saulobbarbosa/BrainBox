<?php
include('../connection/conn.php');

if ($_POST['operacao'] == 'create') {
    if (empty($_POST['nome']) || empty($_POST['descricao']) || empty($_POST['preco']) || empty($_POST['oferta']) || empty($_POST['id_categoria'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "INSERT INTO lojatcc.produtos(nome, descricao, preco, oferta, id_categoria) VALUES (?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['nome'],
                $_POST['descricao'],
                $_POST['preco'],
                $_POST['oferta'],
                $_POST['id_categoria']
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
    $sql = "SELECT * FROM produtos";
    $resultado = $pdo->query($sql);
    $produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}

if ($_POST['operacao'] == 'update') {
    if (empty($_POST['nome']) || empty($_POST['descricao']) || empty($_POST['preco']) || empty($_POST['oferta']) || empty($_POST['id_categoria']) || empty($_POST['id_produtos'])) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "UPDATE lojatcc.produtos SET nome = ?, descricao = ?, preco = ?, oferta = ?, id_categoria = ? WHERE id_produtos = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['nome'],
                $_POST['descricao'],
                $_POST['preco'],
                $_POST['oferta'],
                $_POST['id_categoria'],
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
        $sql = "DELETE FROM lojatcc.produtos  WHERE id_produtos = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['id_produtos']]);

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

if ($_POST['operacao'] == 'pesquisar') {
    $nome_produto = "%" . $_POST['nome_produto'] . "%"; 
    $sql = "SELECT * FROM produtos WHERE nome LIKE :nome_produto";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':nome_produto', $nome_produto, PDO::PARAM_STR);
    
    $stmt->execute();
    $produtos = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}



if ($_POST['operacao'] == 'buscar1') {
    $id_produto = $_POST['id_produtos'];
    $sql = "SELECT * FROM produtos WHERE id_produtos =".$id_produto;
    $resultado = $pdo->query($sql);
    $produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}

if ($_POST['operacao'] == 'buscarCategoria') {
    $nome_categoria = $_POST['nome_categoria'];
    $sql = "SELECT * FROM lojatcc.view_produtos_por_categoria WHERE nome_categoria = '".$nome_categoria."'"  ;
    $resultado = $pdo->query($sql);
    $produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}

if ($_POST['operacao'] == 'oferta') {
    $sql = "SELECT * FROM top5_ofertas";
    $resultado = $pdo->query($sql);
    $produtos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $produtos[] = $row;
    }

    echo json_encode($produtos);
}
