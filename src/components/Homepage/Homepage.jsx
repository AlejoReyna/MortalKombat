import React from 'react';
import './Homepage.css';
import Miniature from './gameplay.jpg';
import './animation.css';
import Logo from './Images/mk-logo.png';

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
                <div className="container-fluid d-flex second-page justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <h2> WATCH THE LAUNCH TRAILER </h2>  
                    
                            <a href="https://www.youtube.com/watch?v=jnVTPkCWzcI" target="blank"> <img src={ Miniature } alt="A preview of the video"/> </a>
                            
                            <p> Kombat mechanics never seen before </p>
                        </div>
                    </div>
                </div>
                {/** End of block of code for the second page */}


                {/** Block of code for the third page */}
                <div className="container-fluid third-page d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-6 left-side">
                            <div className="text">
                                <h2> Tus personajes favoritos, tal y como los viste la primera vez</h2>
                                
                                <p> Esta entrega te trae de regreso hacia el inicio de la saga, siguiendo los acontecimientos de la ultima entrega. </p>
                                

                                <p> Liu Kang se ha convertido en dios y la linea temporal ha sido alterada.</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/** End of block of code for the third page */}

                
                {/** Block of code for the fourth page */}
                <div className="container-fluid fourth-page d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div className="text">
                                <h2 className="title"> Shang Tsung disponible como personaje jugable.</h2>
                                <h2 className="title"> Exclusivo al preordenar </h2>
                                <button> Pre-ordena ahora </button>
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