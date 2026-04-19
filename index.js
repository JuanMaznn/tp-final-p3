const express = require('express')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200)
    res.send({'estado': 'ok', 'ms':'api ok'})
})

app.post('especialidades/', (req, res) => {

})
// cargar el archivo 
process.loadEnvFile();
const port = process.env.PUERTO

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log("ab")