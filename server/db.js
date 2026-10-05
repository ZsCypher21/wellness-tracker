const { Pool } = require('pg');
require('dotenv').config();

// Render PostgreSQL requires SSL enabled
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('error', (err) => {
  console.error('Unexpected PG pool error', err);
  process.exit(-1);
});

module.exports = pool;
