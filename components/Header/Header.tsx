"use client"

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './Header.css';
import Logo from '@/public/Images/Navbar/mk1-logo.webp';

export default function Navbar() {
    return (
        <nav className="flex items-center">
            <div className="container mx-auto px-4">
                <Link href="/" className="navbar-brand">
                    <Image
                        className="w-auto h-10"
                        src={Logo}
                        alt="Mortal Kombat logo"
                        width={100}
                        height={40}
                    />
                </Link>
            </div>
        </nav>
    );
}