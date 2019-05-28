const {Pool} = require('pg')
const keys = require('./keys')

const pool = new Pool(
    keys.postgres
)

module.exports = {
    query: (text, params) => {
        // console.log(text,params);
        return pool.query(text, params)
    }
}
