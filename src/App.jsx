import { useState } from 'react'
import './App.css'

import Navigation from './Pages/Nav.jsx'
import HeroSection from './Pages/Hero.jsx'
import AboutHero from './Pages/About.-hero.jsx'
import Gallery from './Pages/Gallery1.jsx'
import Home from './Pages/Pixel-img.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>

      <Navigation />
      <HeroSection />
      <AboutHero />
      <Gallery />
      <Home />

      <div style={{height:'100vh'}}></div>

    </>
  )
}

export default App
