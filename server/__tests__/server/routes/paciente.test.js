// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';

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
            } catch (error) {
                throw(error);
            }
        });
    });

    describe('Get paciente with primary key', () => {
        it('Should get one paciente and return 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/paciente/3")
                console.log(result.body.records);
                expect(result.status).to.equal(200);
            } catch (error) {
                throw(error);
            }
        });
    });

});