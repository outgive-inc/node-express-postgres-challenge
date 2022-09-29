const connection = require('../../connection');

module.exports = {
    toggleSubTaskStatus(req, res) {
        connection.query(`UPDATE subTask SET iscompleted = NOT iscompleted WHERE id = $1`, [req.params.id], (err, result) => {
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