import './footer.css';
import React from 'react';
import { FaFacebookF, FaInstagram } from "react-icons/fa";


const Footer = () => {

    const handleInstagram = () => {
        window.open('https://www.instagram.com/sur.fv?igsh=MWMxNmF1YmdjaWRwZA==')
    }

    const handleFacebook = () => {
        window.open('https://www.facebook.com/sur.fotografiayvideo')
    }

    return(
        <div className='Footer-Component'>
            <div className='P-Container'>
                <p>SUR.CREATIVOSVISUALES@GMAIL.COM</p>
            </div>
            <div className='Icons-Container'>
                <div className='Icons' onClick={ handleFacebook }>
                    <FaFacebookF/>
                </div>
                <div className='Icons' onClick={ handleInstagram } >
                    <FaInstagram/>
                </div>
            </div>
            <div className='P-Container'>
                <p>+507 6624 9400</p>
            </div>
        </div>
    );

};

export default Footer;