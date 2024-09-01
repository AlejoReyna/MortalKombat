import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import './Homepage.css';
import './animation.css';

export default function Homepage() {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    
    const handlePreorderClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/send-email',
                { email },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log('Correo enviado:', response.data);
            alert('Correo enviado con éxito');
            setShowPopup(false);
        } catch (error) {
            console.error('Error enviando el correo:', error);
            alert('Hubo un error enviando el correo');
        }
    };

    return (
        <div>
            <main>
                {/* First page */}
                <div className="container-fluid first-page min-h-screen flex justify-center items-center">
                    <div className="text-center">
                        <div className="title">
                            <h1 className="inline-block text-6xl font-bold">
                                MORTAL
                                <span className="number inline-block mx-2 text-7xl">1</span>
                                KOMBAT
                            </h1>
                        <h6 className="mt-4">Presale now available</h6>
                        </div>
                        <button
                            className="mt-6 px-6 py-2 preorder-btn rounded-lg hover:bg-red-700"
                            onClick={handlePreorderClick}
                        >
                            Preorder now!
                        </button>
                    </div>
                </div>

                {/* Second page */}
    <div className="flex flex-col h-screen">
      <div className="h-1/2 w-full relative">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src='/bg-video.mp4' type="video/mp4"/>
        </video>
      </div>
      <div className="moon-gif h-1/2 w-full bg-black flex items-center justify-center">
        <div className="text-center text-white max-w-2xl mx-auto">
          <p className="text-red-500 mb-4 title">
            After eons of peace between the realms,
            ideologies grow, bringing in mounting tensions between the realms.
            When a mysterious adversary arrives, Liu Kang soon realizes that not only are the
            realms in danger, but so is his new timeline and all of reality.
          </p>
          <Link href="https://www.youtube.com/watch?v=jnVTPkCWzcI" target="_blank"
            className="inline-block px-4 py-2   rounded preorder-btn">
            View the full trailer
          </Link>
        </div>
      </div>
    </div>

                {/* Fourth page */}
                <div className="container-fluid  h-screen flex flex-col md:flex-row">
                    <div className="w-full md:w-1/2 h-full">
                        <video autoPlay loop muted className="w-full h-full object-cover">
                            <source src='/cutted-clip.mp4' type="video/mp4"/>
                        </video>
                    </div>
                    <div className="third-page w-full md:w-1/2 h-full flex items-center bg-black">
                        <div className="text-center w-full text-red-500 title">
                            <h3 className="text-3xl font-bold mb-2">Shang Tsung available as playable character</h3>
                            <h5 className="text-xl mb-6">Exclusive in preorder</h5>
                            <button
                                className="preorder-btn px-6 py-2 rounded-lg hover:bg-red-700"
                                onClick={handlePreorderClick}
                            >
                                Pre-order now
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showPopup && (
                <div className="popup fixed inset-0  flex justify-center items-center">
                    <div className="popup-content bg-black p-8 rounded-lg">
                        <button className="float-right text-xl" onClick={handleClosePopup}>X</button>
                        <h2 className="text-2xl mb-4">Pre-order Now</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label className="block mb-2">
                                Email:
                                <input
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    required
                                    className="text-black w-full px-2 py-1 border rounded"
                                />
                            </label>
                            <button
                                type="submit"
                                className="w-full mt-4 px-4 py-2  rounded preorder-btn"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}