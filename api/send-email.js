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

app.post('/send-email', async (req, res) => {
    const { email, resend } = req.body;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid email address' });
    }
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
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));