require('dotenv').config();

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config');
const { createMigrations } = require('./migrations');

// * App initialization
const app = express();
app.use(cors());
app.use(express.json());

// * Postgres client
// const { Pool, Client } = require('pg');
// const pgClient = new Pool({
//     user: config.pgUser,
//     host: config.pgHost,
//     database: config.pgDatabase,
//     password: config.pgPassword,
//     port: config.pgPort,
// });
// pgClient.on('error', () => console.log('Lost Postgres connection'));

// app.get('/connection', (req, res) => {
//     pgClient.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//         console.log(err ? err.stack : res.rows[0].message) // Hello World!
//         pgClient.end()
//     })
// });

// * Healthcheck

app.use(`/health-check`, (req, res) =>
    res.json({
        success: true,
        message: `${process.env.NODE_ENV} server is running healthy`,
    })
);

app.use(`/create-migration`, createMigrations)

// * Server
const port = process.env.PORT || 5000;

app.listen(port, async () => {
    console.log(
        `🚀 ${process.env.NODE_ENV} server ready at: http://localhost:${port}`
    );
});

require("./routes")(app);