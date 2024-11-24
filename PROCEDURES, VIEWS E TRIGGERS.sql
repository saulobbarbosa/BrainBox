-- Procedure para verificar se o produto já está no carrinho, e se estiver só adicionar 1 em quantidade
DELIMITER $$

CREATE PROCEDURE sp_add_to_carrinho(
    IN p_id_carrinho INT,
    IN p_id_produtos INT,
    IN p_quantidade INT
)
BEGIN
    DECLARE qtd_atual INT;

    -- Verifica se o produto já existe no carrinho
    SELECT quantidade
    INTO qtd_atual
    FROM lojatcc.carrinho_has_produtos
    WHERE id_carrinho = p_id_carrinho AND id_produtos = p_id_produtos;

    IF qtd_atual IS NOT NULL THEN
        -- Produto já existe no carrinho, atualiza a quantidade
        UPDATE lojatcc.carrinho_has_produtos
        SET quantidade = quantidade + p_quantidade
        WHERE id_carrinho = p_id_carrinho AND id_produtos = p_id_produtos;
    ELSE
        -- Produto não existe, insere um novo registro
        INSERT INTO lojatcc.carrinho_has_produtos (id_carrinho, id_produtos, quantidade)
        VALUES (p_id_carrinho, p_id_produtos, p_quantidade);
    END IF;
END$$

DELIMITER ;


-- View para ver os produtos do carrinho
CREATE VIEW vw_carrinho_produtos AS
SELECT 
    chp.id_produtos,
    p.nome AS nome_produto,
    ROUND(p.preco * (1 - (p.oferta / 100)), 2) AS preco_com_desconto,
    chp.quantidade,
    p.arquivo_img AS arquivo_img
FROM 
    lojatcc.carrinho_has_produtos AS chp
JOIN 
    lojatcc.produtos AS p
ON 
    chp.id_produtos = p.id_produtos;


-- View para ver os 5 primeiros produtos com as maiores ofertas
CREATE VIEW lojatcc.top5_ofertas AS
SELECT 
    id_produtos,
    nome,
    descricao,
    preco,
    oferta,
    quantidade_estoque,
    marca,
    arquivo_img
FROM 
    lojatcc.produtos
ORDER BY 
    oferta DESC
LIMIT 5;

-- View para ver os dados dos produtos em histórico
CREATE OR REPLACE VIEW lojatcc.view_historico_produtos AS
SELECT 
    h.cpf,
    h.id_produtos,
    p.arquivo_img
FROM 
    lojatcc.historico h
JOIN 
    lojatcc.produtos p
ON 
    h.id_produtos = p.id_produtos;