// import { Pool } from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

// const pool = new Pool({
//   host: process.env.POSTGRES_HOST || 'localhost',
//   port: parseInt(process.env.POSTGRES_PORT!) || 5432,
//   database: process.env.POSTGRES_DB || 'sharedspoons',
//   user: process.env.POSTGRES_USER || 'postgres',
//   password: process.env.POSTGRES_PASSWORD || 'postgres',
// });

// export { pool };

import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT!),
  database: process.env.POSTGRES_DB,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
});



export { pool };