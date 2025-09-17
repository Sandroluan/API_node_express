const express = require('express');
const app = express();
const sql = require('mysql2')
const port = 3000;

const db = 
`
CREATE DATABASE IF NOT EXISTS users;

USE users;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(55) NOT NULL,
  email VARCHAR(55) NOT NULL UNIQUE
)`


const connection = sql.createConnection({
  host: 'localhost',
  user:'root',
  password: '',
  multipleStatements:true
})

app.use(express.json());




connection.connect((err) => {
  if(err){
    console.error('Erro ao conectar ao banco de dados: ', err);
    return;
  }

  console.log('conectado ao banco');

  connection.query(db, (err, result)=>{
    if(err){
      console.log('erro para criar a tabela')
      return;
    }
    console.log('tabela criada com sucesso')

    app.listen(port, ()=>{
      console.log(`http://localhost:${port}`)
    })
  })
})



app.get('/users', (req,res)=>{
  connection.query('SELECT * FROM users', (err, results) => {
    if(err){
      console.error('erro ao buscar usuarios', err);
      res.status(500).json({error: 'Erro ao buscar usuarios'});
      return;
    }
    res.json(results);
  })
})