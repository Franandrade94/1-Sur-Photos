import './workgridcontent.css';
import React, { useEffect, useState } from 'react';
import WorksGrid from '../../content/3-WorksGrid';
import Videos from '../../content/5-Videos';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { ClipLoader } from 'react-spinners';
import 'react-lazy-load-image-component/src/effects/blur.css';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';

Modal.setAppElement('#root');

const WorkGrid = ({ selectedType, anchorRef }) => {

  const filteredWorks = WorksGrid.filter(work => work.Type === selectedType);
  const isTall = filteredWorks.length >= 7;
  const [entered, setEntered] = useState(false);
  const [loadedImages, setLoadedImages] = useState({});
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.innerWidth <= 768 && anchorRef) {
      document.body.style.overflow = 'hidden'; // evita scroll en background
      return () => {
        document.body.style.overflow = 'auto';
      };
    }
  }, [anchorRef]);

  useEffect(() => {
    filteredWorks.forEach(work => {
      const img = new Image();
      img.src = work.Image;
    });

    const timeout = setTimeout(() => setEntered(true), 10);
    return () => clearTimeout(timeout);
  }, [selectedType]);

  const handleImageLoad = (index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  };

  const openVideoModal = (name) => {
    const videoItem = Videos.find(video => video.Name === name && video.Type === 'VIDEO');
    if (videoItem) {
      setVideoUrl(videoItem.video);
      setModalIsOpen(true);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setVideoUrl(null);
  };

  return (
    <div className={`WorkGrid-Component ${selectedType === 'VIDEO' ? 'video-style' : 'default-style'} ${entered ? 'entered' : ''}`}>
      <div className={`WorkGrid-Container ${isTall ? 'tall-grid' : 'auto-grid'}`}>
        {filteredWorks.map((work, index) => (
          <div
            key={index}
            className='Workgrid-Items'
            onClick={() => {
              if (work.Type === 'VIDEO') {
                openVideoModal(work.Name);
              } else {
                navigate(`/photos/${encodeURIComponent(work.Name)}`);
              }
            }}
          >
            {!loadedImages[index] && (
              <div className="Spinner-Overlay">
                <ClipLoader size={35} color="#1c1c1b" />
              </div>
            )}
            <LazyLoadImage
              className='Workgrid-Image'
              alt={work.Name}
              src={work.Image}
              effect="blur"
              afterLoad={() => handleImageLoad(index)}
            />
            <div className="Workgrid-Overlay">
              <div className="Workgrid-Name">{work.Name}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para video */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className="Modal-Content"
        overlayClassName="Modal-Overlay"
      >
        {videoUrl && (
          <video controls autoPlay className="Modal-Video">
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el video.
          </video>
        )}
      </Modal>
    </div>
  );
};

export default WorkGrid;
