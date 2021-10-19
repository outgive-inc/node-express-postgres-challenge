import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    return knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
        .then(function () {
            // set up tables
            return knex.schema
                .createTable("tasks", (table) => {
                    table.uuid("taskId")
                        .primary()
                        .notNullable()
                        .defaultTo(knex.raw("uuid_generate_v4()"));

                    table.string("title")
                        .notNullable();

                    table.string("details");

                    table.boolean("completed")
                        .notNullable()
                        .defaultTo("false");

                    // * timestamps
                    table.timestamp("create_date").notNullable();
                    table.timestamp("update_date").notNullable();
                })
                .createTable("subTasks", (table) => {
                    table.uuid("subTaskId")
                        .primary()
                        .notNullable()
                        .defaultTo(knex.raw("uuid_generate_v4()"));

                    table.uuid("taskId")
                        .unsigned()
                        .notNullable();

                    table.foreign("taskId")
                        .references("taskId")
                        .inTable("tasks");

                    table.string("title")
                        .notNullable();

                    table.boolean("completed")
                        .notNullable()
                        .defaultTo("false");

                    // * timestamps
                    table.timestamp("create_date").notNullable();
                    table.timestamp("update_date").notNullable();
                })
        });

}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable("subTasks").dropTable("tasks");
}