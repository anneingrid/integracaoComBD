const express = require('express');
const db = require('./db');
const app = express();
app.use(express.json());

app.get('/ola', (req, res) => {
    res.json('Olá mundo!');
});

app.get('/tarefas', (req, res) => {
    db.all('SELECT * FROM tarefas', (erro, tarefas) => {
        if(erro!=null){
            console.error(erro);
            res.status(500).json({mensagem: 'Erro no servidor'})
        }else{
            res.json(tarefas);
        }
    });
    
});

app.post('/tarefas',(req,res)=>{
    const nome = req.body.nome;
    // const { nome, status, data } = req.body;
    db.run('INSERT INTO tarefas (nome) VALUES (?)',[nome],(erro) =>{
        if(erro!=null){
            console.error(erro);
            res.status(500).json({ mensagem: 'Ocorreu um erro no servidor!'})
        } else{
            res.status(201).json({nome: nome})
        }
    });
});

app.listen(3030, () => {
    console.log('Servidor executando em localhost:3030')
});