import { Pool } from 'pg';
import * as fs from 'fs';

import dotenv from 'dotenv';

dotenv.config();
process.env.POSTGRES_DB = 'test';

const pool = new Pool({
  host: 'postgres',
  port: 5432,
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});

const run = async (file: string) => {
  const content = fs.readFileSync(file, 'utf8');
  await pool.query(content);  // Run the full content at once

};

const reset = async () => {
  await run('/usr/src/app/tests/sql/test.sql');
};

const shutdown = () => {
  pool.end(() => {
  });
};

export { reset, shutdown };