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

$(document).ready(function(){
    read();
    
    function read(){
        let dados = {
            operacao: "read"
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: '../backend/models/carrinho_has_produtosModel.php',
            success: function(dados){
                if(dados == ""){
                    const dadosAntes = `
                        <div class="com-prod">
                            <h1 class="h1-titulo">Carrinho de Compras</h1>
                        </div>
                        <div class="sem-prod">
                            <h1 class="sem-prod-titulo">Seu carrinho de compras <p>está vazio :(</p></h1>
                        </div>
                        `;
                    $('.carrinho').append(dadosAntes);
                    $('.sem-prod').css('display','block');
                }else{
                    $('.carrinho').empty();
                    const dadosAntes = `
                        <div class="com-prod">
                            <h1 class="h1-titulo">Carrinho de Compras</h1>
                            <button class="desmarcartodos">desmarcar todos os produtos</button>
                        </div>
                        <div class="sem-prod">
                            <h1 class="sem-prod-titulo">Seu carrinho de compras <p>está vazio :(</p></h1>
                        </div>
                        `;
                    $('.carrinho').append(dadosAntes);
                    dados.forEach(function(produto) {
                        const produtoHtml = `
                        <article class="box-produto">
                            <input type="checkbox" name="" id="" value="${produto.id_produtos}">
                            <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-produto1 img-produto">
                            <div>
                                <h3 class="nome-produto">${produto.nome_produto}</h3>
                                <span class="preco-produto">R$ ${produto.preco_com_desconto}</span>
                                <div class="btn-prod">
                                    <button class="delete-prod" ><img src="carrinho/assets/img/svgs/trash-can.svg"
                                            alt="${produto.id_produtos}"></button>
                                    <span class="num-prod" value="${produto.quantidade}">${produto.quantidade}</span>
                                    <button class="aumentar-prod"><img src="carrinho/assets/img/svgs/plus.svg"
                                            alt="${produto.id_produtos}"></button>
                                </div>
                            </div>
                        </article>
                        `;
                        $('.carrinho').append(produtoHtml);
                    });
                }
            }
        });
    }

});
