const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../db');

router.post('/register', async (req, res) => {
  try {
    const { email, username, full_name, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO users (email, username, full_name, password) VALUES (?, ?, ?, ?)',
      [email, username, full_name, hashedPassword]
    );

    res.status(201).json({ 
      message: 'Usuário criado com sucesso!',
      userId: result.insertId 
    });

  } catch (error) {
  console.log(error); 
  if (error.code === 'ER_DUP_ENTRY') {
    return res.status(400).json({ error: 'Email ou username já existe' });
  }
  res.status(500).json({ error: 'Erro ao criar usuário' });
}
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (users.length === 0) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const user = users[0];

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ error: 'Email ou senha incorretos' });
    }

    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        full_name: user.full_name
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

module.exports = router;