const { Pool, types } = require('pg');
require('dotenv').config();

// Return DATE columns as plain "YYYY-MM-DD" strings instead of JS Date objects.
// Otherwise dates get shifted by the server's timezone (e.g. 2026-10-05 becomes
// "2026-10-04T13:00:00.000Z") and <input type="date"> can't display them.
types.setTypeParser(1082, (value) => value);

// Return NUMERIC columns (liters, hours_slept, goals) as numbers, not strings.
types.setTypeParser(1700, (value) => (value === null ? null : parseFloat(value)));

// Render PostgreSQL requires SSL. For a local Postgres without SSL,
// set DATABASE_SSL=false in server/.env.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false }
});

// Idle connections can be dropped by Render; log it but keep the server running.
pool.on('error', (err) => {
  console.error('Unexpected PG pool error', err);
});

module.exports = pool;
