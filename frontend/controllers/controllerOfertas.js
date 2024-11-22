$(document).ready(function(){
    const backend = '../backend/models/produtosModel.php';
    
    const nome_produto = pegarParametroURL('n_produto');
    if(null){
       read(); 
    }else{
        pesquisa(nome_produto);
    }

    function read(){
        let dados = {
            operacao: "read"
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                console.log(dados);
                $('.ofertas').empty();
                dados.forEach(function(produto) {

                    // Calcula o preço original (antes do desconto)
                    const precoDesconto = produto.preco-(produto.preco*(produto.oferta/100));
                    const ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta">R$ ${produto.preco}</p>
                                <p class="preco-oferta">R$ ${precoDesconto.toFixed(2)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    $('.ofertas').append(ofertaHtml);
                });
            }
        });
    }

    function pesquisa(valor){
        let dados = {
            operacao: "pesquisar",
            nome_produto: valor
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                console.log(dados);
                $('.ofertas').empty();
                dados.forEach(function(produto) {

                    // Calcula o preço original (antes do desconto)
                    const precoDesconto = produto.preco-(produto.preco*(produto.oferta/100));
                    const ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta">R$ ${produto.preco}</p>
                                <p class="preco-oferta">R$ ${precoDesconto.toFixed(2)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    $('.ofertas').append(ofertaHtml);
                });
            }
        });
    }

    function pegarParametroURL(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    $(document).on("click", '.btn-comprar', {'param': 10}, function(e){
        e.preventDefault();
        let produto_id = $(this).val();
        window.location = "produto1.html?id_produto="+produto_id;
    });

});
