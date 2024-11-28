use lojatcc;

-- Primeiro, crie as categorias.
INSERT INTO lojatcc.categoria (tipo) VALUES 
    ('Computadores'), 
    ('Tablets'), 
    ('Celulares'), 
    ('Audio'), 
    ('Projetores'), 
    ('Mouses'), 
    ('Teclados'), 
    ('Monitores'), 
    ('Escritório'), 
    ('Hardwares'), 
    ('Perifericos'), 
    ('Robotica'), 
    ('Acessorios');

-- Em seguida, faça os inserts para os produtos.
-- Supondo que 'arquivo_img' seja obrigatório, será preenchido com valores genéricos.

INSERT INTO lojatcc.produtos (nome, descricao, preco, custo, oferta, quantidade_estoque, marca, arquivo_img, id_categoria) VALUES 
    -- Produtos para a categoria Computadores
    ('Computador Intel', 'Descrição do Computador Intel', 5000.00, 4000.00, 10, 50, 'Intel', 'computador_intel.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Computadores')),
    ('Computador Acer', 'Descrição do Computador Acer', 4500.00, 3500.00, 15, 40, 'Acer', 'computador_acer.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Computadores')),
    
    -- Produtos para a categoria Tablets
    ('Tablet Apple', 'Descrição do Tablet Apple', 3000.00, 2500.00, 5, 30, 'Apple', 'tablet_apple.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Tablets')),
    ('Tablet Samsung', 'Descrição do Tablet Samsung', 2500.00, 2000.00, 8, 25, 'Samsung', 'tablet_samsung.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Tablets')),
    
    -- Produtos para a categoria Celulares
    ('Celular Samsung', 'Descrição do Celular Samsung', 2000.00, 1500.00, 10, 60, 'Samsung', 'celular_samsung.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Celulares')),
    ('Celular Apple', 'Descrição do Celular Apple', 3500.00, 3000.00, 5, 50, 'Apple', 'celular_apple.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Celulares')),
    
    -- Produtos para a categoria Audio
    ('Fone Logitech', 'Descrição do Fone Logitech', 500.00, 300.00, 20, 100, 'Logitech', 'fone_logitech.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Audio')),
    ('Fone Jabra', 'Descrição do Fone Jabra', 600.00, 400.00, 15, 90, 'Jabra', 'fone_jabra.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Audio')),

    -- Produtos para a categoria Projetores
    ('Projetor Acer', 'Descrição do Projetor Acer', 4000.00, 3000.00, 12, 30, 'Acer', 'projetor_acer.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Projetores')),
    ('Projetor Samsung', 'Descrição do Projetor Samsung', 4500.00, 3500.00, 10, 20, 'Samsung', 'projetor_samsung.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Projetores')),

    -- Produtos para a categoria Mouses
    ('Mouse Redragon', 'Descrição do Mouse Redragon', 150.00, 100.00, 5, 200, 'Redragon', 'mouse_redragon.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Mouses')),
    ('Mouse Logitech', 'Descrição do Mouse Logitech', 200.00, 150.00, 10, 180, 'Logitech', 'mouse_logitech.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Mouses')),

    -- Produtos para a categoria Teclados
    ('Teclado Corsair', 'Descrição do Teclado Corsair', 300.00, 250.00, 15, 150, 'Corsair', 'teclado_corsair.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Teclados')),
    ('Teclado Rise Mode', 'Descrição do Teclado Rise Mode', 250.00, 200.00, 10, 140, 'Rise Mode', 'teclado_risemode.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Teclados')),

    -- Produtos para a categoria Monitores
    ('Monitor Acer', 'Descrição do Monitor Acer', 1000.00, 800.00, 10, 70, 'Acer', 'monitor_acer.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Monitores')),
    ('Monitor Samsung', 'Descrição do Monitor Samsung', 1200.00, 900.00, 15, 60, 'Samsung', 'monitor_samsung.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Monitores')),

    -- Produtos para a categoria Escritório
    ('Cadeira Escritório Logitech', 'Descrição da Cadeira Escritório Logitech', 800.00, 600.00, 12, 50, 'Logitech', 'cadeira_logitech.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Escritório')),
    ('Mesa Escritório Corsair', 'Descrição da Mesa Escritório Corsair', 1000.00, 700.00, 10, 40, 'Corsair', 'mesa_corsair.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Escritório')),

    -- Produtos para a categoria Hardwares
    ('Processador Intel', 'Descrição do Processador Intel', 1500.00, 1200.00, 10, 90, 'Intel', 'processador_intel.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Hardwares')),
    ('Memória RAM Hyper X', 'Descrição da Memória RAM Hyper X', 800.00, 600.00, 8, 80, 'Hyper X', 'ram_hyperx.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Hardwares')),

    -- Produtos para a categoria Perifericos
    ('Fone Corsair', 'Descrição do Fone Corsair', 500.00, 400.00, 5, 120, 'Corsair', 'fone_corsair.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Perifericos')),
    ('Mousepad Rise Mode', 'Descrição do Mousepad Rise Mode', 100.00, 80.00, 15, 140, 'Rise Mode', 'mousepad_risemode.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Perifericos')),

    -- Produtos para a categoria Robotica
    ('Kit Robótica Intel', 'Descrição do Kit Robótica Intel', 2000.00, 1500.00, 20, 30, 'Intel', 'kit_robotica_intel.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Robotica')),
    ('Kit Robótica Samsung', 'Descrição do Kit Robótica Samsung', 2200.00, 1800.00, 15, 25, 'Samsung', 'kit_robotica_samsung.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Robotica')),

    -- Produtos para a categoria Acessorios
    ('Cabo USB Redragon', 'Descrição do Cabo USB Redragon', 50.00, 30.00, 5, 300, 'Redragon', 'cabo_redragon.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Acessorios')),
    ('Adaptador HDMI Logitech', 'Descrição do Adaptador HDMI Logitech', 70.00, 50.00, 8, 200, 'Logitech', 'adaptador_logitech.jpg', 
        (SELECT id_categoria FROM lojatcc.categoria WHERE tipo = 'Acessorios'));