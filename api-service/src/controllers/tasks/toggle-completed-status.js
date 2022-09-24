const connection = require('../../connection');

module.exports = {
    toggleCompletedStatus(req, res) {
        connection.query(`UPDATE task SET isCompleted = NOT isCompleted WHERE id = $1`, [req.params.taskId], (err, result) => {
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