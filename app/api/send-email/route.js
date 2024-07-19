import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
    try {
        console.log('Receiving request');
        const { email } = await request.json();
        console.log('Email received:', email);

        console.log('Checking environment variables:');
        console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
        console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
        console.log('EMAIL_USER:', process.env.EMAIL_USER);
        console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
        // No imprimas EMAIL_PASS por razones de seguridad

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
        try {
            await transporter.verify();
            console.log('Transporter verified successfully');
        } catch (verifyError) {
            console.error('Transporter verification failed:', verifyError);
            throw verifyError;
        }

        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'Preorder Confirmation for Mortal Kombat 1',
            text: 'Thank you for your preorder of Mortal Kombat 1.',
            html: '<h1>Thank you for your preorder of Mortal Kombat 1</h1>'
        };

        console.log('Attempting to send email');
        try {
            const info = await transporter.sendMail(mailOptions);
            console.log('Email sent successfully:', info.response);
        } catch (sendError) {
            console.error('Error sending email:', sendError);
            throw sendError;
        }

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error) {
        console.error('Detailed error:', error);
        return NextResponse.json({ error: 'Error sending email', details: error.message }, { status: 500 });
    }
}