import mysql from 'mysql2/promise';
process.loadEnvFile();
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
});
const [rows] = await pool.execute('SELECT * FROM usuarios WHERE activo = 1');
console.log(JSON.stringify(rows, null, 2));
await pool.end();
