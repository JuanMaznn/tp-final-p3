import express from 'express';
import { pool } from './db/conexion.js';
import { testConexion } from './db/test.js';

import { check } from 'express-validator';
import { param } from "express-validator";
import { validarCampos } from "./middlewares/validarCampos.js";

const app = express();

await testConexion();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200);
  res.send({ estado: 'ok', ms: 'api ok' });
});

app.post('/especialidades', 
    [
        check('nombre', 'El nombre es obligatorio.').notEmpty(),
        validarCampos
    ], 
    async (req, res) => {
    try {
        const { nombre } = req.body;

        const sql = 'INSERT INTO especialidades (nombre) VALUES (?)';

        const [result] = await pool.execute(sql, [nombre]);

        if (result.affectedRows > 0){
            res.status(201).send({'estado': true, 'msg': `ID Creado ${result.insertId}`});
        }

    }catch( error ){
        console.error("ERROR EN POST:", error);
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
});

app.put('/especialidades/:id_especialidad', 
    [
        check('nombre')
            .notEmpty().withMessage('El nombre es obligatorio.')
            .isLength({max:120}).withMessage('El nombre no debe ser mayor a 120 caracteres.'),
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ], 
    async (req, res) => {
    try {

        const id_especialidad = req.params.id_especialidad;
        const sqlb = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sqlb, [id_especialidad]);

        if (especialidades.length === 0){
            return res.status(404).send({'estado': false, 'msg': 'Especialidad no encontrada'});
        }

        const { nombre } = req.body;
        
        const sql = 'UPDATE especialidades SET nombre = ? WHERE id_especialidad = ?';

        const [result] = await pool.execute(sql, [nombre, id_especialidad]);

        if (result.affectedRows > 0){
            res.status(200).send({'estado': true, 'msg': 'Especialidad modificada'});
        }

    }catch( error ){
        console.log(error);
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
})

app.delete('/especialidades/:id_especialidad', 
    [
        param('id_especialidad', 'El parámetro debe ser entero').isInt(),    
        validarCampos
    ], 
    async (req, res) => {
    try {

        const id_especialidad = req.params.id_especialidad;
        const sqlb = `SELECT * FROM especialidades WHERE activo = 1 AND id_especialidad = ?`;

        const [especialidades, fields] = await pool.execute(sqlb, [id_especialidad]);

        if (especialidades.length === 0){
            return res.status(404).send({'estado': false, 'msg': 'Especialidad no encontrada'});
        }

        const sql = 'UPDATE especialidades SET activo = 0 WHERE id_especialidad = ?';

        const [result] = await pool.execute(sql, [id_especialidad]);

        if (result.affectedRows > 0){
            res.status(200).send({'estado': true, 'msg': 'Especialidad eliminada.'});
        }


    }catch( error ){
        console.log(error);
        res.status(500).send({'estado':false, 'msg': 'Error interno.'});
    } 
})

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

app.get('/obras-sociales', async(req, res) => {
    try{
        const sql = "SELECT * FROM obras_sociales WHERE activo = 1";
        const [obras_sociales, fields] = await pool.query(sql)

        console.log(fields);

        res.status(200)
        res.send({
            'obras sociales': obras_sociales
        })
    }catch(error){
        console.log(error)
    }
});

app.get('/obras-sociales/:id_obra_social', async (req, res) => {
    try{
        const id_obra_social = req.params.id_obra_social
        const sql = 'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?'

        const [obras_sociales, fields] = await pool.execute(sql, [id_obra_social]);

        res.status(200)
        res.send({
            "estado": true,
            "obra social": obras_sociales
        })
    }catch(error){
        console.log(error)
        res.status(500)
        res.send({
            'estado': false,
            'msg': 'Error en el servidor'
        })
    }
});

app.put('/obras-sociales/:id_obra_social', async (req, res) => {
    try{
        const id_obra_social = req.params.id_obra_social
        const sqla = 'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?'

        const [obras_sociales, field] = await pool.execute(sqla, [id_obra_social])

        const {nombre, descripcion, porcentaje_descuento} = req.body

        const sqlb = 'UPDATE obras_sociales SET nombre = ?, descripcion=? , porcentaje_descuento= ? WHERE id_obra_social = ?';

        const [result] = await pool.execute(sqlb, [nombre, descripcion, porcentaje_descuento, id_obra_social])

        res.status(200)
        res.send({
            'estado': true,
            'msg': 'Obra social modificada'
        })
    }catch(error){
        console.log(error)
        res.status(500)
        res.send({
            'estado': false,
            'msg': 'No fue posible modificar la obra social'
        });
    }
});

app.post('/obras-sociales' [
    check('nombre', 'Nombre no puede estar vacio').notEmpty(),
    check('porcentaje_descuento', 'Tiene que ser un numero').isDecimal(),
    validarCampos
], async(req, res) =>{
     try{
        const {nombre,descripcion, porcentaje_descuento, es_particular} = req.body

        const sql = 'INSERT INTO obras_sociales (nombre, descripcion, porcentaje_descuento, es_particular) VALUES (?,?,?,?)';

        const [result] = await pool.execute(sql, [nombre, descripcion, porcentaje_descuento, es_particular])

        res.status(201)
        res.send( {
            'estado': true,
            'msg': `id creado ${result.insertId}`
        })
    }catch(error){
        console.error("error en post:", error)
        res.status(500)
        res.send({
            'estado': false,
            'msg': 'error interno'
        });
    }
});

app.delete('/obras-sociales/:id_obra_social', async (req,res) => {
    try{
        const id_obra_social = req.params.id_obra_social;
        const sqla = 'SELECT * FROM obras_sociales WHERE activo = 1 AND id_obra_social = ?';

        const [obras_sociales, fields] = await pool.execute(sqla, [id_obra_social]);

        const sqlb = 'UPDATE obras_sociales SET activo = 0 WHERE id_obra_social = ?';

        const [result] = await pool.execute(sqlb, [id_obra_social])

        res.status(200)
        res.send({
            'estado': true,
            'msg': 'Obra social borrada'
        })
    }catch(error){
        console.log(error)
        res.status(500)
        res.send({
            'estado': false,
            'msg': 'error interno'
        })
    }
})



