import React, { useState, useEffect, useRef } from 'react';
import BgOne from '../Images/bg-one.jpeg';
import BgTwo from '../Images/bg-two.png';
import BgThree from '../Images/bg-three.jpeg';

const BackgroundChanger = () => {

    // Array of images
    const images = [BgOne, BgTwo, BgThree];

    // State for the current image
    const [currentImage, setCurrentImage] = useState(images[0]);

    // Index for the current image
    const index = useRef(0);

    // Effect to change the image
    useEffect(() => {
        const changeImage = () => {
            setCurrentImage(images[index.current]);
            index.current = (index.current + 1) % images.length;
        };

        // Change the image every 5 seconds
        const interval = setInterval(changeImage, 2000);

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, [images]);

    // Render the component with the background image
    return (
        <div style={{ backgroundImage: `url(${currentImage})`, backgroundSize: 'cover', height: '100vh' }}>
        </div>
    );
};

export default BackgroundChanger;
