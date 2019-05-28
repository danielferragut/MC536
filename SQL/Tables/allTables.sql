CREATE TABLE paciente (
    cpf VARCHAR(11) PRIMARY KEY, 
    data_de_nascimento DATE, 
    email VARCHAR(50) UNIQUE NOT NULL, 
    nome VARCHAR(100) NOT NULL, 
    telefone VARCHAR(20) NOT NULL, 
    tipo_sanguineo VARCHAR(3) NOT NULL, 
    sexo VARCHAR(10), 
    alergias VARCHAR(30));


CREATE TABLE medico(
    crm VARCHAR(6) PRIMARY KEY,
    cpf VARCHAR (11) NOT NULL,
    especialização VARCHAR (50) NOT NULL,
    nome VARCHAR (100) NOT NULL,
    telefone VARCHAR (20) NOT NULL,
    data_de_nascimento DATE);


CREATE TABLE consulta(
    crm VARCHAR(6) REFERENCES medico,
    cpf VARCHAR(11) REFERENCES paciente,
    hora_da_consulta TIME (4) NOT NULL,
    sala VARCHAR (10) NOT NULL,
    data_da_consulta DATE NOT NULL,
    PRIMARY KEY (crm,cpf,data_da_consulta));


CREATE TABLE internacao(
    protocolo_internacao VARCHAR(50) PRIMARY KEY,
    data_intercao DATE NOT NULL,
    dias_internado INTEGER,
    leito VARCHAR (20) NOT NULL,
    quarto VARCHAR (8) NOT NULL,
    cpf VARCHAR(11) REFERENCES paciente);


CREATE TABLE pronto_socorro(
    protocolo_atendimento VARCHAR(50) PRIMARY KEY,
    data_atendimento DATE NOT NULL,
    tipo_de_socorro VARCHAR(50),
    cpf VARCHAR(11) REFERENCES paciente);

CREATE TABLE cirurgia(
    protocolo_cirurgia VARCHAR(50) PRIMARY KEY, 
    hora_da_cirurgia TIME (4), 
    data_da_cirurgia DATE NOT NULL,
    tipo_de_cirurgia VARCHAR(50),
    cpf VARCHAR(14) REFERENCES paciente, 
    crm VARCHAR(6) references medico);
