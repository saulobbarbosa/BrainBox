$(document).ready(function(){
    read();
});

// Função para calcular o total com base nos checkboxes marcados e quantidades
function calcularTotal() {
    let total = 0;
    $('.checkbox-produto:checked').each(function() {
        // Obtém o preço do produto
        const preco = parseFloat($(this).val());
        // Obtém a quantidade do produto associado
        const quantidade = parseInt($(this).closest('.box-produto').find('.num-prod').text());
        // Soma ao total considerando a quantidade
        total += preco * quantidade;
    });
    // Atualizar o total na interface
    total = total.toFixed(2);
    total = trocarPontoPorVirgula(total);
    $('#precoTotal').text(total);
}

function trocarPontoPorVirgula(texto) {
    return texto.toString().replace(/\./g, ',');
}

$(document).on('change', '.checkbox-produto', function() {
    calcularTotal();
});

function desmarcarTodos(){
    $(".checkbox-produto").prop("checked", false);
    calcularTotal();
}

$(document).on("click", ".desmarcartodos", function() {
    $(".checkbox-produto").prop("checked", false);
    calcularTotal();
});


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

$(document).on("click", '.aumentar-prod', function(){
    let id_produto = $(this).attr('id');
    let dados = {
        operacao: "adicionar",
        id_produtos: id_produto,
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/carrinho_has_produtosModel.php',
        success: function(dados){
            read();
            desmarcarTodos();
        }
    });
});

$(document).on("click", '.delete-prod', function(){
    let id_produto = $(this).attr('id');
    let dados = {
        operacao: "diminuir",
        id_produtos: id_produto,
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/carrinho_has_produtosModel.php',
        success: function(dados){
            read();
            desmarcarTodos();
        }
    });
});

function read() {
    let dados = {
        operacao: "read"
    };
    $.ajax({
        type: 'POST',
        dataType: 'JSON',
        assync: true,
        data: dados,
        url: '../backend/models/carrinho_has_produtosModel.php',
        success: function(dados) {
            $('.carrinho').empty();
            if (dados == "") {
                const dadosAntes = `
                    <div class="com-prod">
                        <h1 class="h1-titulo">Carrinho de Compras</h1>
                    </div>
                    <div class="sem-prod">
                        <h1 class="sem-prod-titulo">Seu carrinho de compras <p>está vazio :(</p></h1>
                    </div>
                `;
                $('.carrinho').append(dadosAntes);
                $('.sem-prod').css('display', 'block');
            } else {
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
                        <input type="checkbox" name="produto" class="checkbox-produto" value="${produto.preco_com_desconto}">
                        <img src="pagina-ofertas/assets/img/${produto.arquivo_img}" class="img-produto1 img-produto">
                        <div>
                            <h3 class="nome-produto">${produto.nome_produto}</h3>
                            <span class="preco-produto">R$ ${trocarPontoPorVirgula(produto.preco_com_desconto)}</span>
                            <div class="btn-prod">
                                <button class="delete-prod" id="${produto.id_produtos}"><img src="carrinho/assets/img/svgs/trash-can.svg"
                                        alt="Deletar Produto"></button>
                                <span class="num-prod" value="${produto.quantidade}">${produto.quantidade}</span>
                                <button class="aumentar-prod" id="${produto.id_produtos}"><img src="carrinho/assets/img/svgs/plus.svg"
                                        alt="Aumentar Produto"></button>
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

$(document).on("click", ".finalizarcompra", function () {
    // Obter produtos marcados
    let produtosSelecionados = [];
    $('.checkbox-produto:checked').each(function () {
        const idProduto = $(this).closest('.box-produto').find('.delete-prod').attr('id'); // ID do produto
        const quantidade = parseInt($(this).closest('.box-produto').find('.num-prod').text()); // Quantidade
        produtosSelecionados.push({ id_produto: idProduto, quantidade: quantidade });
    });

    if (produtosSelecionados.length === 0) {
        alert("Selecione ao menos um produto para finalizar a compra.");
        return;
    }

    // Enviar produtos para criar a compra
    $.ajax({
        type: "POST",
        url: "../backend/models/comprasModel.php",
        data: {
            operacao: "create",
            produtos: JSON.stringify(produtosSelecionados), // Envia como JSON
        },
        dataType: "JSON",
        success: function (response) {
            desmarcarTodos();
            if (response.type === "success") {
                // Após criar a compra, deletar produtos específicos do carrinho
                const idsCadastrados = produtosSelecionados.map(p => p.id_produto); // IDs cadastrados
                $.ajax({
                    type: "POST",
                    url: "../backend/models/carrinho_has_produtosModel.php",
                    data: {
                        operacao: "deleteByIds",
                        ids: JSON.stringify(idsCadastrados), // Enviar IDs como JSON
                    },
                    dataType: "JSON",
                    success: function (res) {
                        if (res.type === "success") {
                            alert("Compra finalizada com sucesso!");
                            read(); // Atualiza o carrinho
                        } else {
                            alert("Erro ao limpar os produtos do carrinho: " + res.message);
                        }
                    },
                    error: function () {
                        alert("Erro ao tentar limpar os produtos do carrinho.");
                    },
                });
            } else {
                alert("Erro ao finalizar compra: " + response.message);
            }
        },
        error: function () {
            alert("Erro ao tentar finalizar compra.");
        },
    });
});

