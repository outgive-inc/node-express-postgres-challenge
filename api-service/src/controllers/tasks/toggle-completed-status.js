const connection = require('../../connection');

module.exports = {
    toggleCompletedStatus(req, res) {
        console.log(req.params.id);
        connection.query(`UPDATE task SET iscompleted = NOT iscompleted WHERE id = $1`, [req.params.id], (err, result) => {
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