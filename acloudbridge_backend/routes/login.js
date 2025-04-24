// routes/login.js
const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
        const { username, password } = req.body; // 'username' here matches the frontend

        // Database query to get user by email (not username)
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [username]); // Use 'email'
        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Check if the account is deactivated
        if (!user.is_active) {
            return res.status(401).json({ error: 'Account deactivated' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        if (err.code === 'ECONNREFUSED') {
            res.status(500).json({ error: 'Database connection failed' });
        } else if (err.code === '22P02') {
            res.status(400).json({ error: 'Invalid UUID format' });
        } else if (err.code === '42P01') {
            res.status(500).json({ error: 'Database table not found.' });
        } else {
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

module.exports = router;