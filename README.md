# OT.A - Rede Social de Blog

Projeto de aprendizado para treinar conceitos de desenvolvimento full-stack, criando uma rede social focada em blog com sistema de autenticação completo.

## 🎯 Objetivo

Desenvolver uma aplicação web completa para praticar e consolidar conhecimentos em:
- Autenticação e segurança (JWT, Bcrypt)
- APIs RESTful
- Integração frontend-backend
- Banco de dados relacional
- CRUD completo

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** - Ambiente de execução JavaScript
- **Express** - Framework web para criação de APIs
- **MySQL** - Banco de dados relacional
- **mysql2** - Driver MySQL com suporte a Promises
- **Bcrypt** - Criptografia de senhas (hash)
- **JSON Web Token (JWT)** - Autenticação baseada em tokens
- **dotenv** - Gerenciamento de variáveis de ambiente
- **CORS** - Controle de acesso entre domínios
- **Nodemon** - Reinicialização automática do servidor (dev)

### Frontend
- **HTML5** - Estrutura das páginas
- **CSS3** - Estilização
- **Tailwind CSS** - Framework CSS utilitário
- **JavaScript (Vanilla)** - Lógica e requisições à API

### Ferramentas
- **MySQL Workbench** - Gerenciamento do banco de dados
- **Insomnia** - Testes de API

## 📁 Estrutura do Projeto

```
ot.a/
├── backend/
│   ├── routes/
│   │   └── auth.js          # Rotas de autenticação
│   ├── .env                 # Variáveis de ambiente
│   ├── db.js                # Conexão com MySQL
│   ├── server.js            # Servidor Express
│   └── package.json
│
└── frontend/
    └── login/
        ├── index.html       # Tela de login/cadastro
        ├── style.css        # Estilos
        └── script.js        # Lógica frontend
```

## 🗄️ Banco de Dados

### Tabela: users
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  full_name VARCHAR(100) NOT NULL,
  password VARCHAR(255) NOT NULL,
  bio TEXT NULL,
  avatar_url VARCHAR(255) NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## ⚙️ Configuração

### 1. Instalar dependências
```bash
cd backend
npm install
```

### 2. Configurar variáveis de ambiente (.env)
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ota
DB_PORT=3306
JWT_SECRET=token1234
PORT=3000
```

### 3. Criar banco de dados
```sql
CREATE DATABASE ota;
USE ota;
-- Execute o CREATE TABLE da tabela users
```

### 4. Iniciar servidor
```bash
npm run dev
```

## 🚀 Funcionalidades Implementadas

### ✅ Autenticação
- **Cadastro de usuário** (`POST /api/auth/register`)
  - Validação de email e username únicos
  - Hash de senha com Bcrypt (salt rounds: 10)
  - Retorna ID do usuário criado

- **Login** (`POST /api/auth/login`)
  - Validação de credenciais
  - Geração de token JWT (validade: 7 dias)
  - Retorna token e dados básicos do usuário

### 🎨 Interface
- Tela de login/cadastro responsiva
- Toggle entre formulários de login e cadastro
- Integração com API via Fetch
- Armazenamento de token no localStorage

## 📡 Endpoints da API

| Método | Endpoint | Descrição | Body |
|--------|----------|-----------|------|
| POST | `/api/auth/register` | Cadastra novo usuário | `{ email, username, full_name, password }` |
| POST | `/api/auth/login` | Autentica usuário | `{ email, password }` |

## 🔐 Segurança

- Senhas criptografadas com Bcrypt (nunca armazenadas em texto plano)
- Autenticação stateless com JWT
- Validação de duplicidade de email/username
- Proteção contra SQL injection (prepared statements)
- CORS configurado para requisições do frontend

## 📚 Conceitos Aprendidos

- Arquitetura REST
- Autenticação baseada em tokens
- Hashing de senhas
- Promises e async/await
- Conexão com banco de dados
- Middleware no Express
- Tratamento de erros
- Variáveis de ambiente
- Integração frontend-backend
