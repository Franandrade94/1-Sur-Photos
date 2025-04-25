import './works.css';
import React, { useRef, useState, useEffect } from 'react';
import WorksContent from '../../content/2-Works';
import WorkGrid from '../../components/3-WorkGrid';



const Works = () => {
  const [selectedWorkId, setSelectedWorkId] = useState(null);
  const worksRefs = useRef({});

  useEffect(() => {
    const scrollToId = sessionStorage.getItem('scrollTargetId');
    if (scrollToId && worksRefs.current[scrollToId]) {
      setTimeout(() => {
        worksRefs.current[scrollToId].scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50); // Muy rápido
      sessionStorage.removeItem('scrollTargetId'); // Limpiamos después
    }
  }, []);

  const handleSelect = (id) => {
    setSelectedWorkId((prevId) => (prevId === id ? null : id));
  };

  const selectedWork = WorksContent.find((work) => work.Id === selectedWorkId);
  const reorderedWorks = selectedWorkId ? [selectedWork] : WorksContent;

  return (
    <div className='Works-Component'>
      <div className='Works-Container'>
        {reorderedWorks.map((work, index) => {
          if (selectedWorkId && work.Id !== selectedWorkId) return null;
          return (
            <div
              id={work.Id}
              key={index}
              ref={(el) => (worksRefs.current[work.Id] = el)}
              className='Work-Item'
              onClick={() => handleSelect(work.Id)}
            >
              <img src={work.Image} alt={work.Name} className='Work-Image' />
              <div className="Work-Overlay">
                <div className="Work-Name">{work.Name}</div>
              </div>
            </div>
          );
        })}
      </div>

      {selectedWorkId && (
        <WorkGrid
          selectedTypeId={selectedWorkId}
          selectedType={selectedWork.Type}
          anchorRef={worksRefs.current[selectedWorkId]}
        />
      )}
    </div>
  );
};

export default Works;

