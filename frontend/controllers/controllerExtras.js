$(document).ready(function () {
    readOfertasDia();
    readHistorico();
});

function trocarPontoPorVirgula(texto) {
    return texto.toString().replace(/\./g, ',');
}

function readOfertasDia() {
    let dados = {
        operacao: "oferta"
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/produtosModel.php',
        success: function (dados) {
            $('.ofertas-do-dia').empty();
            let ofertaHtml;
            const dadoAntes = `<h1 class="ofertas-do-dia-titulo">Ofertas do Dia</h1>`;
            $('.ofertas-do-dia').append(dadoAntes);
            dados.forEach(function (produto) {
                if (produto.oferta == "0") {
                    if (produto.quantidade_estoque <= 0) {
                    ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta"></p>
                                <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Indisp..</button>
                        </article>
                    </a>
                    `;
                    } else {
                        ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta"></p>
                                <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    }

                    $('.ofertas-do-dia').append(ofertaHtml);
                } else {
                    // Calcula o preço original (antes do desconto)
                    const precoDesconto = produto.preco - (produto.preco * (produto.oferta / 100));
                    if (produto.quantidade_estoque <= 0) {
                        ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Indisp..</button>
                        </article>
                    </a>
                    `;
                    } else {
                        ofertaHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="oferta">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                            <div>
                                <h3 class="oferta-titulo">${produto.nome}</h3>
                                <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    }

                    $('.ofertas-do-dia').append(ofertaHtml);
                }
            });
        }
    });
}


function readHistorico() {
    let dados = {
        operacao: "read"
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/historicoModel.php',
        success: function (dados) {
            $('.histnav').empty();
            dados.forEach(function (produto) {
                const historicoHtml = `
                        <article class="produto">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-produto" onclick="window.location = 'produto1.html?id_produto=${produto.id_produtos}'">
                        </article>
                    `;
                $('.histnav').append(historicoHtml);
            });
        }
    });
}

