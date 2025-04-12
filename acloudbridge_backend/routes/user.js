// user.js (or wherever you define your user routes)

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

// Assuming you have a PostgreSQL connection pool configured
const pool = new Pool({
    // Replace with your actual database connection details
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

// GET /user - Get user information
router.get('/', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Assuming your token payload includes userId

        // Fetch user data from the database
        const result = await pool.query(
            'SELECT first_name, last_name, email FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.json({
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
});

module.exports = router;