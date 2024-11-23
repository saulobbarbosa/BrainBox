$(document).ready(function(){
    const backend = '../backend/models/produtosModel.php';
    
    buscar1();

    function pegarParametroURL(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    function buscar1(){
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
            success: function(dados){
                if (dados.length > 0) {
                    let produto = dados[0];

                    // Remove o conteúdo atual da div .produto
                    $('.produto').empty();

                    // Calcula o preço com desconto
                    const precoDesconto = produto.preco - (produto.preco * (produto.oferta / 100));

                    // Divide a descrição em linhas, com base nas quebras de linha (\n)
                    const descricaoLinhas = produto.descricao.split('\n');

                    // Cria o HTML para a descrição, gerando um <li> para cada linha
                    let descricaoHtml = '';
                    descricaoLinhas.forEach(function(linha) {
                        descricaoHtml += `<li>${linha}</li>`;
                    });

                    // Cria a nova div com todas as informações do produto, incluindo a descrição formatada
                    const produtoHtml = `
                        <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" alt="produto1" class="img-produto">
                        <div id="dados-produto">
                            <h1 class="titulo-produto">${produto.nome}</h1>
                            <p class="preco-antes-oferta">R$ ${produto.preco.toFixed(2)}</p>
                            <p class="preco-produto">R$ ${precoDesconto.toFixed(2)}</p>
                            <button class="btn-comprar-produto" value="${produto.id_produtos}">Comprar</button>
                            <hr class="breakline">
                            <h3 class="info-produto-titulo">informações técnicas</h3>
                            <ul class="info-produto">
                                ${descricaoHtml} <!-- Descrição dividida em <li> -->
                            </ul>
                        </div>
                    `;

                    // Adiciona o novo conteúdo à div .produto
                    $('.produto').append(produtoHtml);

                } else {
                    console.log("Nenhum produto encontrado.");
                }
            },
            error: function(err) {
                console.log("Erro na requisição: ", err);
            }
        });
    }
});
