import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Pool } from 'pg';

export async function POST(request) {
    let pool;
    try {
        pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: parseInt(process.env.DB_PORT, 10),
        });
        console.log('Pool configuration complete');

        await pool.query('SELECT NOW()');
        console.log('Database connection successful');

        console.log('Receiving request');
        const body = await request.json();
        console.log('Request body:', body);

        if (!body.email) {
            console.error('Email not provided in the request');
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const { email } = body;
        console.log('Email received:', email);

        // ... (resto de tus console.log para verificar variables de entorno) ...

        console.log('Creating transporter...');
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                ciphers: 'SSLv3'
            }
        });

        console.log('Transporter created, verifying...');
        await transporter.verify();
        console.log('Transporter verified successfully');

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Preorder Confirmation for Mortal Kombat 1',
            text: 'Thank you for your preorder of Mortal Kombat 1.',
            html: '<h1>Thank you for your preorder of Mortal Kombat 1</h1>'
        };

        let client;
        try {
            client = await pool.connect();
            await client.query('INSERT INTO preorders (email) VALUES ($1)', [email]);
            console.log('Email saved to database:', email);
        } finally {
            if (client) {
                client.release();
            }
        }

        console.log('Attempting to send email');
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);

        await pool.end();
        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Detailed error:', error);
        if (pool) {
            await pool.end();
        }
        return NextResponse.json({ error: 'Error processing request', details: error.message }, { status: 500 });
    }
}