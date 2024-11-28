$(document).ready(function () {
    buscar1();
});

function cadastrarHistorico() {
    let dados = {
        operacao: "create",
        id_produto: pegarParametroURL('id_produto')
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/historicoModel.php',
        success: function (dados) {
            console.log(dados);
        }
    });
}

function pegarParametroURL(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function trocarPontoPorVirgula(texto) {
    return texto.toString().replace(/\./g, ',');
}



function buscar1() {
    let dados = {
        operacao: "buscar1",
        id_produtos: pegarParametroURL('id_produto')
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: backend,
        success: function (dados) {
            cadastrarHistorico();
            let produtoHtml;
            if (dados.length > 0) {
                let produto = dados[0];
                $('title').append(produto.nome)
                if (produto.oferta == "0") {
                    $('.produto').empty();

                    const descricaoLinhas = produto.descricao.split('\n');

                    let descricaoHtml = '';
                    descricaoLinhas.forEach(function (linha) {
                        descricaoHtml += `<li>${linha}</li>`;
                    });
                    if(produto.quantidade_estoque <= 0){
                        produtoHtml = `
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" alt="produto1" class="img-produto">
                            <div id="dados-produto">
                                <h1 class="titulo-produto">${produto.nome}</h1>
                                <p class="preco-antes-oferta"></p>
                                <p class="preco-produto">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                <button class="btn-comprar-produto" >Indisponível</button>
                                <hr class="breakline">
                                <h3 class="info-produto-titulo">informações técnicas</h3>
                                <ul class="info-produto">
                                    ${descricaoHtml} <!-- Descrição dividida em <li> -->
                                </ul>
                            </div>
                        `;
                    }else{
                        produtoHtml = `
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" alt="produto1" class="img-produto">
                            <div id="dados-produto">
                                <h1 class="titulo-produto">${produto.nome}</h1>
                                <p class="preco-antes-oferta"></p>
                                <p class="preco-produto">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                <button class="btn-comprar-produto" value="${produto.id_produtos}">Comprar</button>
                                <hr class="breakline">
                                <h3 class="info-produto-titulo">informações técnicas</h3>
                                <ul class="info-produto">
                                    ${descricaoHtml} <!-- Descrição dividida em <li> -->
                                </ul>
                            </div>
                        `;
                    }

                    $('.produto').append(produtoHtml);
                } else {
                    $('.produto').empty();

                    const precoDesconto = produto.preco - (produto.preco * (produto.oferta / 100));
                    const descricaoLinhas = produto.descricao.split('\n');

                    let descricaoHtml = '';
                    descricaoLinhas.forEach(function (linha) {
                        descricaoHtml += `<li>${linha}</li>`;
                    });

                    if(produto.quantidade_estoque <= 0){
                        produtoHtml = `
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" alt="produto1" class="img-produto">
                            <div id="dados-produto">
                                <h1 class="titulo-produto">${produto.nome}</h1>
                                <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco.toFixed(2))}</p>
                                <p class="preco-produto">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                <button class="btn-comprar-produto">Indisponível</button>
                                <hr class="breakline">
                                <h3 class="info-produto-titulo">informações técnicas</h3>
                                <ul class="info-produto">
                                    ${descricaoHtml} <!-- Descrição dividida em <li> -->
                                </ul>
                            </div>
                        `;
                    }else{
                        produtoHtml = `
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" alt="produto1" class="img-produto">
                            <div id="dados-produto">
                                <h1 class="titulo-produto">${produto.nome}</h1>
                                <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco.toFixed(2))}</p>
                                <p class="preco-produto">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                <button class="btn-comprar-produto" value="${produto.id_produtos}">Comprar</button>
                                <hr class="breakline">
                                <h3 class="info-produto-titulo">informações técnicas</h3>
                                <ul class="info-produto">
                                    ${descricaoHtml} <!-- Descrição dividida em <li> -->
                                </ul>
                            </div>
                        `;
                    }

                    $('.produto').append(produtoHtml);
                }
                readRelacionados(produto.id_categoria);
            } else {
                console.log("Nenhum produto encontrado.");
            }
        },
        error: function (err) {
            console.log("Erro na requisição: ", err);
        }
    });
}

function readRelacionados(categoria){
    let dados = {
        operacao: "buscarRelacionados",
        id_categoria: categoria
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: backend,
        success: function(dados){
            $('.produtos-relacionados').empty();
            let relacionadosHtml;
            dados.forEach(function(produto) {
                    const precoDesconto = produto.preco-(produto.preco*(produto.oferta/100));
                    if(produto.quantidade_estoque <= 0){
                        relacionadosHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="prod-r">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-prod-r">
                            <div>
                                <h3 class="prod-r-titulo">${produto.nome}</h3>
                                <p class="preco-prod-r">R$ ${precoDesconto.toFixed(2)}</p>
                            </div>
                            <button class="btn-comprar">Indisp..</button>
                        </article>
                    </a>
                    `;
                    }else{
                        relacionadosHtml = `
                    <a href="produto1.html?id_produto=${produto.id_produtos}">
                        <article class="prod-r">
                            <img src="../../TCC/backend/models/${produto.arquivo_img}" class="img-prod-r">
                            <div>
                                <h3 class="prod-r-titulo">${produto.nome}</h3>
                                <p class="preco-prod-r">R$ ${precoDesconto.toFixed(2)}</p>
                            </div>
                            <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                        </article>
                    </a>
                    `;
                    }
                    
                    $('.produtos-relacionados').append(relacionadosHtml);
            });
        }
    });
}