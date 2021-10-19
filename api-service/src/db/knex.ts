require('dotenv').config();

import knex from 'knex';
const config = require("./config");

const environment = process.env.NODE_ENV || 'development';

export default knex({...config[environment]});