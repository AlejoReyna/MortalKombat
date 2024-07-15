import React, { useEffect, useState} from 'react';
import './Homepage.css';
import './animation.css';
import { Link } from 'react-router-dom';
import bgVideo from './Images/bg-video.mp4';
import tsungVideo from './Images/cutted-clip.mp4';


const Homepage = () => {

    {/**
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
**/}
    return (
        <body>
        <main>

            {/** Block of code for the first page */}
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
                                <button className='preorder-btn'> Preorder now!
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            {/** End of block of code for the first page */}

            <div className="container-fluid second-page d-flex flex-column vh-100">
                <div className="row flex-grow-1">
                    <div className="col-12 p-0 moon-gif position-relative">


                        <video autoPlay loop muted className='w-100 fixed-video-height object-fit-cover'>
                            <source src={bgVideo} type="video/mp4"/>
                        </video>

                        <div className="row w-100 mt-5">

<div className="col-2">

</div>
                            <div className="col-8 p-0 text-white title mx-4">
                                <div className="text-center red-text description">
                                    After eons of peace between the realms,
                                    ideologies grow, bringing in mounting tensions between the realms.
                                    When a mysterious adversary arrives, Liu Kang soon realizes that not only are the
                                    realms in
                                    danger,
                                    but so is his new timeline and all of reality.
                                </div>
                                <div className="d-flex justify-content-center mt-3">
                                    <button className="trailer-btn">
                                        <Link to="https://www.youtube.com/watch?v=jnVTPkCWzcI" target="_blank"> View the full trailer</Link>
                                    </button>
                                </div>
                            </div>




                        </div>

                    </div>
                </div>

            </div>


            {/** Block of code for the fourth page */}
            <div className="container-fluid min-vh-100 d-flex flex-column other-bg">
                <div className="row">
                    <div className="col-6 p-4 px-0">
                        <video autoPlay loop muted className='w-100  fixed-video-height object-fit-cover'>
                            <source src={tsungVideo} type="video/mp4"/>
                        </video>
                    </div>
                    <div className="col-6 p-0 ">

                        <div className="text red-text text-center">
                            <h3 className="title d-flex justify-content-center"> Shang Tsung availabe as playable
                                character</h3>
                            <h5 className="title d-flex justify-content-center"> Exclusive in preorder </h5>

                            <div className='button-container d-flex justify-content-center'>
                                <button className="preorder-btn"> Pre-ordena ahora</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            {/** End of block of code for the fourth page */}

        </main>
        </body>
    )
        ;
};

export default Homepage;