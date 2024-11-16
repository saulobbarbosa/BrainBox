<?php
$hostname="localhost";
$dbname="lojatcc";
$username="root";
$password="root";

try{
    $pdo=new PDO('mysql:host='.$hostname.';dbname='.$dbname, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $resultc = array(
        'type'=>'sucesso',
        'mensagem'=>'conexao efetuada com sucesso!'
    );

}catch(PDOException $e){
    $resultc= array(
        'type'=>'error',
        'mensagem'=>'ERR: '.$e->getMessage()
    );

}
?>