$(document).on("click", '.btn-comprar-produto', function(){
    let id_produtos = $('.btn-comprar-produto').val();
    let dados = {
        operacao: "create",
        id_produtos: id_produtos,
        quantidade: 1
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/carrinho_has_produtosModel.php',
        success: function(dados){
            console.log(dados);
        }
    });
});
