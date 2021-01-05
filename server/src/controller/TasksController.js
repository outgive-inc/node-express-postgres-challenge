const uuidv4 = require("uuid/v4");
const Task = require("../model/Task");
const { validate, paginate } = require("../Helpers");
const ApiResponder = require("../ApiResponder");

module.exports.getTasks = async (filter) => {
	try {
		const { rows } = await Task.select("*");

		const paginated = await paginate(rows, filter);

		return { paginated };
	} catch (err) {
		console.error(err);
		return ApiResponder.error("Sorry, there was an error getting Task");
	}
};

module.exports.getTask = async (filter) => {};

module.exports.createTask = async (data) => {
	try {
		const validated = validate(data);

		if (validated !== true) return ApiResponder.error(validated);

		data.id = uuidv4(); // Create ID

		const res = await Task.insert(data);

		return ApiResponder.success("Task successfully added", res);
	} catch (err) {
		console.error(err);

		return ApiResponder.error("Sorry, there was an error adding Task");
	}
};

module.exports.updateTask = async (id, data) => {
	try {
		const validated = validate(data);

		if (validated !== true) return ApiResponder.error(validated);

		delete data.id;

		const res = await Task.update(id, data);

		return ApiResponder.success("Task successfully updated", res);
	} catch (err) {
		console.error(err);

		return ApiResponder.error("Sorry, there was an error updating Task");
	}
};

module.exports.deleteTask = async (id) => {
	try {
		const res = await Task.delete(id);

		return ApiResponder.success("Task successfully deleted", res);
	} catch (err) {
		console.error(err);

		return ApiResponder.error("Sorry, there was an error deleting Task");
	}
};
