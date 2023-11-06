const pg = require('pg');
let pool;

if (process.env.DATABASE_CONNECTION_STRING) {
    pool = new pg.Pool({
        connectionString: process.env.DATABASE_CONNECTION_STRING,
        ssl: {
            rejectUnauthorized: false
        }
    });
} else {
    pool = new pg.Pool({
        host: 'localhost',
        port: 5432,
        database: 'thing_db',
    });
}

module.exports = pool;
