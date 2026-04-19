const mysql = require('mysql2');

process.loadEnvFile();

const conexion = mysql.createConnection( {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWROD,
    database: process.env.DB_NAME,
})

const sqlQuery = 'SELECT * FROM actor';

conexion.query(sqlQuery, (queryErr, results) => {
    if (queryErr) {
        console.error("Error ejecutando la consulta:", queryErr)
        return;
    }

    console.log("Resultados:", results);
    
});

