const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const router = express.Router();

// 🛡️ Middleware para validar e sanitizar entradas
const validateUser = [
  body('username').trim().escape().notEmpty().withMessage('Username is required'),
  body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
      .escape(),
];

// 📝 Register Route
router.post('/register', validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    let userExists = await User.findOne({ username: { $eq: username } });

    if (userExists) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // 🔒 Evita indicar que o usuário já existe
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({ username, password: hashedPassword });

    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error('Error during user registration:', err.message);
    res.status(500).send('Server error');
  }
});

// 📝 Login Route
router.post('/login', validateUser, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: { $eq: username } });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' }); // 🔒 Evita indicar que o usuário não existe
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error('Error during user login:', err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
