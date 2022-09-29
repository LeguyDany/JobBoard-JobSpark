// Sets up an object from the class Pool which will be usede to query our tables.

const Pool = require('pg').Pool;

const pool = new Pool({
    user:'danyleguy',
    host: 'localhost',
    database: 'JobSpark',
    password: 'HxnE4jP#k*eTxmpBzD@9',
    port: 5432,
});

module.exports = pool;