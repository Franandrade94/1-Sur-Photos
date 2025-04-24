import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import NavBar from './components/1-Navbar';
import SinglePage from './pages/1-SinglePage';
import AllPhoto from './pages/2-Photos';
import ScrollToTop from './components/0-Scroll/index'
import Whatsapp from './components/0-WhatsappIcon';


function App() {
  
  const [showNav, setShowNav] = useState(true);
  const landingRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') return;
  
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );
  
    if (landingRef.current) {
      observer.observe(landingRef.current);
    }
  
    return () => {
      if (landingRef.current) {
        observer.unobserve(landingRef.current);
      }
    };
  }, [landingRef, location.pathname]);

  return (
    <div className='App'>
      <NavBar className={`NavBar-Component ${!showNav ? 'hidden' : ''}`} landingRef={landingRef} />
      <Whatsapp/>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<SinglePage landingRef={landingRef} />} />
        <Route path="/photos/:name" element={<AllPhoto />} />
      </Routes>
    </div>
  );
}

export default App;
