require('dotenv').config();

// Express App Setup
const express = require('express');
const http = require('http');
const router = require('./router')

// Initialization
const app = express();

// Main router
app.use('/api', router)

// Server
const port = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running on port ${port}`));
