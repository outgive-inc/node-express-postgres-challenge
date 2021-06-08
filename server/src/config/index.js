// const config = {
//   pgUser: process.env.PGUSER,
//   pgHost: process.env.PGHOST,
//   pgDatabase: process.env.PGDATABASE,
//   pgPassword: process.env.PGPASSWORD,
//   pgPort: process.env.PGPORT
// };

// module.exports = config;

let config = {}
if (process.env.DATABASE_URL) {
  config.connectionString = process.env.DATABASE_URL;
  config.ssl = { rejectUnauthorized: false };
} else {
  config = {
    pgUser: process.env.DB_USER,
    pgHost: process.env.DB_HOST,
    pgDatabase: process.env.DB_NAME,
    pgPassword: process.env.DB_PASS,
    pgPort: process.env.DB_PORT
  }
};

module.exports = config;