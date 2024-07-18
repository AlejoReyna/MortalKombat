// api/send-email.js
const { Pool } = require('pg');
const nodemailer = require('nodemailer');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = async (req, res) => {
    console.time('functionExecution');
    let client;
    try {
        console.log('Function started');
        client = await pool.connect();
        console.log('Database connected');

        const { email, resend } = req.body;

        // Aquí va tu lógica existente, por ejemplo, insertar en la base de datos
        const queryText = 'INSERT INTO preorders(email, resend) VALUES($1, $2)';
        await client.query(queryText, [email, resend]);
        console.log('Database query executed');

        // Configuración de nodemailer para enviar el correo
        let transporter = nodemailer.createTransport({
            service: 'hotmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        let mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Preorden Registrada',
            text: 'Tu preorden ha sido registrada con éxito. Gracias por tu interés.'
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');

        console.log('Function completed successfully');
        res.status(200).json({ message: 'Preorden registrada con éxito y correo enviado' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error interno del servidor', error: error.message });
    } finally {
        if (client) {
            client.release();
        }
        console.timeEnd('functionExecution');
    }
};