const connection = require('../../connection');

module.exports = {
    updateTask(req, res) {
        connection.query(`UPDATE task SET title = $1, details = $2 WHERE id = $3`, [req.body.title, req.body.details, req.params.taskId], (err, result) => {
            if (!err) {
                return res.send(result.rows);
            } else {
                return res.status(200).send({
                    status: false,
                    message: err.message
                })
            }
        });
    }
}