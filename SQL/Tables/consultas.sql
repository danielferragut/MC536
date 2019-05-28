-- CREATE TABLE consulta(
--     crm CHAR(6) REFERENCES medico,
--     cpf CHAR(14) REFERENCES paciente,
--     hora TIME NOT NULL,
--     data_da_consulta DATE NOT NULL,
--     sala VARCHAR(10) NOT NULL,
--     PRIMARY KEY(crm, cpf, data_da_consulta)
-- );
CREATE TABLE consulta(
    crm CHAR(2) REFERENCES medico,
    cpf CHAR(1) REFERENCES paciente,
    hora_da_consulta TIME NOT NULL,
    data_da_consulta DATE NOT NULL,
    PRIMARY KEY(crm, cpf, data_da_consulta)
);