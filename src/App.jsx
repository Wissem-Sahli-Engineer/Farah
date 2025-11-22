import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'


import Navigation from './Pages/Nav.jsx'
import HeroSection from './Pages/Hero.jsx'
import AboutHero from './Pages/About.-intro.jsx'
import Gallery from './Pages/Parallax-gallery.jsx'
import Home from './Pages/Pixel-img.jsx'
import TextAboutMe from './Pages/About-title.jsx'
import AboutImage from './Pages/About-photo.jsx'
import Horizontal from './Pages/Horizontal.jsx'
import DeviceBlock from './Pages/Device.jsx'
import Measurements from './Pages/Measurements.jsx'
import AnimatedLine from './Pages/Line.jsx'
import Contact from './Pages/Contact.jsx'
import Footer from './Pages/Footer.jsx'

import GalleryPage from './components/GalleryPage.jsx'

// Home page component
import { useLocation } from 'react-router-dom'

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    // If navigation included a target (like 'contact' or 'about'), scroll to it
    const target = location.state && location.state.target;
    if (target) {
      // small delay to ensure elements are mounted
      setTimeout(() => {
        const el = document.getElementById(target);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    // clear history state after handling
    // Note: do not modify history if not available
  }, [location]);

  return (
    <>
      <HeroSection />
      <div id="about"><AboutHero /></div>
      <Gallery />
      <Home />
      <TextAboutMe />
      <AboutImage />
      <Horizontal />
      <DeviceBlock />
      <div id="contact"><Measurements/></div>
      
      <div style={{ width : '50%', display : 'grid', margin :'50px auto'}}>
        <AnimatedLine />
      </div>

      <Contact />

      <Footer />
    </>
  )
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
      </Routes>
    </Router>
  )
}

export default App
