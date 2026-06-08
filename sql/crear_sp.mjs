import mysql from 'mysql2/promise';
import fs from 'fs';
const pool = mysql.createPool({ host:'localhost', user:'prog3user', database:'prog3_turnos', password:'29341261296129grupoh' });
const sql = fs.readFileSync(new URL('sp_estadisticas.sql', import.meta.url), 'utf8');
const statements = sql.split(';').filter(s => s.trim());
for (const stmt of statements) {
  try { await pool.query(stmt); } catch(e) { console.log('Error:', e.sqlMessage || e.message); }
}
console.log('SP creado correctamente');
await pool.end();
