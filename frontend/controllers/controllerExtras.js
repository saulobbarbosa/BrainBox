$(document).ready(function(){
    readOfertasDia();
});

function trocarPontoPorVirgula(texto) {
    return texto.toString().replace(/\./g, ',');
}

function readOfertasDia(){
    let dados = {
        operacao: "read"
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/produtosModel.php',
        success: function(dados){
            $('.ofertas-do-dia').empty();
            const dadoAntes = `<h1 class="ofertas-do-dia-titulo">Ofertas do Dia</h1>`;
            $('.ofertas-do-dia').append(dadoAntes);
            dados.forEach(function(produto) {
                if(produto.oferta == "0"){
                    const ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta"></p>
                                <p class="preco-oferta">R$ ${produto.preco}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    $('.ofertas-do-dia').append(ofertaHtml);
                }else{
                    // Calcula o preço original (antes do desconto)
                    const precoDesconto = produto.preco-(produto.preco*(produto.oferta/100));
                    const ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                <p class="preco-oferta">R$ ${precoDesconto.toFixed(2)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    $('.ofertas-do-dia').append(ofertaHtml);
                }
            });
        }
    });
}
