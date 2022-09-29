const connection = require('../../connection');

module.exports = {
    deleteSubTask(req, res) {
        connection.query(`DELETE FROM subTask WHERE id = $1`, [req.params.id], (err, result) => {
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