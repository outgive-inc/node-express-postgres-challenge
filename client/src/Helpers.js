export const ucwords = (str) => {
	return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
};

export const validate = (key, str) => {
	try {
		if (!str || str === "" || str === undefined)
			throw `${key.toUpperCase} is empty`;
		return true;
	} catch (err) {
		console.error(err);
		return err;
	}
};
