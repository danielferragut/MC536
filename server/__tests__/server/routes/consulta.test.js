// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';
require('./index.test');
require('./paciente.test');
require('./medico.test');

const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    expect
} = chai;
const server = require('../../../app');

chai.use(chaiHttp);

describe('Consulta route', () => {

    // before(async () => {
    // });

    // // after all test have run we drop our test database
    // after('Cleaning database', async () => {
    // });

    describe('Get all consultas', () => {
        it('Should get all consultas and return 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/consulta/");
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

        it('Should get all consultas before 01/01/2020 an after 02/01/2020', async () => {
            try {
                req = {
                    beforeDate : '01/01/2020',
                    afterDate: '02/01/2020'
                }
                const result = await chai
                    .request(server)
                    .get("/consulta/")
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

        it('Should get all consultas before 10:00 an after 12:00', async () => {
            try {
                req = {
                    primary : 'hora_da_consulta',
                    beforeTime : '12:00',
                    afterTime: '10:00'
                }
                const result = await chai
                    .request(server)
                    .get("/consulta/")
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

        it('(Relational Search)Should get all pacientes with consultas that happened after 10 AM', async () => {
            try {
                req = {
                    primary : 'hora_da_consulta',
                    afterTime : '10:00',
                    secondary : ["paciente"]
                };
                const result = await chai
                    .request(server)
                    .get("/consulta/")
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
    

    // describe('Get consulta with primary key', () => {
    //     it('Should get one consulta by its primary key', async () => {
    //         try {
    //             const result = await chai
    //                 .request(server)
    //                 .get("/consulta/21")
    //             expect(result.status).to.equal(200);
    //             expect(result.body).to.have.property('records');
    //             records = result.body.records;
    //             expect(records).to.have.property('primary');
    //             expect(records).to.have.property('secondary');
    //             expect(records.primary).to.have.lengthOf.above(0);
    //             expect(records.secondary).to.have.lengthOf(0);
    //         } catch (error) {
    //             throw(error);
    //         }
    //     });
    // });

});