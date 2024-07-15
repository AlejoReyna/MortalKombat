import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className='d-flex justify-content-center '>
            <div className="logos ">
                <ul className="d-flex list-unstyled mt-3 justify-content-center">
                    <li>
                        <img className="logo-img" src="https://cdn-mk1.mortalkombat.com/static/wb-games-logo.svg"
                             alt="WB Games Logo"/>
                    </li>

                    <li>
                        <img className="logo-img" src="https://cdn-mk1.mortalkombat.com/static/netherrealm.svg"
                             alt="NetherRealm Logo"/>
                    </li>

                    <li>
                        <img className="logo-img" src="https://cdn-mk1.mortalkombat.com/static/ps5_tm.svg"
                             alt="PS5 Logo"/>
                    </li>

                    <li>
                        <img className="logo-img" src="https://cdn-mk1.mortalkombat.com/static/xbox-series-x-s.svg"
                             alt="Xbox Series X/S Logo"/>
                    </li>

                    <li>
                        <img className="logo-img" src="https://cdn-mk1.mortalkombat.com/static/nintendo-switch.svg"
                             alt="Nintendo Switch Logo"/>
                    </li>
                </ul>

                <div className="text-center footer-disclaimer">
                    <p>
                        This React project was created by Alexis Alberto Reyna Sánchez as a portfolio piece to showcase
                        coding skills.
                    </p>
                    <p>
                        I am not affiliated with any of the companies mentioned here, nor do I own any of the visual
                        elements presented.
                    </p>
                    <p>
                        This website is for demonstration purposes only and is not for commercial use. All rights
                        reserved to their respective owners.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;