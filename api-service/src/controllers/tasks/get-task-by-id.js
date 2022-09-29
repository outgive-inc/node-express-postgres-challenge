const connection = require('../../connection');

module.exports = {
    getTaskById(req, res) {
        const { id } = req.params;
        connection.query('SELECT * FROM task WHERE id = $1', [id], (err, result) => {
            if (!err) {
                const task = result.rows[0];
                connection.query('SELECT * FROM subTask WHERE taskId = $1', [id], (err, result) => {
                    if (!err) {
                        const subTasks = result.rows;
                        return res.status(200).send({
                            task,
                            subTasks
                        });
                    } else {
                        return res.status(200).send({
                            status: false,
                            message: err.message
                        })
                    }
                });
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