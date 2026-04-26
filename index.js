import express from 'express';
import { pool } from './db/conexion.js';
import { testConexion } from './db/test.js';

const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.send({ estado: 'ok', ms: 'api ok' });
});

app.get('/especialidades', async (req, res) => {
  try {
    const sql = 'SELECT * FROM especialidades WHERE activo = 1';

    const [especialidades, fields] = await pool.query(sql);

    res.status(200).send({ estado: 'ok', especialidades: especialidades });
  } catch (error) {
    console.log(error);
  }
});

app.get('/especialidades/:id_especialidades', async (req, res) => {
  try {
    const ccc = req.params.id_especialidades;
    // const sql = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ${id_especialidades}`;

    const sql =
      'SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?';

    // const [especialidades, fields] = await pool.query(sql);
    const [especialidades, fields] = await pool.execute(sql, [ccc]);

    // console.log(fields);

    res.status(200).send({ estado: 'ok', especialidades: especialidades });
  } catch (error) {
    console.log(error);
  }
});

process.loadEnvFile();

const PUERTO = process.env.PUERTO;

app.listen(PUERTO || 3000, () => {
  console.log(`Servidor iniciado en puerto ${PUERTO}`);
});
