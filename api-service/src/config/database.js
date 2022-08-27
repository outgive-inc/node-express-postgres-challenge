const config = require("./");
console.log("config database:::", config);

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
