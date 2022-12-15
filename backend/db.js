const {Pool} = require('pg');  // Import the Pool class from the pg
require("dotenv").config();  // Import the dotenv package to access the .env file

const pool = new Pool({  // Create a new instance of the Pool class
    database: process.env.DATABASE_NAME,  // The name of the database
    host: process.env.DATABASE_HOST,  // The host of the database
    port: process.env.DATABASE_PORT,  // The port of the database
    user: process.env.DATABASE_USER,  // The user of the database
    password: process.env.DATABASE_PASSWORD,  // The password of the database
    ssl: process.env.DATABASE_SSLMODE,  // The sslmode of the database
});

module.exports = pool;  // Export the pool