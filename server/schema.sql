CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  full_name     VARCHAR(100) NOT NULL,
  email         VARCHAR(255) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_settings (
  user_id         INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  bio             TEXT DEFAULT '',
  sleep_goal      NUMERIC DEFAULT 0,
  hydration_goal  NUMERIC DEFAULT 0,
  meditation_goal NUMERIC DEFAULT 0,
  activity_goal   NUMERIC DEFAULT 0,
  updated_at      TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activities (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_type    VARCHAR(100) NOT NULL,
  duration_minutes INTEGER NOT NULL,
  activity_date    DATE NOT NULL,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sleep_logs (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  sleep_date  DATE NOT NULL,
  hours_slept NUMERIC(4,2) NOT NULL,
  created_at  TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS meditation_logs (
  id               SERIAL PRIMARY KEY,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  meditation_date  DATE NOT NULL,
  duration_minutes INTEGER NOT NULL,
  created_at       TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hydration_logs (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  hydration_date DATE NOT NULL,
  liters         NUMERIC(5,2) NOT NULL,
  created_at     TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS appointments (
  id                   SERIAL PRIMARY KEY,
  user_id              INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  appointment_type     VARCHAR(100) NOT NULL,
  description          TEXT,
  appointment_datetime TIMESTAMPTZ NOT NULL,
  created_at           TIMESTAMP DEFAULT NOW()
);