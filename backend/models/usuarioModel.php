<?php
include('../connection/conn.php');

// Model do carrinho
if ($_POST['operacao'] == 'create') {
    try {
        $sql = "INSERT INTO lojatcc.carrinho() VALUES ()";
        $stmt = $pdo->prepare($sql);
        $stmt->execute();
        
        // Pega o ID do último registro inserido
        $id_carrinho = $pdo->lastInsertId();

        $result = array(
            'type' => 'success',
            'message' => 'Registro cadastrado com sucesso'
        );
    } catch (PDOException $e) {
        $result = array(
            'type' => 'error',
            'message' => 'Erro: ' . $e->getMessage()
        );
    }
}

if ($_POST['operacao'] == 'read') {
    $sql = "SELECT * FROM carrinho";
    $resultado = $pdo->query($sql);
    $carrinhos = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $carrinhos[] = $row;
    }

    echo json_encode($carrinhos);
}

if ($_POST['operacao'] == 'delete') {
    try {
        $sql = "DELETE FROM lojatcc.carrinho WHERE id_carrinho = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['id_carrinho']]);

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



// Model usuário
if ($_POST['operacao'] == 'create') {
    if (empty($_POST['cpf']) || empty($_POST['nome']) || empty($_POST['email']) || empty($_POST['senha']) || empty($_POST['dt_nascimento']) || empty($_POST['rua']) || empty($_POST['num_casa']) || empty($_POST['cidade']) || empty($_POST['bairro']) || empty($_POST['estado']) || empty($id_carrinho)) {
        $result = array(
            'type' => 'error',
            'message' => 'Existe um campo obrigatório vazio'
        );
        echo json_encode($result);
    } else {
        try {
            $sql = "INSERT INTO lojatcc.usuario(cpf, nome, email, senha, dt_nascimento, rua, num_casa, cidade, bairro, estado,  id_carrinho) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['cpf'],
                $_POST['nome'],
                $_POST['email'],
                $_POST['senha'],
                $_POST['dt_nascimento'],
                $_POST['rua'],
                $_POST['num_casa'],
                $_POST['cidade'],
                $_POST['bairro'],
                $_POST['estado'],
                $id_carrinho
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
    $sql = "SELECT * FROM usuario";
    $resultado = $pdo->query($sql);
    $usuarios = array();

    while ($row = $resultado->fetch(PDO::FETCH_ASSOC)) {
        $usuarios[] = $row;
    }

    echo json_encode($usuarios);
}

if ($_POST['operacao'] == 'update') {
    if (empty($_POST['cpf']) || empty($_POST['nome']) || empty($_POST['email']) || empty($_POST['senha']) || empty($_POST['dt_nascimento']) || empty($_POST['rua']) || empty($_POST['num_casa']) || empty($_POST['cidade']) || empty($_POST['bairro']) || empty($_POST['estado'])) {
        $dados = array(
            'type' => 'error',
            'message' => 'Existe(m) campo(s) obrigatório(s) não preenchido(s).'
        );
        echo json_encode($dados);
    } else {
        try {
            $sql = "UPDATE lojatcc.usuario SET nome = ?, email = ?, senha = ?, dt_nascimento = ?, rua = ?, num_casa = ?, cidade = ?, bairro = ?, estado = ? WHERE cpf = ?";
            $stmt = $pdo->prepare($sql);
            $stmt->execute([
                $_POST['nome'],
                $_POST['email'],
                $_POST['senha'],
                $_POST['dt_nascimento'],
                $_POST['rua'],
                $_POST['num_casa'],
                $_POST['cidade'],
                $_POST['bairro'],
                $_POST['estado'],
                $_POST['cpf']
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
        $sql = "DELETE FROM lojatcc.usuario WHERE cpf = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$_POST['cpf']]);

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
