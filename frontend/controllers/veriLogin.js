$(document).ready(function(){
    const backend = '../backend/login.php';

    verifica();

    function verifica(){
        let dados = {
            operacao: "verifica"
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                if(dados.nome){
                    $('#veriLogin').empty();
                    const loginData = `
                    <div>
                        <img src="pagina-principal/assets/img/svgs/user-icon.svg" class="btn-user">
                        ${dados.nome}
                    </div>
                    <button class="btn-user-logout">Sair</button>
                    `;

                    $('#veriLogin').append(loginData);
                }
                
            }
        });
    }

    function sair(){
        let dados = {
            operacao: "sair"
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                location.reload()
            }
        });
    }

    $(document).on("click", '.btn-user-logout', {'param': 10}, function(e){
        sair();
    });

});
