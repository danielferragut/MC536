-- CREATE TABLE medico(
--     crm CHAR(6) PRIMARY KEY,
--     cpf CHAR(11) NOT NULL,
--     especialização VARCHAR(50) NOT NULL,
--     nome VARCHAR(100) NOT NULL,
--     telefone VARCHAR(20) NOT NULL,
--     data_de_nascimento VARCHAR(8),
-- );

CREATE TABLE medico(
    crm CHAR(2) PRIMARY KEY,
    cpf CHAR(1) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    data_de_nascimento DATE NOT NULL
);