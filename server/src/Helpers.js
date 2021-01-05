module.exports.paginate = async (rows, filter) => {
	try {
		let offset = null;
		if (filter.page < 1) filter.page = 1;
		if (filter.page > 1) offset = (filter.page - 1) * filter.rows_per_page;

		const total = rows.pagination ? rows.pagination.rowCount : rows.length;

		return {
			total: parseInt(total),
			per_page: parseInt(filter.rows_per_page),
			offset: parseInt(offset),
			to: parseInt(offset + rows.length),
			last_page: parseInt(Math.ceil(total / filter.rows_per_page)),
			current_page: parseInt(filter.page),
			from: parseInt(offset),
			data: rows,
		};
	} catch (err) {
		console.error(err);
	}
};

module.exports.ucwords = (str) => {
	return str.toLowerCase().replace(/\b[a-z]/g, function (letter) {
		return letter.toUpperCase();
	});
};

module.exports.validate = (data) => {
	try {
		const dont_validate = [
			"created_at",
			"completed",
			"deleted_at",
			"updated_at",
		];

		Object.entries(data).map(([key, value]) => {
			if (
				!dont_validate.includes(key) &&
				(!value || value === "" || value === undefined)
			)
				throw `${key.toLocaleUpperCase()} is required`;
		});

		return true;
	} catch (err) {
		console.error(err);
		return err;
	}
};
