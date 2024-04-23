import React from 'react';
import './Homepage.css';
import './animation.css';
import { Link } from 'react-router-dom';
import Preview from './Images/preview.png';
import bgVideo from './Images/bg-video.mp4';

const Homepage = () => {
    return (
        <body>
            <main>

                {/** Block of code for the first page */}
                <div className="container-fluid first-page  d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="title">
                                
                                <h1 className='d-inline-block'> MORTAL </h1>  <span className="number d-inline-block"> 1 </span> <h1 className="d-inline-block"> KOMBAT </h1> 
                                <h6 className='d-flex justify-content-center'>Presale now available</h6>
                                    <div className="d-flex justify-content-center">
                                        <button className='preorder-btn'> <Link to="/preorder"> Preorder now! </Link>  </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/** End of block of code for the first page */}


                {/** Block of code for the second page */}
                <div className="container-fluid second-page">
                    <div className="row h-100">
                        <div className="col-12 description-title d-flex justify-content-center align-items-center">
                            Liu Kang has become crazy af!
                            {/** 
                            <h2> WATCH THE LAUNCH TRAILER </h2>  
                    
                            <Link href="https://www.youtube.com/watch?v=jnVTPkCWzcI" target="blank"/> <img src={ Miniature } alt="A preview of the video"/> </a>
                            
                            <p> Kombat mechanics never seen before </p>
    **/}
                        </div>

                        <div className="row">
                            <div className="col-sm-6-md-">
                                <figure>
                                <img className="preview" src={ Preview  } alt="The preview of the trailer"/>
                                <figcaption> Click to watch the trailer </figcaption>
                                </figure>
                            </div>
                            <div className="col-sm-6-md-12">
                                <p className="description"> 
                                After winning control of the Hourglass, Liu Kang becomes the Keeper of Time, forging a New Era. 
                                Peace between realms is disrupted by mounting tensions and a mysterious adversary. 
                                Liu Kang realizes that not only are the realms in danger, but so is his new timeline and all of reality.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/** End of block of code for the second page */}

                {/** Begining of the third page */}
                <div className="container-fluid third-page d-flex">
                    <div className="row">
                        <div className="col-12">
                            <video autoPlay loop muted className='img-fluid'>
                            
                                <source src={ bgVideo } type="video/mp4"/>
                            </video>

                        </div>
                    </div>
                </div>
                
                {/** Block of code for the fourth page */}
                <div className="container-fluid fourth-page d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="text">
                                <h2 className="title d-flex justify-content-center"> Shang Tsung availabe as playable character</h2>
                                <h2 className="title d-flex justify-content-center"> Exclusive to pre-order </h2>
                            
                                <div className='button-container d-flex justify-content-center' >
                                <button> Pre-ordena ahora </button>
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