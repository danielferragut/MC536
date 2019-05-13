const {Pool} = require('pg')
const keys = require('./keys')

const pool = new Pool(
    keys.postgres
)

module.exports = {
    query: (text, params) => pool.query(text, params)
}
