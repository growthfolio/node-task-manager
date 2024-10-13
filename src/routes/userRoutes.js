const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

router.post(
  '/register',
  [
    body('username')
      .trim()  
      .escape()
      .notEmpty().withMessage('Username is required'),
    body('password')
      .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Create a query object using toString() to ensure safe conversion
      const query = { username: username.toString() };
      let user = await User.findOne(query);
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      user = new User({ username, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = { user: { id: user.id } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.status(201).json({ token });
    } catch (err) {
      console.error('Error during user registration:', err.message);
      res.status(500).send('Server error');
    }
  }
);


router.post(
  '/login',
  [
    body('username')
      .trim()  
      .escape()
      .notEmpty().withMessage('Username is required'),
    body('password')
      .notEmpty().withMessage('Password is required')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
      // Create a query object using toString() to ensure safe conversion
      const query = { username: username.toString() };
      const user = await User.findOne(query);
      if (!user) {
        return res.status(400).json({ msg: 'Invalid credentials' });
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
  }
);

module.exports = router;
