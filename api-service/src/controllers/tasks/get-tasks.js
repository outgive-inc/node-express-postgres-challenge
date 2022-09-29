const connection = require('../../connection');

module.exports = {
    getTasks(req, res) {
        connection.query(`Select id, title, isCompleted, createdAt from task`, (err, result) => {
            if (!err) {
                return res.send(result.rows);
            } else {
                return res.status(200).send({
                    status: false,
                    message: err.message
                })
            }
        });
        connection.end;
    }
}