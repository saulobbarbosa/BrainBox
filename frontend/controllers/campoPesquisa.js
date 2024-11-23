     const backend = '../backend/models/produtosModel.php';

    $(document).on("click", '.search-btn', function(e){
        window.location = "ofertas.html?n_produto="+$('.search-bar').val();
    });
