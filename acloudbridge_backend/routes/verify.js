const express = require('express');
const router = express.Router();
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: '{{ db_user }}',
    password: '{{ db_password }}',
    host: '{{ db_host }}',
    database: '{{ db_name }}',
    port: 5432,
});

router.get('/:token', async (req, res) => {
    try {
        const { token } = req.params;

        const result = await pool.query('UPDATE users SET verified = true, verification_token = null WHERE verification_token = $1 RETURNING *', [token]);

        if (result.rows.length === 0) {
            return res.status(400).json({ error: 'Invalid or expired token' });
        }

        res.json({ message: 'Account verified successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;