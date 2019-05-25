-- CREATE TABLE paciente(
--     cpf CHAR(11) PRIMARY KEY,
--     data_de_nascimento DATE NOT NULL,
--     email VARCHAR(50) UNIQUE NOT NULL,
--     nome VARCHAR(100) NOT NULL,
--     telefone VARCHAR(20) NOT NULL,
--     tipo_sanguineo VARCHAR(2) NOT NULL,
--     sexo VARCHAR(1),
--     alergias TEXT[]
-- );

CREATE TABLE paciente(
    cpf CHAR(1) PRIMARY KEY,
    data_de_nascimento DATE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    sexo VARCHAR(1),
);