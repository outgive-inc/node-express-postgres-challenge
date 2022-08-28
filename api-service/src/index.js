require('dotenv').config({path:__dirname+'/../.env'});

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRoutes = require('./routes/api');
const config = require('./config');
const db = require('./config/database.connection');


// * App initialization
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;

// * Healthcheck

app.use(`/health-check`, (req, res) =>{

 return res.json({
    success: true,
    message: `${process.env.NODE_ENV} server is running healthy`,
  })
});

// * Server
app.listen(port, async () => { 
  console.log(
    `🚀 ${config.nodeEnv} server ready at: http://localhost:${port}`
  );
});


app.use('/api/', apiRoutes);

app.use('*', (req, res) => {
  res.status(404).json("404 not found!")
})

db.connect()


//Because of less time I have to create tables this way which is a bad practice, it needs to be in a migration
function createTables(){
  let query = "CREATE TABLE IF NOT EXISTS tasks(taskid uuid NOT NULL,title character varying(255) NOT NULL, details text, completed boolean DEFAULT false,CONSTRAINT tasks_pkey PRIMARY KEY (taskid))"
  db.query(query)
  
  let query2 = "CREATE TABLE IF NOT EXISTS sub_tasks(subtaskid uuid NOT NULL,taskid uuid,title character varying(255) NOT NULL, completed boolean DEFAULT false, CONSTRAINT sub_tasks_pkey PRIMARY KEY (subtaskid), CONSTRAINT fk_taskid FOREIGN KEY (taskid) REFERENCES public.tasks (taskid) MATCH SIMPLE ON UPDATE NO ACTION ON DELETE CASCADE)"
  db.query(query2)
}

createTables()
