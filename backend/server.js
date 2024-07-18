require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL || 'https://mortal-kombat-iota.vercel.app',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.send('Mortal Kombat API is running');
});

app.use((req, res) => {
    res.status(404).send('Not Found');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to database');
    release();
});

console.log('Environment variables:', {
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    FRONTEND_URL: process.env.FRONTEND_URL
});

app.post('/send-email', async (req, res) => {
    const { email, resend } = req.body;

    try {
        const checkResult = await pool.query('SELECT * FROM preorders WHERE email = $1', [email]);

        if (checkResult.rows.length > 0 && !resend) {
            return res.status(400).json({ message: 'Este correo ya está registrado',  alreadyRegistered: true });
        }

        if (!checkResult.rows.length) {
            await pool.query('INSERT INTO preorders (email) VALUES ($1)', [email]);
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Gracias por tu preorden',
            text: '¡Gracias por preordenar Mortal Kombat! Pronto recibirás más información.'
        };

        await transporter.sendMail(mailOptions);

        res.json({ message: 'Preorden registrada con éxito y correo enviado' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));