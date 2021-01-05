module.exports.success = (message = "", data = null) => {
	return { result: true, message, data };
};

module.exports.error = (message) => {
	return { result: false, message };
};
