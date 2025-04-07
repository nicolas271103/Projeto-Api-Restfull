# 📚 Documentação da API - Sistema de Cadastro de Usuários

---

## 📄 Visão Geral

Este sistema oferece uma **API RESTful** desenvolvida com **Node.js**, que permite o gerenciamento de usuários com as seguintes operações:

- **Criar** usuário
- **Listar** usuários
- **Atualizar** dados do usuário
- **Excluir** usuário

Além disso, conta com uma **interface web em HTML e JavaScript** para facilitar a interação com a API.

---

## 🌐 Endpoints da API

### 📅 Criar um novo usuário

- **URL:** `POST /api/users`
- **Corpo da requisição (JSON):**

```json
{
  "name": "Fulano da Silva",
  "email": "fulano@email.com"
}
```

- **Respostas:**
  - ✅ `201 Created`: Usuário cadastrado
  - ❌ `400 Bad Request`: Campos faltando ou e-mail já cadastrado

---

### 🗃️ Listar todos os usuários

- **URL:** `GET /api/users`
- **Resposta:**

```json
[
  {
    "id": "1",
    "name": "Fulano da Silva",
    "email": "fulano@email.com"
  }
]
```

---

### ♻️ Atualizar um usuário

- **URL:** `PUT /api/users/:id`
- **Corpo da requisição (JSON):**

```json
{
  "name": "João Atualizado",
  "email": "exemplo@email.com"
}
```

- **Validação:**

  - O e-mail **não pode estar sendo usado** por outro usuário.

- **Respostas:**

  - ✅ `200 OK`: Usuário atualizado
  - ❌ `400 Bad Request`: Dados inválidos ou e-mail existente
  - ❌ `404 Not Found`: ID não encontrado

---

### ❌ Excluir um usuário

- **URL:** `DELETE /api/users/:id`
- **Respostas:**
  - ✅ `200 No Content`: Usuário deletado com sucesso
  - ❌ `404 Not Found`: ID não encontrado

---

## 🖥 Interface HTML

A interface foi construída com HTML + JS e consome os endpoints da API diretamente.

### Funcionalidades:

- Formulário para cadastrar usuários
- Lista com todos os usuários
- Botões de **editar** e **excluir**
- Formulário de edição com campos preenchidos automaticamente
- Validação de e-mail duplicado ao **cadastrar ou atualizar**

---

## 🛠 Tecnologias Utilizadas

- Node.js
- HTML / CSS
- JavaScript
- JSON para persistência dos dados

---

## ▶️ O projeto foi desenvolvido para rodar Localmente

```bash
# Instale as dependências
npm install

# Inicialize o servidor
node index.js
```

Para ter acesso a interface HTML via navegador abra o arquivo `index.html`.

---

## 📁 Estrutura do Projeto

```
📆 cadastro-usuarios
🔹 index.html         # Interface do usuário
🔹 index.js           # Servidor e rotas da API
🔹 users.json         # Banco de dados em JSON
🔹 package.json       # Configuração do projeto Node
🔹 .gitignore
```

---

## 🔐 Regras de Negócio

- O e-mail **deve ser único** para cada usuário.
- O ID é gerado automaticamente via timestamp (`Date.now()`).
- Os dados são persistidos no arquivo `users.json`.