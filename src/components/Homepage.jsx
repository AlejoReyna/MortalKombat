import React from 'react';
import './styles/Homepage.css';

const Homepage = () => {
    return (
        <body>
            <main>

                {/** Block of code for the first page */}
                <div className="container-fluid first-page  d-flex justify-content-center align-items-center">
                    <div className="row">
                        <div className="col-12">
                            <div clasName="title">
                                <h1> MORTAL <span id="number"> 1 </span> KOMBAT </h1>
                                <h6>Preventa ya disponible</h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/** End of block of code for the first page */}

                {/** Block of code for the second page */}
                <div className="container-fluid second-page  d-flex justify-content-center align-items-center">
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
                {/** End of block of code for the second page */}


            </main>
        </body>
    );
};

export default Homepage;