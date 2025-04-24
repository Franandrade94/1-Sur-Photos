import './navbar.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/images/0-Logo/Logo-Black.png';

const NavBar = ({ className, landingRef }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
        
        setTimeout(() => {
            if (landingRef?.current) {
                landingRef.current.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100); 
    };

    return (
        <div className={className}>
            <div className='NavBar-Container'>
                <img
                    className='NavBar-Logo'
                    alt='logo'
                    src={Logo}
                    onClick={handleLogoClick}
                    style={{ cursor: 'pointer' }}
                />

                <div className='NavBar-Content'>
                    <h3>PHOTO & VIDEO</h3>
                    <p>Based in Panamá</p>
                </div>
            </div>
        </div>
    );
};

export default NavBar;
