DELIMITER $$
-- Procedure para verificar se o produto já está no carrinho, e se estiver só adicionar 1 em quantidade
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