import React, { useState } from 'react';
import './Homepage.css';
import './animation.css';
import { Link } from 'react-router-dom';
import bgVideo from './Images/bg-video.mp4';
import tsungVideo from './Images/cutted-clip.mp4';
import axios from 'axios';

const Homepage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isAlreadyRegistered, setIsAlreadyRegistered] = useState(false);

    const handlePreorderClick = () => {
        setShowPopup(true);
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setSuccessMessage('');
        setErrorMessage('');
        setEmail('');
        setIsAlreadyRegistered(false);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleFormSubmit = async (e, resend = false) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/send-email', { email, resend });
            console.log('Email sent!:', response.data);
            setSuccessMessage(response.data.message);
            setErrorMessage('');
            setIsAlreadyRegistered(false);
        } catch (error) {
            console.error('An error occurred:', error);
            if (error.response && error.response.data) {
                console.log(error.response.data.message);
                setErrorMessage(error.response.data.message);

                if (error.response.data.alreadyRegistered) {
                    setIsAlreadyRegistered(true);
                }
            } else {
                setErrorMessage('There has been an error sending the mail');
            }
        }
    };

    const handleSendAgain = () => {
        setSuccessMessage('');
        setEmail('');
        setIsAlreadyRegistered(false);
    };

    return (
        <div>
            <main>
                {/* Block of code for the first page */}
                <div className="container-fluid first-page min-vh-100 d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="title">
                                <h1 className='d-inline-block'>
                                    MORTAL
                                </h1>
                                <span className="number d-inline-block">
                                    1
                                </span>
                                <h1 className="d-inline-block">
                                    KOMBAT
                                </h1>
                                <h6 className='d-flex justify-content-center'>
                                    Presale now available
                                </h6>
                                <div className="d-flex justify-content-center">
                                    <button className='preorder-btn red-text' onClick={handlePreorderClick}> Preorder now!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of block of code for the first page */}

                <div className="container-fluid second-page d-flex flex-column vh-100">
                    <div className="row flex-grow-1">
                        <div className="col-12 p-0 moon-gif position-relative">
                            <video autoPlay loop muted className='w-100 fixed-video-height object-fit-cover'>
                                <source src={bgVideo} type="video/mp4" />
                            </video>
                            <div className="row w-100 mt-5">
                                <div className="col-2"></div>
                                <div className="col-8 p-0 text-white title mx-4">
                                    <div className="text-center golden-text description">
                                        After eons of peace between the realms,
                                        ideologies grow, bringing in mounting tensions between the realms.
                                        When a mysterious adversary arrives, Liu Kang soon realizes that not only are the
                                        realms in
                                        danger,
                                        but so is his new timeline and all of reality.
                                    </div>
                                    <div className="d-flex justify-content-center mt-3">
                                        <button className="trailer-btn">
                                            <Link to="https://www.youtube.com/watch?v=jnVTPkCWzcI" target="_blank"> View the
                                                full trailer</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Block of code for the fourth page */}
                <div className="container-fluid vh-100 d-flex flex-column other-bg p-0">
                    <div className="d-flex flex-column flex-md-row h-100">
                        <div className="w-100 w-md-50 h-md-100">
                            <video autoPlay loop muted className='w-100 h-100 object-fit-cover'>
                                <source src={tsungVideo} type="video/mp4" />
                            </video>
                        </div>
                        <div className="w-100 w-md-50 h-md-100 d-flex align-items-center">
                            <div className="text golden-text text-center w-100">
                                <h3 className="title">Shang Tsung available as playable character</h3>
                                <h5 className="title">Exclusive in preorder</h5>
                                <div className='button-container'>
                                    <button className='preorder-btn red-text' onClick={handlePreorderClick}> Preorder
                                        now!
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End of block of code for the fourth page */}
            </main>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content moon-gif h-50 d-flex flex-column justify-content-center align-items-center">
                        <button className="close-btn" onClick={handleClosePopup}>X</button>
                        <h2 className="golden-text mt-3 text-center">Pre-order Now</h2>
                        {successMessage ? (
                            <div className="text-center">
                                <p className="green-text">{successMessage}</p>
                                <button className="border-0 golden-text" onClick={handleClosePopup}>Close</button>
                                <button className="border-0 golden-text" onClick={handleSendAgain}>Send Again</button>
                            </div>
                        ) : isAlreadyRegistered ? (
                            <div className="text-center">
                                <p className="red-text">{errorMessage}</p>
                                <p>¿Deseas recibir el correo de nuevo?</p>
                                <button className="border-0 golden-text" onClick={(e) => handleFormSubmit(e, true)}>Sí, enviar de nuevo</button>
                                <button className="border-0 golden-text" onClick={handleClosePopup}>No, cerrar</button>
                            </div>
                        ) : (
                            <>
                                <label className="text-center">
                                    <p className="red-text">Type your email to receive a confirmation email</p>
                                </label>
                                <form onSubmit={handleFormSubmit} className="text-center">
                                    <label className="red-text">
                                        Email :
                                        <div className="w-100">
                                            <input
                                                type="email"
                                                className="text-center"
                                                value={email}
                                                onChange={handleEmailChange}
                                                required
                                            />
                                        </div>
                                    </label>
                                    <div className="mt-3">
                                        <button className="border-0 golden-text" type="submit">Submit</button>
                                    </div>
                                </form>
                                {errorMessage && !isAlreadyRegistered && (
                                    <div className="mt-3 text-center red-text">
                                        <p>{errorMessage}</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Homepage;