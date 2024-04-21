import React from 'react';
import './Homepage.css';
import './animation.css';
import { Link } from 'react-router-dom';
import Preview from './Images/preview.png';
const Homepage = () => {
    return (
        <body>
            <main>

                {/** Block of code for the first page */}
                <div className="container-fluid first-page  d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="title">
                                
                                <h1> MORTAL <span id="number"> 1 </span> KOMBAT </h1> 
                                <h6 className='d-flex justify-content-center'>Presale now available</h6>
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
                            <div className="col-6 d-flex justify-content-center align-items-center">
                                <figure>
                                <img className="preview" src={ Preview  } alt="The preview of the trailer"/>
                                <figcaption> Click to watch the trailer </figcaption>
                                </figure>
                            </div>
                            <div className="col-6">
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

                
                {/** Block of code for the fourth page */}
                <div className="container-fluid fourth-page d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="text">
                                <h2 className="title"> Shang Tsung disponible como personaje jugable.</h2>
                                <h2 className="title"> Exclusivo al preordenar </h2>
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