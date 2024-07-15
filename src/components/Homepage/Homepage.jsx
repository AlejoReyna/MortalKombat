import React, { useEffect, useState} from 'react';
import './Homepage.css';
import './animation.css';
import { Link } from 'react-router-dom';
import bgVideo from './Images/bg-video.mp4';


const Homepage = () => {
    const [isScrolling, setIsScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (!isScrolling) {
                setIsScrolling(true);
                window.scrollTo({
                    top: window.innerHeight,
                    behavior: 'smooth'
                });
                setTimeout(() => setIsScrolling(false), 1000);
            }
        };

        window.addEventListener('wheel', handleScroll);
        window.addEventListener('touchmove', handleScroll);

        return () => {
            window.removeEventListener('wheel', handleScroll);
            window.removeEventListener('touchmove', handleScroll);
        };
    }, [isScrolling]);

    return (
        <body>
        <main>

            {/** Block of code for the first page */}
                <div className="container-fluid first-page  d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="title">

                                <h1 className='d-inline-block'> MORTAL </h1>  <span
                                className="number d-inline-block"> 1 </span> <h1
                                className="d-inline-block"> KOMBAT </h1>
                                <h6 className='d-flex justify-content-center'>Presale now available</h6>
                                <div className="d-flex justify-content-center">
                                    <button className='preorder-btn'><Link to="/preorder"> Preorder now! </Link>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            {/** End of block of code for the first page */}

            <div className="container-fluid second-page d-flex flex-column vh-100">
                <div className="row flex-grow-1">
                    <div className="col-12 p-0">
                        <video autoPlay loop muted className='w-100 h-75 object-fit-cover'>
                            <source src={bgVideo} type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <div className="row flex-grow-1">
                    <div className="col-12 p-0 ">
                    </div>
                </div>
            </div>

            {/** Block of code for the fourth page */}
            <div className="container-fluid fourth-page d-flex justify-content-center align-items-center">
                <div className="row">
                    <div className="col-12">
                        <div className="text">
                            <h2 className="title d-flex justify-content-center"> Shang Tsung availabe as playable
                                character</h2>
                            <h2 className="title d-flex justify-content-center"> Exclusive to pre-order </h2>

                            <div className='button-container d-flex justify-content-center'>
                                <button> Pre-ordena ahora</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/** End of block of code for the fourth page */}

        </main>
        </body>
    );
};

export default Homepage;