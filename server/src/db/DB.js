// Postgres client
// Config
const config = require("../config");
const { Pool, Client } = require("pg");

const pool = new Pool({
	user: config.pgUser,
	host: config.pgHost,
	database: config.pgDatabase,
	password: config.pgPassword,
	port: config.pgPort,
});

pool.on("error", () => console.log("Lost Postgres connection"));

module.exports.createTable = async () => {
	// TODO: Create initial DB table called task
	let retries = 5;
	try {
		const res = await pool.query(
			`
		CREATE TABLE IF NOT EXISTS tasks (
			id uuid PRIMARY KEY,
			title varchar NOT NULL,
			details varchar,
			completed boolean DEFAULT FALSE,
			created_at timestamp NOT NULL,
			updated_at timestamp NOT NULL,
			deleted_at timestamp
		);
 	 `
		);
	} catch (err) {
		console.error(err);
		retries -= 1;
		console.log(`Retries left ${retries}`);
		await new Promise((res) => setTimeout(res, 5000));
	}
};

module.exports.client = () => {
	return new Client();
};

module.exports.pool = () => {
	return pool;
};
