const connection = require('../../connection');

module.exports = {
    getTaskById(req, res) {
        connection.query(`Select * from task where id = $1`, [req.params.taskId], (err, result) => {
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