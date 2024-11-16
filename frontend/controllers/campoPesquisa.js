$(document).ready(function(){
    const backend = '../backend/models/produtosModel.php';

    $(document).on("click", '.search-btn', {'param': 10}, function(e){
        window.location = "ofertas.html?n_produto="+$('.search-bar').val();
    });
    
});
