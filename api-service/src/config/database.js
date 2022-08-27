const config = require("./");

module.exports = {
  development: {
    username: config.pgUser,
    password: config.pgPassword,
    database: config.pgDatabase,
    host: config.pgHost,
    dialect: "postgres",
  },
  test: {
    username: config.pgUser,
    password: config.pgPassword,
    database: config.pgDatabase,
    host: config.pgHost,
    dialect: "postgres",
  },
  production: {
    username: config.pgUser,
    password: config.pgPassword,
    database: config.pgDatabase,
    host: config.pgHost,
    dialect: "postgres",
  },
};
