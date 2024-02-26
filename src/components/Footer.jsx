import React from 'react';
import './styles/Footer.css';

const Footer = () => {
    return (
        <footer className='d-flex justify-content-center'>
            <div className="logo-container">
                <div className="row">
                    <div className="col-12">
                        <div className="logoContainer">
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/static/wb-games-logo.svg" alt="WB Games Logo" />
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/static/netherrealm.svg" alt="NetherRealm Logo" />
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/static/ps5_tm.svg" alt="PS5 Logo" />
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/static/xbox-series-x-s.svg" alt="Xbox Series X/S Logo" />
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/static/nintendo-switch.svg" alt="Nintendo Switch Logo" />
                            <img className="footerItem" src="https://cdn-mk1.mortalkombat.com/ratings/esrb/esrb-rp-fob.svg" alt="ESRB Rating Pending Logo" />
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12 ">
                        <div className="footerText">
                            <p> Software MORTAL KOMBAT 1 © 2023 Warner Bros. Entertainment Inc. Desarrollado por NetherRealm Studios. Unreal® Engine, copyright 1998-2023 Epic Games, Inc. Unreal, Unreal Technology y el logotipo de Powered by Unreal Technology son marcas registradas o marcas comerciales de Epic Games, Inc. Utiliza la compresión de datos Oodle Copyright y Bink Video (C) 1997-2023 de RAD Game Tools, Inc. EL LOGOTIPO DE NETHERREALM STUDIOS, MORTAL KOMBAT, EL LOGOTIPO DEL DRAGÓN y todos los personajes y elementos relacionados son marcas registradas y © 2023 Warner Bros. Entertainment inc. </p>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;