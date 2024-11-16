$(document).ready(function() {
    // Evento de submit do formulário de login
    $('#login').on('submit', function(event) {
        event.preventDefault(); // Previne o envio do formulário tradicional

        // Pega os valores dos campos de e-mail e senha
        var email = $('#email').val();
        var senha = $('#password').val();

        // Faz a requisição AJAX para o login.php
        $.ajax({
            url: '../backend/login.php',
            type: 'POST',
            data: {
                email: email,
                senha: senha,
                operacao: 'login' // Identifica que esta é uma operação de login
            },
            dataType: 'json', // Espera uma resposta JSON do backend
            success: function(response) {
                // Se o login for bem-sucedido, redireciona para a página inicial
                if (response.type === 'success') {
                    window.location.href = 'index.html';
                } else {
                    // Exibe a mensagem de erro retornada pelo servidor
                   console.log(response.message);
                }
            },
            error: function(xhr, status, error) {
                // Lida com erros de conexão ou de servidor
                console.error('Erro na requisição AJAX:', error);
            }
        });
    });
});