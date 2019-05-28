CREATE TABLE paciente (cpf VARCHAR(11) PRIMARY KEY, data_de_nascimento DATE, email VARCHAR(50) UNIQUE NOT NULL, nome VARCHAR(100) NOT NULL, telefone VARCHAR(20) NOT NULL, tipo_sanguineo VARCHAR(3) NOT NULL, sexo VARCHAR(10), alergias VARCHAR(30));
CREATE TABLE medico(crm VARCHAR(6) PRIMARY KEY,cpf VARCHAR (11) NOT NULL,especialização VARCHAR (50) NOT NULL,nome VARCHAR (100) NOT NULL,telefone VARCHAR (20) NOT NULL,data_de_nascimento DATE);
CREATE TABLE consulta(crm VARCHAR(6) REFERENCES medico,cpf VARCHAR(11) REFERENCES paciente,hora_da_consulta TIME (4) NOT NULL,sala VARCHAR (10) NOT NULL,data_da_consulta DATE NOT NULL,PRIMARY KEY (crm,cpf,data_da_consulta));
CREATE TABLE internacao(protocolo_internacao VARCHAR(50) PRIMARY KEY,data_intercao DATE NOT NULL,dias_internado INTEGER,leito VARCHAR (20) NOT NULL,quarto VARCHAR (8) NOT NULL,cpf VARCHAR(11) REFERENCES paciente);
CREATE TABLE pronto_socorro(protocolo_atendimento VARCHAR(50) PRIMARY KEY,data_atendimento DATE NOT NULL,tipo_de_socorro VARCHAR(50),cpf VARCHAR(11) REFERENCES paciente);
CREATE TABLE cirurgia(protocolo_cirurgia VARCHAR(50) PRIMARY KEY, hora_da_cirurgia TIME (4), data_da_cirurgia DATE NOT NULL,tipo_de_cirurgia VARCHAR(50),cpf VARCHAR(14) REFERENCES paciente, crm VARCHAR(6) references medico);

CREATE TABLE exame(protocolo_exame VARCHAR(50) PRIMARY KEY,data_do_exame DATE  NOT NULL,hora_do_exame TIME (4) NOT NULL,resultado VARCHAR (1000),tipo VARCHAR(50) NOT NULL,crm VARCHAR(6),cpf VARCHAR(11),data_da_consulta DATE,protocolo_internacao VARCHAR(50) REFERENCES internacao, protocolo_atendimento VARCHAR(50) REFERENCES pronto_socorro, FOREIGN KEY  (crm,cpf,data_da_consulta) references consulta);
INSERT INTO paciente VALUES (28765349356, '2011-05-30', 'anascimento@uol.com.br', 'Gabriela Azevedo', 83067502, 'AB-', 'Feminino', 'Não Possui');

INSERT INTO medico VALUES (000001, 31897943794, 'GO', 'Kevin da Costa', 91186174, '2003-10-06');

INSERT INTO consulta VALUES (000001, 28765349356, '13:27:20', 001, '2012-02-17');

INSERT INTO internacao VALUES (000000000001, '1996-06-07', 303, 00000027887244849356, 00000216, 28765349356);

INSERT INTO pronto_socorro VALUES (000000000001, '1991-12-03', 'Hospitalar', 28765349356);

INSERT INTO cirurgia VALUES (000000000001, '17:06:40', '1990-07-16', 'Hernioplastias : umbilical', 28765349356, 000001);

INSERT INTO exame(protocolo_exame,data_do_exame,hora_do_exame,tipo,cpf,crm,data_da_consulta) VALUES (000000000001, '2014-12-06', '09:16:27', 'liquido pleural', 28765349356, 000001, '2012-02-17');

