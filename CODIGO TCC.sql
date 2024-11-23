drop database lojatcc;


create database lojatcc;


use lojatcc;


CREATE TABLE lojatcc.carrinho(
	id_carrinho INT NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(id_carrinho)
);

CREATE TABLE lojatcc.usuario (
	cpf BIGINT NOT NULL,
	nome VARCHAR(50)NOT NULL,
    email varchar(100) NOT NULL,
    senha varchar(100) NOT NULL, 
	dt_nascimento DATE NOT NULL,
	rua VARCHAR(50) NOT NULL,
	num_casa  INT NOT NULL,
	cidade VARCHAR(50) NOT NULL,
	bairro VARCHAR(50) NOT NULL,
    estado VARCHAR(50) NOT NULL,
	id_carrinho INT NOT NULL,
	PRIMARY KEY(cpf),
	CONSTRAINT fk_usuario_carrinho FOREIGN KEY(id_carrinho) REFERENCES carrinho(id_carrinho)
);

CREATE TABLE lojatcc.categoria (
	id_categoria INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(50),
	PRIMARY KEY(id_categoria)
);

CREATE TABLE lojatcc.produtos (
	id_produtos INT NOT NULL AUTO_INCREMENT,
	nome VARCHAR(50) NOT NULL,
	descricao VARCHAR(1000) NOT NULL,
    preco float not null,
    custo float not null,
    -- oferta será usada como porcentagem
    oferta decimal(2,0) not null,
    quantidade_estoque int not null,
    marca VARCHAR(50),
    arquivo_img VARCHAR(100) NOT NULL,
	id_categoria INT NOT NULL,
	PRIMARY KEY(id_produtos),
	CONSTRAINT fk_produtos_categoria FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
);

CREATE TABLE lojatcc.compras (
	id_compras INT NOT NULL AUTO_INCREMENT,
	quantidade INT NOT NULL,
    id_produtos INT NOT NULL,
    cpf_usuario BIGINT NOT NULL,
	status_compra VARCHAR(20) DEFAULT 'em andamento',
    data_compra date,
	PRIMARY KEY(id_compras),
    CONSTRAINT fk_compras_produto FOREIGN KEY(id_produtos) REFERENCES produtos(id_produtos),
    CONSTRAINT fk_compras_usuario FOREIGN KEY(cpf_usuario) REFERENCES usuario(cpf)
);

CREATE TABLE lojatcc.carrinho_has_produtos(
	id_carrinho INT NOT NULL,
    id_produtos INT NOT NULL,
    quantidade INT NOT NULL,
    CONSTRAINT fk_chasp_produtos FOREIGN KEY(id_produtos) REFERENCES produtos(id_produtos),
    CONSTRAINT fk_chasp_carrinho FOREIGN KEY(id_carrinho) REFERENCES carrinho(id_carrinho)
);


-- Histórico dos 5 ultimos itens visualizados
CREATE TABLE lojatcc.historico (
    cpf BIGINT NOT NULL,
    id_produtos INT NOT NULL,
    data_vis TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (cpf, id_produtos),
    CONSTRAINT fk_his_usuario FOREIGN KEY (cpf) REFERENCES usuario(cpf),
    CONSTRAINT fk_his_produtos FOREIGN KEY (id_produtos) REFERENCES produtos(id_produtos)
);

SELECT * from lojatcc.usuario;







