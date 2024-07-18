const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
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

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { email, resend } = req.body;

    try {
        const checkResult = await pool.query('SELECT * FROM preorders WHERE email = $1', [email]);

        if (checkResult.rows.length > 0 && !resend) {
            return res.status(400).json({ message: 'Este correo ya está registrado', alreadyRegistered: true });
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

        res.status(200).json({ message: 'Preorden registrada con éxito y correo enviado' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
    }
};