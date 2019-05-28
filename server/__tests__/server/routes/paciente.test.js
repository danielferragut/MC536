// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';
require('./index.test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    expect
} = chai;
const server = require('../../../app');

chai.use(chaiHttp);

describe('Paciente route', () => {

    // before(async () => {
    // });

    // // after all test have run we drop our test database
    // after('Cleaning database', async () => {
    // });

    describe('Get all pacientes', () => {
        it('Should get all pacientes and return 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf(0);
            } catch (error) {
                throw(error);
            }
        });
        it('Should get all MALE pacientes', async () => {
            try {
                req = {
                    primary : 'sexo',
                    primaryValue : 'Masculino'
                };
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                    .query(req);
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf(0);
            } catch (error) {
                throw(error);
            }
        });
        it('Should get all pacientes with less than 30 years', async () => {
            try {
                req = {
                    primary : 'data_de_nascimento',
                    minAge : 20,
                    maxAge : 30
                };
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                    .query(req);
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf(0);
            } catch (error) {
                throw(error);
            }
        });
        it('Should get all consultas with MALE pacientes', async () => {
            try {
                req = {
                    primary : 'sexo',
                    primaryValue : 'Masculino',
                    secondary : ["consulta", "medico"]
                };
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                    .query(req);
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf.above(0);
            } catch (error) {
                throw(error);
            }
        });

        it('Should get all consultas with pacientes with MORE than 10 YEARS', async () => {
            try {
                req = {
                    primary : 'data_de_nascimento',
                    minAge : 10,
                    secondary : ["consulta", "medico"]
                };
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                    .query(req);
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf.above(0);
            } catch (error) {
                throw(error);
            }
        });

        it('SQL Injection attempt, should return 400', async () => {
            try {
                req = {
                    primary : '; DROP TABLE paciente;',
                    primaryValue : '; DROP TABLE paciente;',
                    secondary : ["consulta", "medico"]
                };
                const result = await chai
                    .request(server)
                    .get("/paciente/")
                    .query(req);
                expect(result.status).to.equal(400);
            } catch (error) {
                throw(error);
            }
        });

        
    });
    

    describe('Get paciente with primary key', () => {
        it('Should get one paciente by its primary key', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/paciente/68665838450")
                expect(result.status).to.equal(200);
                expect(result.body).to.have.property('records');
                records = result.body.records;
                expect(records).to.have.property('primary');
                expect(records).to.have.property('secondary');
                expect(records.primary).to.have.lengthOf.above(0);
                expect(records.secondary).to.have.lengthOf(0);
            } catch (error) {
                throw(error);
            }
        });
    });

});