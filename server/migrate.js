// Brings an existing database in line with what the code expects.
// schema.sql only creates tables that are missing; if a table was created
// earlier with different columns (e.g. "activities" without "activity_type"),
// this adds the missing columns and relaxes NOT NULL on old, unused columns
// so inserts from the app don't fail.
const pool = require('./db');

const EXPECTED = {
  users: {
    full_name: 'VARCHAR(100)',
    email: 'VARCHAR(255)',
    password_hash: 'TEXT',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
  user_settings: {
    user_id: 'INTEGER',
    bio: "TEXT DEFAULT ''",
    sleep_goal: 'NUMERIC DEFAULT 0',
    hydration_goal: 'NUMERIC DEFAULT 0',
    meditation_goal: 'NUMERIC DEFAULT 0',
    activity_goal: 'NUMERIC DEFAULT 0',
    updated_at: 'TIMESTAMP DEFAULT NOW()',
  },
  activities: {
    user_id: 'INTEGER',
    activity_type: 'VARCHAR(100)',
    duration_minutes: 'INTEGER',
    activity_date: 'DATE',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
  sleep_logs: {
    user_id: 'INTEGER',
    sleep_date: 'DATE',
    hours_slept: 'NUMERIC(4,2)',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
  meditation_logs: {
    user_id: 'INTEGER',
    meditation_date: 'DATE',
    duration_minutes: 'INTEGER',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
  hydration_logs: {
    user_id: 'INTEGER',
    hydration_date: 'DATE',
    liters: 'NUMERIC(5,2)',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
  appointments: {
    user_id: 'INTEGER',
    appointment_type: 'VARCHAR(100)',
    description: 'TEXT',
    appointment_datetime: 'TIMESTAMPTZ',
    created_at: 'TIMESTAMP DEFAULT NOW()',
  },
};

async function migrate() {
  const { rows } = await pool.query(
    `SELECT table_name, column_name, is_nullable, column_default, data_type
       FROM information_schema.columns
      WHERE table_schema = 'public'`
  );

  for (const [table, columns] of Object.entries(EXPECTED)) {
    const existing = rows.filter((r) => r.table_name === table);
    const extra = existing.map((r) => r.column_name).filter((c) => c !== 'id' && !columns[c]);
    if (extra.length) {
      console.log(`MIGRATE: ${table} has old columns not used by the app: ${extra.join(', ')}`);
    }
    const names = new Set(existing.map((r) => r.column_name));

    // 1. add any missing columns
    for (const [col, type] of Object.entries(columns)) {
      if (!names.has(col)) {
        await pool.query(`ALTER TABLE ${table} ADD COLUMN IF NOT EXISTS ${col} ${type}`);
        console.log(`MIGRATE: added ${table}.${col}`);
      }
    }

    // 2. decimals: an old INTEGER column can't store 7.5 hours or 2.3 liters
    for (const r of existing) {
      const want = columns[r.column_name];
      if (want && want.startsWith('NUMERIC') && ['integer', 'smallint', 'bigint', 'real'].includes(r.data_type)) {
        await pool.query(`ALTER TABLE ${table} ALTER COLUMN ${r.column_name} TYPE NUMERIC`);
        console.log(`MIGRATE: changed ${table}.${r.column_name} to NUMERIC`);
      }
    }

    // 3. old columns the app doesn't use must not block inserts
    for (const r of existing) {
      if (r.column_name === 'id' || columns[r.column_name]) continue;
      if (r.is_nullable === 'NO' && r.column_default === null) {
        await pool.query(`ALTER TABLE ${table} ALTER COLUMN ${r.column_name} DROP NOT NULL`);
        console.log(`MIGRATE: made ${table}.${r.column_name} optional (not used by the app)`);
      }
    }
  }

  // Profile saving uses ON CONFLICT (user_id), which needs a unique index
  try {
    await pool.query(
      'CREATE UNIQUE INDEX IF NOT EXISTS user_settings_user_id_unique ON user_settings (user_id)'
    );
  } catch (err) {
    console.error('MIGRATE: could not add unique index on user_settings.user_id:', err.message);
  }

  // Indexes: every list query filters by user_id and sorts by date, so these
  // keep history pages fast as the number of entries grows.
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_activities_user_date ON activities (user_id, activity_date DESC)',
    'CREATE INDEX IF NOT EXISTS idx_sleep_logs_user_date ON sleep_logs (user_id, sleep_date DESC)',
    'CREATE INDEX IF NOT EXISTS idx_meditation_logs_user_date ON meditation_logs (user_id, meditation_date DESC)',
    'CREATE INDEX IF NOT EXISTS idx_hydration_logs_user_date ON hydration_logs (user_id, hydration_date DESC)',
    'CREATE INDEX IF NOT EXISTS idx_appointments_user_datetime ON appointments (user_id, appointment_datetime)',
    'CREATE UNIQUE INDEX IF NOT EXISTS idx_users_email_lower ON users (LOWER(email))',
  ];
  for (const sql of indexes) {
    try {
      await pool.query(sql);
    } catch (err) {
      console.error(`MIGRATE: index skipped (${err.message})`);
    }
  }

  console.log('Database migration check complete');
}

module.exports = migrate;
