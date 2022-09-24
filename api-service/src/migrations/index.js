const pgClient = require('../connection');
// console.log(pgClient);

module.exports = {
    async createMigrations(req, res) {
        console.log("Running migrations");
        await pgClient
            .query(`CREATE TABLE IF NOT EXISTS task (
                id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
                title VARCHAR(40) NOT NULL,
                details VARCHAR(40),
                isCompleted BOOLEAN NOT NULL DEFAULT false,
                createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
                updatedAt TIMESTAMP NOT NULL DEFAULT NOW()
            )`)
            .then(() => {
                console.log('Task table created successfully');
            })
            .catch((err) => {
                return res.status(500).send({
                    success: false,
                    message: err.message || "Error while creating migration"
                })
            });

        await pgClient
            .query(`CREATE TABLE IF NOT EXISTS subTask (
                id UUID PRIMARY KEY,
                taskId UUID NOT NULL,
                title VARCHAR(40) NOT NULL,
                isCompleted BOOLEAN NOT NULL DEFAULT false,
                createdAt TIMESTAMP NOT NULL DEFAULT NOW(),
                updatedAt TIMESTAMP NOT NULL DEFAULT NOW(),
                FOREIGN KEY (taskId) REFERENCES task(id)
            )
            `)
            .then(() => {
                console.log('SubTask table created successfully');
            }
            )
            .catch((err) => {
                return res.status(500).send({
                    success: false,
                    message: err.message || "Error while creating migration"
                })
            });

        return res.status(200).send({
            success: true,
            message: "Migrations created successfully"
        });

    }
}