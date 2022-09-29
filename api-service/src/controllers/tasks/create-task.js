const uuid = require('uuid');
const connection = require('../../connection');

module.exports = {
    createTask(req, res) {
        connection.query(`INSERT INTO task (id, title, details) VALUES ($1, $2, $3)`, [uuid.v4(), req.body.title, req.body.details], (err, result) => {
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