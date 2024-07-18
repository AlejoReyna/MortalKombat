module.exports = async (req, res) => {
    console.log('Environment variables:', {
        DB_USER: process.env.DB_USER,
        DB_HOST: process.env.DB_HOST,
        DB_NAME: process.env.DB_NAME,
        DB_PORT: process.env.DB_PORT,
        EMAIL_USER: process.env.EMAIL_USER
    });

    try {

        console.log('Function started');

        if (req.method === 'POST') {
            const { email, resend } = req.body;
            console.log('Received request:', { email, resend });

            try {
                console.log('Connecting to database');
                const checkResult = await pool.query('SELECT * FROM preorders WHERE email = $1', [email]);
                console.log('Database query completed');

                if (checkResult.rows.length > 0 && !resend) {
                    return res.status(400).json({ message: 'Este correo ya está registrado', alreadyRegistered: true });
                }

                if (!checkResult.rows.length) {
                    console.log('Inserting new email');
                    await pool.query('INSERT INTO preorders (email) VALUES ($1)', [email]);
                }

                console.log('Preparing to send email');
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: 'Gracias por tu preorden',
                    text: '¡Gracias por preordenar Mortal Kombat! Pronto recibirás más información.'
                };

                await transporter.sendMail(mailOptions);
                console.log('Email sent successfully');

                res.status(200).json({ message: 'Preorden registrada con éxito y correo enviado' });
            } catch (error) {
                console.error('Error in main try block:', error);
                res.status(500).json({ message: 'Error al procesar la solicitud', error: error.message });
            }
        } else {
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
};