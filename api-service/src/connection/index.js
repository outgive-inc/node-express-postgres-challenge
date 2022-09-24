const config = require('../config');

// * Postgres client
const { Pool } = require('pg');
const pgClient = new Pool({
    user: config.pgUser,
    host: config.pgHost,
    database: config.pgDatabase,
    password: config.pgPassword,
    port: config.pgPort,
});
// console on successful connection
pgClient.connect();
pgClient.on('connect', () => {
    console.log('Connected to Postgres');
});
pgClient.on('error', () => console.log('Lost Postgres connection'));
pgClient.on('end', () => console.log('Postgres connection ended'));

module.exports = pgClient;