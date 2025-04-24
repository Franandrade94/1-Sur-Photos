import './footer.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram } from "react-icons/fa";


const Footer = () => {

    const Navigate = useNavigate()

    return(
        <div className='Footer-Component'>
            <div className='P-Container'>
                <p>SUR.CREATIVOSVISUALES@GMAIL.COM</p>
            </div>
            <div className='Icons-Container'>
                <div className='Icons'>
                    <FaFacebookF/>
                </div>
                <div className='Icons'>
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