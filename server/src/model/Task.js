const DB = require("../db/DB");
const TABLE = "tasks";
const Task = DB.pool();
const moment = require("moment");
module.exports.select = async (columns = "", filters = null) => {
	try {
		let filtered = {};

		if (filters) filtered = createFilter(filters);
		let text = `SELECT ${columns} FROM ${TABLE} ${
			filters ? `WHERE ${filtered.params}` : ""
		}`;
		text += " ORDER BY created_at DESC";
		const query = {
			text: text.toString().trim(),
			values: filters ? filtered.values : null,
		};

		return await Task.query(query);
	} catch (err) {
		console.error(err);
	}
};

module.exports.insert = async (data) => {
	try {
		data.created_at = moment().format("YYYY-MM-DD hh:mm:ss");
		data.updated_at = moment().format("YYYY-MM-DD hh:mm:ss");
		const { binds, values, columns } = createBindings(data, "insert");
		const text = `INSERT INTO ${TABLE}(${columns}) VALUES(${binds}) RETURNING *`;

		const query = {
			text: text.toString().trim(),
			values: values,
		};

		return await Task.query(query);
	} catch (err) {
		console.error("Error:", err);
		return err;
	}
};

module.exports.update = async (id, data) => {
	try {
		data.updated_at = moment().format("YYYY-MM-DD hh:mm:ss");
		const { binds, values } = createBindings(data, "update");
		const text = `UPDATE ${TABLE} SET ${binds} WHERE id = '${id}' RETURNING *`;

		const query = {
			text: text.toString().trim(),
			values: values,
		};

		return await Task.query(query);
	} catch (err) {
		console.error("Error:", err);
		return err;
	}
};

module.exports.delete = async (id) => {
	try {
		const query = `DELETE FROM ${TABLE} WHERE id = '${id}' RETURNING *`;

		return await Task.query(query);
	} catch (err) {
		console.error("Error:", err);
		return err;
	}
};

function createFilter(filters) {
	let params = "";
	let values = [];
	let counter = 1;

	Object.entries(filters).map(([key, value]) => {
		params +=
			Object.entries(filters).length !== counter
				? `${key} = $${counter}, `
				: `${key} = $${counter}`;
		values.push(value);
		counter++;
	});

	return { params, values };
}

function createBindings(data, method = "insert") {
	let binds = "";
	let columns = [];
	let values = [];
	let counter = 1;

	if (method === "insert") {
		Object.entries(data).map(([key, value]) => {
			binds +=
				Object.entries(data).length !== counter
					? `$${counter}, `
					: `$${counter}`;
			columns +=
				Object.entries(data).length !== counter ? `${key}, ` : `${key}`;
			values.push(value);
			counter++;
		});
		return { binds, values, columns };
	} else {
		Object.entries(data).map(([key, value]) => {
			binds +=
				Object.entries(data).length !== counter
					? `${key} = $${counter}, `
					: `${key} = $${counter}`;
			values.push(value);
			counter++;
		});

		return { binds, values };
	}
}
