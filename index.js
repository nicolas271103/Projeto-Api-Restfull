const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

let users = [];

// GET - Listar usuários
app.get('/api/users', (req, res) => {
  res.json(users);
});

// POST - Criar usuário
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: 'Nome e email necessários.' });
  }

  const userExists = users.some(user => user.email === email);
  if (userExists) {
    return res.status(409).json({ message: 'Email já cadastrado.' }); // verifica se o email do usuário já existe
  }

  const newUser = {
    id: uuidv4(),
    name,
    email,
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Atualizar usuário
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(409).json({ message: 'Nome e email necessários.' });
  }

  const userIndex = users.findIndex(user => user.id.trim() === id.trim());

  if (userIndex === -1) {
    return res.status(404).json({ message: 'Usuário não encontrado.' });
  }

  users[userIndex] = { id, name, email };
  res.json(users[userIndex]);
});

// DELETE - Remover usuário
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  users = users.filter(user => user.id !== id);
  res.status(200).send();
});

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
