require('dotenv').config({path:__dirname+'/./../../.env'})

export = {
    development: {
        client: "postgresql",
        connection: {
            user: process.env.PGUSER,
            host: process.env.PGHOST,
            database: process.env.PGDATABASE,
            password: process.env.PGPASSWORD,
            port: process.env.PGPORT,
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: __dirname + "/migrations",
            tableName: "knex_migrations",
            extension: "ts",
        },
    },
} as { [key: string]: object };