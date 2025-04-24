import './landing.css';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'react-lazy-load-image-component/src/effects/blur.css';
import Logo from '../../assets/images/0-Logo/Logo-White.png';
import SliderImgs from '../../content/1-Slider';
import { Helmet } from 'react-helmet';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const Landing = ({ landingRef }) => {


    const sliderSettings = {
      dots: false,
      arrows: false,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 4000,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      pauseOnHover: false,
      cssEase: 'ease-in-out',
    };

    const handleImageLoad = (e) => {
        e.target.classList.add('loaded');
    };

    return (
        <div className='Landing-Component' ref={landingRef}>
            <Helmet>
                <link rel="preload" href={Logo} as="image" />
                {SliderImgs.map((image, index) => (
                    <link 
                        key={index} 
                        rel="preload" 
                        href={ image.Image } 
                        as="image" 
                    />
                ))}
            </Helmet>

            <div className='Logo-Landing-Container'>
                <img alt='Logo' src={Logo} />
            </div>

            <div className='Slider-Container'>
                <Slider {...sliderSettings}>
                    {SliderImgs.map((image, index) => (
                        <div key={index} className='Slider-Img-Container'>
                            <LazyLoadImage 
                                className="Slider-Img"
                                alt={`Slide ${index}`} 
                                src={ image.Image }
                                effect="blur"
                                onLoad={handleImageLoad}
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Landing;