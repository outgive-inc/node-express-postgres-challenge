const { Pool } = require('pg');
const config = require('./index');

const credentials = {
  user: config.pgUser,
  host: config.pgHost,
  database: config.pgDatabase,
  password: config.pgPassword,
  port: config.pgPort,
}
console.log(config.pgUser);

const databaseConnection = new Pool(credentials);

module.exports = databaseConnection