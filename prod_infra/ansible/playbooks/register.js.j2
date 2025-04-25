const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
require('dotenv').config();

const pool = new Pool({
  user: '{{ db_user }}',
  password: '{{ db_password }}',
  host: '{{ db_host }}',
  database: '{{ db_name }}',
  port: 5432,
});

router.post('/', async (req, res) => {
  try {
    console.log("Received data:", req.body); // Log request data

    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Input Validation
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Check for existing user
    const existingUser = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store User Data (without verification token)
    await pool.query(
      'INSERT INTO users (first_name, last_name, email, password, verified) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, email, hashedPassword, true] // Set verified to true
    );

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    console.error("Database error:", err); // Log the error
    res.status(500).json({ error: 'Database error', details: err.message }); // Send error details
  }
});

module.exports = router;