// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';
require('./index.test');
require('./paciente.test');
require('./consulta.test');
require('./atendimento.test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    expect
} = chai;
const server = require('../../../app');

chai.use(chaiHttp);

describe('internacao route', () => {

    // before(async () => {
    // });

    // // after all test have run we drop our test database
    // after('Cleaning database', async () => {
    // });

    describe('Get all internacaos', () => {
        it('Should get all internacaos and return 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/internacao/");
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

        it('Should get all internacaos before 01/01/2020 an after 02/01/2020', async () => {
            try {
                req = {
                    beforeDate : '01/01/2020',
                    afterDate: '02/01/2020'
                }
                const result = await chai
                    .request(server)
                    .get("/internacao/")
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


        it('(Relational Search)Should get all pacientes with internacaos that happened after 01/01/2001', async () => {
            try {
                req = {
                    primary : 'data_da_internacao',
                    afterDate : '01/01/2001',
                    secondary : ["paciente"]
                };
                const result = await chai
                    .request(server)
                    .get("/internacao/")
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


        
    });
    

    describe('Get internacao with primary key', () => {
        it('Should get one internacao by its primary key', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/internacao/1")
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