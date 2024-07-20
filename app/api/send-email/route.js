import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
});

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export async function POST(request) {
    try {
        console.log('Receiving request');
        const { email, resend } = await request.json();
        console.log('Email received:', email);

        // Check if email already exists in the database
        const checkResult = await pool.query('SELECT * FROM preorders WHERE email = $1', [email]);
        if (checkResult.rows.length > 0 && !resend) {
            return NextResponse.json({ message: 'This email is already registered', alreadyRegistered: true }, { status: 400 });
        }

        // Insert email into database if it doesn't exist
        if (!checkResult.rows.length) {
            await pool.query('INSERT INTO preorders (email) VALUES ($1)', [email]);
            console.log('Email saved to database:', email);
        }

        // Prepare and send email
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Thank you for your preorder of Mortal Kombat 1',
            text: 'Thank you for preordering Mortal Kombat 1! You will receive more information soon.',
            html: '<h1>Thank you for preordering Mortal Kombat 1!</h1><p>You will receive more information soon.</p>'
        };

        console.log('Attempting to send email');
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);
        } catch (sendError) {
            console.error('Error sending email:', sendError);
            throw sendError;
        }

        return NextResponse.json({ message: 'Preorder registered successfully and email sent' }, { status: 200 });
    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({ error: 'Error processing request', details: error.message }, { status: 500 });
    }
}