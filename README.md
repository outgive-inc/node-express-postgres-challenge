# Outgive Full Stack Developer Coding Challenge

## Technology Stack Used

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [node-postgres](https://node-postgres.com/) (PostgresSQL client)
- [Docker](https://www.docker.com/)

## Setup

The project comes with a dockerized development environment and should include everything you need to get working right away.

This setup requires that you have Docker and Docker Compose installed on your your system.

For **MacOS and Windows** users, you should only need to install [Docker Desktop](https://www.docker.com/products/docker-desktop). Docker Desktop includes both Docker Engine and Docker Compose.

For **Linux** users, you have to separetely install Docker and Docker Compose.

Once you download this repository, all you have to do is run:

```
docker-compose up
```

Depending on your machine, you might need to run the command above with sudo:

```
sudo docker-compose up
```

The web app service should now be running on:

```
http://localhost:3000
```

The api service should now be running on:

```
http://localhost:5000
```

When you make a change to the client and server source code, the respective Docker containers running will be udpated as well. In other words, hot-reloading is enabled. However, there are certain time when you need to rebuild you docker images. When that happens, just run:

```
docker-compose up --build
```

## Your Challenge

### API

All instructions below pertains to the api-service directory of the project.

```
cd api-service/
```

- Create initial database table called "tasks" with at least the following fields, data types, and contraints
  - taskId (UUID)(PRIMARY KEY)
  - title (STRING)(NOT NULL)
  - details (STRING)
  - completed (BOOLEAN)(DEFAULT FALSE)

- Create initial database table called "subTasks" with at least the following fields, data types, and contraints
  - subTaskId (UUID)(PRIMARY KEY)
  - taskId (UUID)(FOREIGN KEY -> tasks.taskId)
  - title (STRING)(NOT NULL)
  - completed (BOOLEAN)(DEFAULT FALSE)

- The relationship between tasks and sub tasks should be one-to-many

- Create the necessary API routes and DB queries for CRUD functionalitiy

### Web App

All user stories below pertains to the client directory of the project.

```
cd web-app-service/
```

- As a user, I want to see a list with all my tasks with titles only.
- As a user, I want to be able to click on a single task to see the title, details, and sub-tasks.
- As a user, I want to create new tasks.
- As a user, I want to create new sub tasks under a specific task.
- As a user, I want to update my task's title and details.
- As a user, I want toggle my task between completed and uncompleted.
- As a user, I want toggle my sub task between completed and uncompleted.
- As a user, I want to delete my task.
- As a user, I want to delete my sub task.

## Evaluation

**Functionality:** Out of 10

**UX/Design:** Out of 10

**DB Design:** Out of 10

**Validation:** Out of 5

**Coding Style:** Out of 5

- Include front-end and back-end validation.
- Use your creativity and design skills to make the existing site design your own.
- You can modify the base source code as long as it achieve the features needed for the application.

## Submission

Create a merge/pull request on Gitlab. Name the branch as {firstname}-{lastname}-submission.

After running docker-compose up, run yarn knex migrate:latest
