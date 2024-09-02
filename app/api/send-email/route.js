import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    console.log('Receiving request');
    const body = await request.json();
    console.log('Request body:', body);

    if (!body.email) {
      console.error('Email not provided in the request');
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { email } = body;
    console.log('Email received:', email);

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
        ciphers: 'SSLv3',
      },
    });

    console.log('Transporter created, verifying...');
    await transporter.verify();
    console.log('Transporter verified successfully');

    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Preorder Confirmation for Mortal Kombat 1',
      text: 'Thank you for your preorder of Mortal Kombat 1.',
      html: '<p>Thank you for your preorder of Mortal Kombat 1</p>',
    };

    console.log('Attempting to send email');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Detailed error:', error);
    return NextResponse.json({ error: 'Error processing request', details: error.message }, { status: 500 });
  }
}