const express = require('express');
const { Pool } = require('pg');
require('dotenv').config();
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');
const verifyRoute = require('./routes/verify');
const deactivateRoute = require('./routes/deactivate');

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Backend server is running!');
});

app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/verify', verifyRoute);
app.use('/deactivate', deactivateRoute);

app.get('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

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

app.put('/changepassword', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { currentPassword, newPassword } = req.body;

        const userResult = await pool.query('SELECT password FROM users WHERE id = $1', [userId]);
        if (userResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        const storedPassword = userResult.rows[0].password;
        const passwordMatch = await bcrypt.compare(currentPassword, storedPassword);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Incorrect current password' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, userId]);

        res.setHeader('Content-Type', 'application/json');
        res.json({ message: 'Password changed successfully' });

    } catch (err) {
        console.error(err);
        res.setHeader('Content-Type', 'application/json');
        return res.status(500).json({ error: 'Internal server error' });
    }
});

app.put('/user', async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId;

        const { first_name, last_name, email } = req.body;

        const result = await pool.query(
            'UPDATE users SET first_name = $1, last_name = $2, email = $3 WHERE id = $4',
            [first_name, last_name, email, userId]
        );

        if (result.rowCount > 0) {
            res.json({ message: 'User updated successfully' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(401).json({ error: 'Invalid token' });
    }
});

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD
    }
});

app.post('/send-email', (req, res) => {
    const { fullName, emailAddress, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: 'New Contact Form Submission',
        text: `
            Full Name: ${fullName}
            Email Address: ${emailAddress}
            Message: ${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).send('Error sending email');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Email sent successfully');
        }
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});