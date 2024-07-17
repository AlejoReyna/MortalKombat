const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config({ path: __dirname + '/.env' });

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

const app = express();
const port = process.env.PORT || 5001;

app.use(bodyParser.json());

// Configurar CORS para permitir solicitudes desde http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000' // Cambia esto al origen de tu frontend
}));

// Configurar Nodemailer para usar Outlook
const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false, // true para port 465, false para otros puertos
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Endpoint para enviar el correo
app.post('/send-email', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Gracias por tu preorden',
        text: '¡Gracias por preordenar Mortal Kombat! Pronto recibirás más información.'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error enviando el correo:', error); // Agrega logs para mayor detalle
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Correo enviado: ' + info.response);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});