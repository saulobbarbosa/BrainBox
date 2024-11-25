$(document).ready(function(){
    const backend = '../backend/models/produtosModel.php';
    
    const nome_produto = pegarParametroURL('n_produto');
    const nome_categoria = pegarParametroURL('n_categoria');
    const nome_marca = pegarParametroURL('n_marca');
    if(nome_produto == null){
        if(nome_categoria != null){
            readCategoria(nome_categoria)
        }else{
            if(nome_marca != null){
                readMarca(nome_marca);
            }else{
                read();
            }
        }
    }else{
        pesquisa(nome_produto);
    }

    function trocarPontoPorVirgula(texto) {
        return texto.toString().replace(/\./g, ',');
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
                $('.ofertas').empty();
                dados.forEach(function(produto) {
                    if(produto.oferta == "0"){
                        const ofertaHtml = `
                        <a href="produto1.html?id_produto=${produto.id_produtos}">
                            <article class="oferta">
                                <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                                <div>
                                    <h3 class="oferta-titulo">${produto.nome}</h3>
                                    <p class="preco-antes-oferta"></p>
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
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
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
                    }
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
                $('.ofertas').empty();
                dados.forEach(function(produto) {
                    if(produto.oferta == "0"){
                        const ofertaHtml = `
                        <a href="produto1.html?id_produto=${produto.id_produtos}">
                            <article class="oferta">
                                <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                                <div>
                                    <h3 class="oferta-titulo">${produto.nome}</h3>
                                    <p class="preco-antes-oferta"></p>
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
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
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
                    }
                });
            }
        });
    }

    function readCategoria(valor){
        let dados = {
            operacao: "buscarCategoria",
            nome_categoria: valor
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                $('.ofertas').empty();
                dados.forEach(function(produto) {
                    if(produto.oferta == "0"){
                        const ofertaHtml = `
                        <a href="produto1.html?id_produto=${produto.id_produtos}">
                            <article class="oferta">
                                <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                                <div>
                                    <h3 class="oferta-titulo">${produto.nome_produto}</h3>
                                    <p class="preco-antes-oferta"></p>
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
                    }else{
                        // Calcula o preço original (antes do desconto)
                        const precoDesconto = produto.preco-(produto.preco*(produto.oferta/100));
                        const ofertaHtml = `
                        <a href="produto1.html?id_produto=${produto.id_produtos}">
                            <article class="oferta">
                                <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                                <div>
                                    <h3 class="oferta-titulo">${produto.nome_produto}</h3>
                                    <p class="preco-antes-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
                    }
                });
            }
        });
    }

    function readMarca(valor){
        let dados = {
            operacao: "buscarMarca",
            nome_marca: valor
        };
        $.ajax({
            type: 'POST',
            dataType: 'JSON',
            assync: true,
            data: dados,
            url: backend,
            success: function(dados){
                $('.ofertas').empty();
                dados.forEach(function(produto) {
                    if(produto.oferta == "0"){
                        const ofertaHtml = `
                        <a href="produto1.html?id_produto=${produto.id_produtos}">
                            <article class="oferta">
                                <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-oferta img-oferta-${produto.id_produtos}">
                                <div>
                                    <h3 class="oferta-titulo">${produto.nome}</h3>
                                    <p class="preco-antes-oferta"></p>
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(produto.preco)}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
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
                                    <p class="preco-oferta">R$ ${trocarPontoPorVirgula(precoDesconto.toFixed(2))}</p>
                                </div>
                                <button value=${produto.id_produtos} class="btn-comprar">Comprar</button>
                            </article>
                        </a>
                        `;
                        $('.ofertas').append(ofertaHtml);
                    }
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
