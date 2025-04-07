const express = require('express');
const app = express();
const db = require('./database.js');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// GET - Listar usuários
app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });
    res.json(rows);
  });
});

// POST - Criar usuário
app.post('/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email necessários.' });
 }

 // verificador de email do usuário já existente

 db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (row) return res.status(409).json({ message: 'Email já cadastrado.' });
  
    // Gera um UUID único para o usuário
    const id = uuidv4(); 
    const query = 'INSERT INTO users (id, name, email) VALUES (?, ?, ?)';
    db.run(query, [ id, name, email], function (err) {
      if (err) return res.status(400).json({ erro: err.message });

      res.status(201).json({ id, name, email });
    });
  });
});

// GET - Listar usuário por ID
app.get('/users/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM users WHERE id = ?', [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!row) return res.status(404).json({ message: 'Usuário não encontrado.' });

    res.json(row);
  });
});
// PUT - Atualizar usuário
app.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(409).json({ message: 'Nome e email necessários.' });
  }

  const query = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.run(query, [name, email, id], (err) => {
    if (err) return res.status(500).json({ erro: err.message });
  
    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    res.json({ id, name, email });
  });


  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// DELETE - Remover usuário
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = ?';
  db.run(query, [id], function (err) {
    if (err) return res.status(500).json({ erro: err.message });

    if (this.changes === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    // OK, usuário deletado
    res.json({ message: 'Usuário removido com sucesso.' });
  });
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
