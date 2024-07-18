const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const nodemailer = require('nodemailer');


const app = express();
app.use(cors({
    origin: 'https://mortal-kombat-iota.vercel.app/'
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
        res.status(500).json({ message: 'Error al procesar la solicitud' });
    }
});

const PORT = process.env.SERVER_PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));