const pg = require('pg');

const Pool = pg.Pool;

const pool = new Pool({
    database: 'lydian_intro',
    host: 'localhost',
    port: 5432,
    max: 10, //max = the max number of queries that can happen at one time. not total.
    idleTimeoutMillis: 30000
    //Pool expects these keys
});

pool.on('connect', () => {
    console.log('postgres is connected');
//console.log to show it's established
});

//attempt an error console.log
pool.on('error', (error) => {
    console.log('error with postgres pool, ', error);
});

module.exports = pool;