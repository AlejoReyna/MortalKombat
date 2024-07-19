import React from 'react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className='flex justify-center'>
            <div className="logos">
                <ul className="flex list-none mt-3 justify-center space-x-4">
                    <li>
                        <Image
                            src="https://cdn-mk1.mortalkombat.com/static/wb-games-logo.svg"
                            alt="WB Games Logo"
                            width={100}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="https://cdn-mk1.mortalkombat.com/static/netherrealm.svg"
                            alt="NetherRealm Logo"
                            width={100}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="https://cdn-mk1.mortalkombat.com/static/ps5_tm.svg"
                            alt="PS5 Logo"
                            width={100}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="https://cdn-mk1.mortalkombat.com/static/xbox-series-x-s.svg"
                            alt="Xbox Series X/S Logo"
                            width={100}
                            height={50}
                        />
                    </li>
                    <li>
                        <Image
                            src="https://cdn-mk1.mortalkombat.com/static/nintendo-switch.svg"
                            alt="Nintendo Switch Logo"
                            width={100}
                            height={50}
                        />
                    </li>
                </ul>

                <div className="text-center mt-4 text-sm text-gray-600">
                    <p className="mb-2">
                        This React project was created by Alexis Alberto Reyna Sánchez as a portfolio piece to showcase
                        coding skills.
                    </p>
                    <p className="mb-2">
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
}