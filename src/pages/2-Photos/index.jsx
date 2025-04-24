import './allphoto.css';
import Photos from '../../content/4-Photos';
import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Modal from 'react-modal';
import Footer from '../../Section/3-Footer';
import { ClipLoader } from 'react-spinners';

Modal.setAppElement('#root');

const AllPhoto = () => {
  const { name } = useParams();
  const filteredPhotos = Photos.filter(photo => photo.Type === name);

  const [touchEndX, setTouchEndX] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [loading, setLoading] = useState(true);

  const preloadImages = (photos) => {
    return Promise.all(
      photos.map(photo => {
        return new Promise(resolve => {
          const img = new Image();
          img.src = photo.Image;
          img.onload = resolve;
          img.onerror = resolve;
        });
      })
    );
  };

  useEffect(() => {
    const timeout = new Promise(resolve => setTimeout(resolve, 5000));

    Promise.race([
      preloadImages(filteredPhotos),
      timeout
    ]).then(() => {
      setLoading(false);
    });
  }, [filteredPhotos]);

  const openModal = (index) => {
    setCurrentIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const showNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  const showPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [filteredPhotos.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!modalIsOpen) return;
      if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modalIsOpen, showNext, showPrev]);

  const handleTouchStart = (e) => {
    setTouchStartX(e.changedTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.changedTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    if (distance > 50) showNext();
    if (distance < -50) showPrev();
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <>
      {loading ? (
        <div className="Spinner-FullScreen">
          <ClipLoader size={50} color="#1c1c1b" />
        </div>
      ) : (
        <div className="Masonry-Container">
          {filteredPhotos.map((photo, index) => (
            <div key={index} className="Masonry-Item" onClick={() => openModal(index)}>
              <div className="Image-Wrap">
                <LazyLoadImage
                  src={photo.Image}
                  alt={`${photo.Type} - ${index}`}
                  effect="blur"
                  className="Masonry-Image"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal-Content"
        overlayClassName="Modal-Overlay"
      >
        <img
          src={filteredPhotos[currentIndex].Image}
          alt="Preview"
          className="Modal-Image"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </Modal>

      <Footer />
    </>
  );
};

export default AllPhoto;
