// will work for linux for windows we are going to user cross-env in package json
//process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const {
    expect
} = chai;
const server = require('../../../app');

chai.use(chaiHttp);

let token;
let validId;
let validId2;

describe('Index route', () => {

    // before(async () => {
    // });

    // // after all test have run we drop our test database
    // after('Cleaning database', async () => {
    // });

    describe('See if server is OK', () => {
        it('should send a dummy request and get an 200 OK', async () => {
            try {
                const result = await chai
                    .request(server)
                    .get("/index/")
                expect(result.status).to.equal(200);
            } catch (error) {
                throw(error);
            }
        });
    });

});