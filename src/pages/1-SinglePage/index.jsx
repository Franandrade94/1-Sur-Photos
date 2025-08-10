import './singlepage.css';
import React from 'react';
import Landing from '../../Section/1-Landing';
import Works from '../../Section/2-Works';
import Footer from '../../Section/3-Footer';
import CreatedBy from '../../Section/0-CreatedBy';

const SinglePage = ({ landingRef }) => {
  return (
    <div className='SinglePage-Component'>
      <Landing landingRef={landingRef} />
      <Works />
      <Footer/>
      <CreatedBy/>
    </div>
  );
};

export default SinglePage;
