const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const pool = new Pool({
    user: '{{ db_user }}',
    password: '{{ db_password }}',
    host: '{{ db_host }}',
    database: '{{ db_name }}',
    port: 5432,
});

router.delete('/', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        console.log("Token from deactivate.js:", token); // Add this line
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Decoded Token:", decoded); // Add this line
        const userId = decoded.userId;

        await pool.query('UPDATE users SET is_active = false WHERE id = $1', [userId]);

        res.json({ message: 'Account deactivated successfully' });
    } catch (err) {
        console.error("Error in deactivate.js:", err); // Add this line
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({ error: 'Invalid token' });
        }
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;