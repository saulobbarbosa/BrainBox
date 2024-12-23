$(document).ready(function(){
    const backend = '../backend/login.php';
    verifica();

    function vaiLogar(){
        if(window.location.href.includes("carrinho.html") && taLogado==false){
            window.location = 'login.html'
        }
    }

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
                    meuLocal = window.location.href;
                    if(meuLocal.includes('login.html')){
                        window.location = 'index.html'
                    }
                    $('#veriLogin').empty();
                    const loginData = `
                    <div style='font-family: "Poppins", sans-serif;'>
                        <img src="pagina-principal/assets/img/svgs/user-icon.svg" class="btn-user">
                        ${dados.nome}
                    </div>
                    <button class="btn-user-logout">Sair</button>
                    `;

                    $('#veriLogin').append(loginData);
                    taLogado = true;
                }else{
                    taLogado = false;
                    vaiLogar();
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
                let minhaLocation = window.location.href;
                let eCarrinho = minhaLocation.includes('carrinho.html');
                if(eCarrinho){
                    window.location = 'index.html';
                }else{
                    location.reload()
                }
            }
        });
    }

    $(document).on("click", '.btn-basket', function(e){
        if(!taLogado){
            window.location = 'login.html';
        }else{
            window.location = 'carrinho.html';
        }
    });

    $(document).on("click", '.btn-user-logout', function(e){
        sair();
    });

    $(document).on("click", '.btn-comprar-produto', function(e){
        if(!taLogado){
            window.location = 'login.html';
        }
    });

});
