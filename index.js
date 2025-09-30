const express = require("express");
const mysql = require("mysql2");
const port = 3000;
const app = express();
const conexao = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});

app.use(express.json());

//!pegar todos os usuarios
app.get("/users", (req, res) => {
  conexao.query("SELECT * FROM users", (err, result) => {
    if (err) {
      return res.status(500).json({"error":"nao foi possivel conectar ao banco de dados"});
    } else {
      res.json(result);
    }
  });
});

//! usuario por id
app.get('/users/:id', (req,res)=>{
  const {id} = req.params
  if (!id){
    return res.json({error: "daods incompleto 'id' é obrigatorio"})
  }

    conexao.query("SELECT * FROM users WHERE id = ?", [id], (err,result)=>{
    if (err){
        return res.status(500).json({"erro":"Naõ foi possivel buscar usuario"})
      }else if (result.length === 0 ){ //! 
    return res.status(404).json({"mensagem":"usuario nao encontrado"}) 
      }//!
      else{
        console.log('usuario encontrado')
        res.json(result[0])
      }
    })
    
})

//! criar usuarios
app.post("/users", (req, res) => {
  const { name, cpf, email } = req.body;
  const values = [name, cpf, email];
  if (!name || !cpf) {
    return res.status(400).json({
      error: "Dados incompletos. 'nome', 'cpf', são obrigatórios.",
    });
  }
  conexao.query(
    "INSERT INTO users (name, cpf, email) VALUES (?,?,?)",
    values,
    (err, result) => {
      if (err) {
        return res.status(500).json({"mensagem":"nao foi possivel inserir usuario no banco"});
      } else {
        return res.json(result);
      }
    }
  );
});

//! atualizar usuario
app.patch("/users/:id", (req, res) => {
  const update = req.body
  const {id} = req.params
  const value = [nome, cpf, email]
  conexao.query('UPDATE users SET nome = ? OR cpf = ? OR email = ? WHERE id = ?' [id],[value], (err,result)=>{
    if(err){
      return res.status(500).json({"error":"nao foi possivel alterar"})
    }
  })
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
