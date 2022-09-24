const connection = require('../../connection');

module.exports = {
    deleteTask(req, res) {
        connection.query(`DELETE FROM task WHERE id = $1`, [req.params.id], (err, result) => {
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