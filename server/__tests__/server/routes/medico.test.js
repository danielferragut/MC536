// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    expect
} = chai;
const server = require('../../../app');

chai.use(chaiHttp);

describe('Médico route', () => {

    // before(async () => {
    // });

    // // after all test have run we drop our test database
    // after('Cleaning database', async () => {
    // });

    describe('Get all médicos', () => {
        it('Should get all medicos and return 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/medico/")
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
        it('Should get all medicos named Medico2', async () => {
            try {
                req = {
                    primary : 'nome',
                    primaryValue : 'Medico2'
                };
                const result = await chai
                    .request(server)
                    .get("/medico/")
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
        it('Should get all medicos with less than 30 years', async () => {
            try {
                req = {
                    primary : 'data_de_nascimento',
                    minAge: 20,
                    maxAge: 30
                };
                const result = await chai
                    .request(server)
                    .get("/medico/")
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

        it('(Relational Search)Should get all consultas with medicos with MORE than 10 YEARS', async () => {
            try {
                req = {
                    primary : 'data_de_nascimento',
                    minAge : 10,
                    secondary : ["consulta"]
                };
                const result = await chai
                    .request(server)
                    .get("/medico/")
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
                    primary : '; DROP TABLE medico;',
                    primaryValue : '; DROP TABLE medico;',
                    secondary : ["consulta", "médico"]
                };
                const result = await chai
                    .request(server)
                    .get("/medico/")
                    .query(req);
                expect(result.status).to.equal(500);
            } catch (error) {
                throw(error);
            }
        });

        
    });
    

    describe('Get medico with primary key', () => {
        it('Should get one medico by its primary key', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/medico/21")
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