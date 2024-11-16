$(document).ready(function(){
    const backend = '../backend/models/usuarioModel.php';

    // Aplica a máscara de CPF
    $('#cpf').mask('000.000.000-00');

    function create() {
        const senha = $('#password').val();
        const confirmSenha = $('#confirm-password').val();

        if (senha !== confirmSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const dtNascimento = $('#birthdate').val();
        const formattedDate = new Date(dtNascimento).toISOString().split('T')[0];
        
        let dados = {
            operacao: "create",
            cpf: parseInt($('#cpf').cleanVal()), // Usa cleanVal() para remover a máscara e enviar apenas os números
            nome: $('#name').val(),
            email: $('#email').val(),
            senha: senha,
            dt_nascimento: formattedDate,
            rua: $('#rua').val(),
            num_casa: $('#num-house').val(),
            cidade: $('#cidade').val(),
            bairro: $('#bairro').val(),
            estado: $('#estado').val()
        };

        $.ajax({
            
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(response){
                if(response.type=='error'){
                    alert("Algo deu errado");
                }else{
                    window.location.href = 'login.html';
                }
            },
            error: function(error){
                console.error(error);
            }
        });
    }

    $('.button-cadastro').click(function(e){
        e.preventDefault();
        create();
    });
});
