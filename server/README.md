## Your Challenge

### Server

All instructions below pertains to the server directory of the project.

```
cd server/
```

- Create initial database table called "tasks" with at least the following fields, data types, and contraints
  - id (UUID)(PRIMARY KEY)
  - title (STRING)(NOT NULL)
  - details (STRING)
  - completed (BOOLEAN)(DEFAULT FALSE)
- Create the necessary API routes and DB queries for CRUD functionalitiy
  - Get all tasks
  - Get a single task
  - Create a task
  - Update a task
  - Delete a task
