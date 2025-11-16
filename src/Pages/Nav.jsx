import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


// Animation variants
const transition = { duration: 1, ease: [0.76, 0, 0.24, 1] };

const opacity = {
  initial: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.35 } },
  closed: { opacity: 0, transition: { duration: 0.35 } }
};

const height = {
  initial: { height: 0 },
  enter: { height: "auto", transition },
  exit: { height: 0, transition }
};

const background = {
  initial: { height: 0 },
  open: { height: "100vh", transition },
  closed: { height: 0, transition }
};

const blur = {
  initial: { filter: "blur(0px)", opacity: 1 },
  open: { filter: "blur(4px)", opacity: 0.6, transition: { duration: 0.3 } },
  closed: { filter: "blur(0px)", opacity: 1, transition: { duration: 0.3 } }
};

const translate = {
  initial: { y: "100%", opacity: 0 },
  enter: (i) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: i[0] }
  }),
  exit: (i) => ({
    y: "100%",
    opacity: 0,
    transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: i[1] }
  })
};

// Navigation links data
const links = [
  { title: "Home", href: "/", src: "./img/Farah1.jpg" },
  { title: "About ME", href: "/about", src: "./img/Farah7.jpg" },
  { title: "Contact", href: "/contact", src: "./img/Farah11.jpg" },
];

// Body Component
function Body({ links, selectedLink, setSelectedLink, onClose }) {
  const getChars = (word) => {
    let chars = [];
    word.split("").forEach((char, i) => {
      chars.push(
        <motion.span 
          custom={[i * 0.02, (word.length - i) * 0.01]} 
          variants={translate} 
          initial="initial" 
          animate="enter" 
          exit="exit" 
          key={char + i}
        >
          {char}
        </motion.span>
      );
    });
    return chars;
  };

  const handleClick = (e, href) => {
    e.preventDefault();
    try {
      const url = new URL(href, window.location.origin);
      const targetPath = url.pathname;

      // Close nav immediately
      if (typeof onClose === 'function') onClose();

      // If target path is the same as current page -> smooth scroll
      if (targetPath === window.location.pathname) {
        // update history (optional) and smooth scroll to top
        try { window.history.pushState({}, '', href); } catch (err) {}
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Different page -> full navigation
        window.location.href = href;
      }
    } catch (err) {
      // fallback: close and navigate
      if (typeof onClose === 'function') onClose();
      window.location.href = href;
    }
  };

  return (
    <div className="nav-body">
      {links.map((link, index) => {
        const { title, href } = link;
        return (
          <a key={`l_${index}`} href={href} onClick={(e) => handleClick(e, href)}>
            <motion.p 
              onMouseOver={() => { setSelectedLink({ isActive: true, index }); }} 
              onMouseLeave={() => { setSelectedLink({ isActive: false, index }); }} 
              variants={blur} 
              animate={selectedLink.isActive && selectedLink.index !== index ? "open" : "closed"}
            >
              {getChars(title)}
            </motion.p>
          </a>
        );
      })}
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <div className="nav-footer">
      <ul>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span>Made by:</span>Wissem Sahli
        </motion.li>
      </ul>
      <ul>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span>Typography:</span> Google Fonts
        </motion.li>
      </ul>
      <ul>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          <span>Images:</span> ChatGPT-Sora
        </motion.li>
      </ul>
      <ul>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          Privacy Policy
        </motion.li>
        <motion.li custom={[0.3, 0]} variants={translate} initial="initial" animate="enter" exit="exit">
          Terms & Conditions
        </motion.li>
      </ul>
    </div>
  );
}

// Image Component
function Image({ src, isActive }) {
  return (
    <div className={`nav-image ${isActive ? 'active' : ''}`}>
      <img src={src} alt="Navigation preview" />
    </div>
  );
}

// Nav Component (the expanded navigation)
function Nav({ onClose }) {
  const [selectedLink, setSelectedLink] = useState({ isActive: false, index: 0 });

  return (
    <motion.div variants={height} initial="initial" animate="enter" exit="exit" className="nav-container">
      <div className="nav-wrapper">
        <div className="nav-content">
          <Body links={links} selectedLink={selectedLink} setSelectedLink={setSelectedLink} onClose={onClose} />
          <Footer />
        </div>
        <Image src={links[selectedLink.index].src} isActive={selectedLink.isActive} />
      </div>
    </motion.div>
  );
}

// Main Navigation Component
function Navigation() {
  const [isActive, setIsActive] = useState(false);
  // Fall back to no-router behavior: use window.location and a default empty cart
  const items = [];







  return (
    <div className="navigation-header">
      <div className="nav-bar">

        <div className="credits-top">
          <div className="btn btn-link btn-left-top">
            <a href="/index.html" className="btn-click magnetic" data-strength="20" data-strength-text="10">
              <span className="btn-text">
                <span className="credit"><span>©</span></span>
                <span className="cbd">
                  <span className="code-by">Model</span>
                  <span className="dennis"><span className="wissem">Farah</span> <span className="sahli">Laridhi</span></span>
                </span>
              </span>
            </a>
          </div>
        </div>
        
        <div onClick={() => { setIsActive(!isActive); }} className="nav-toggle">
          <div className={`nav-burger ${isActive ? 'active' : ''}`}></div>
          <div className="nav-label">
            <motion.p variants={opacity} animate={!isActive ? "open" : "closed"}>Nav</motion.p>
            <motion.p variants={opacity} animate={isActive ? "open" : "closed"}>Close</motion.p>
          </div>
        </div>
        <motion.div variants={opacity} animate={!isActive ? "open" : "closed"} className="nav-shop">
          <p
            className="shop-text"
            role="button"
            tabIndex={0}
            onClick={() => {
              // close nav then navigate to menu (no Router fallback)
              setIsActive(false);
              if (window.location.pathname === '/menu') {
                try { window.history.pushState({}, '', '/menu'); } catch (err) {}
                window.scrollTo({ top: 0, behavior: 'smooth' });
              } else {
                window.location.href = '/menu';
              }
            }}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.currentTarget.click(); } }}
          >Gallery</p>
        </motion.div>
      </div>
      <motion.div variants={background} initial="initial" animate={isActive ? "open" : "closed"} className="nav-backdrop" onClick={() => setIsActive(false)}></motion.div>
      <AnimatePresence mode="wait">
        {isActive && <Nav onClose={() => setIsActive(false)} />}
      </AnimatePresence>

      <style>{`
        /* Navigation Header Styles */
        .navigation-header {
          background-color: black;
          position: fixed;
          width: 100%;
          box-sizing: border-box;
          padding: 10px;
          z-index: 1000;
          top: 0;
          left: 0;
        }
        
        .nav-backdrop {
          background-color: white;
          opacity: 0.5;
          height: 100%;
          width: 100%;
          position: absolute;
          left: 0;
          top: 100%;
        }
        
        .nav-bar {
          display: flex;
          justify-content: center;
          text-transform: uppercase;
          font-size: 12px;
          font-weight: 400;
          position: relative;
          color : white;
        }
        
        .nav-bar a{
          color:white !important;
        }
        .nav-bar p {
          margin: 0px;
        }
        
        .nav-bar a {
          text-decoration: none;
          color: black;
          position: absolute;
          left: 0;
        }

        .btn-link.btn-left-top .btn-click::after {
          display: none;
        }

        .btn-link.btn-left-top .btn-text {
          display: flex;
          align-items: center;
          gap: 0.1em;
        }

        .btn-link.btn-left-top .credit {
          padding-right: .21em;
          display: inline-block;
        }

        .btn-link.btn-left-top .credit span {
          position: relative;
          display: inline-block;
          transform: translate(0, 0) rotate(0.001deg);
          transition: all 0.5s cubic-bezier(0.7, 0, 0.3, 1);
        }

        .btn-link.btn-left-top:hover .credit span {
          transform: translate(0, 0) rotate(360deg);
        }

        .btn-link.btn-left-top .cbd {
          overflow: hidden;
          position: relative;
        }

        .btn-link.btn-left-top .code-by {
          transform: translateX(0) rotate(0.001deg);
          position: relative;
          display: inline-block;
          transition: all .5s cubic-bezier(.7, 0, .3, 1);
        }

        .btn-link.btn-left-top:hover .code-by {
          transform: translateX(-3.7em) rotate(0.001deg);
        }

        .btn-link.btn-left-top .dennis {
          transform: translateX(0) rotate(0.001deg);
          position: relative;
          display: inline-block;
          padding-left: .21em;
          padding-right: .2em;
          transition: all .5s cubic-bezier(.7, 0, .3, 1);
        }

        .btn-link.btn-left-top:hover .dennis {
          padding-right: 2em;
          transform: translateX(-3.7em) rotate(0.001deg);
        }

        .btn-link.btn-left-top .snellenberg {
          position: absolute;
          opacity: 1;
          padding-left: .21em;
          transition: all .5s cubic-bezier(.7, 0, .3, 1);
          top: 0;
          left: 0;
          transform: translateX(3.25em);
          white-space: nowrap;
        }

        @media screen and (max-width: 540px){ 
          .btn-link.btn-left-top:hover .credit span {
            transform: translate(0, 0) rotate(0.001deg);
          }

          .btn-link.btn-left-top:hover .code-by {
            transform: translateX(0) rotate(0.001deg);
          }
            
          .btn-link.btn-left-top:hover .dennis {
            padding-right: .2em;
            transform: translateX(0) rotate(0.001deg);
          }

          .btn-link.btn-left-top .sahli {
            display: none;
          }

          .btn-link.btn-left-top .code-by {
            font-size: 0.85em;
          }

          .btn-link.btn-left-top .btn-text {
            gap: 0.05em;
            font-size: 0.9em;
          }
        } 
        
        .nav-shop {
          display: flex;
          gap: 30px;
          position: absolute;
          right: 0;
        }
        
        .shop-text {
          display: none;
        }
        
        .nav-toggle, .nav-cart {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
        }
        
        .nav-label {
          position: relative;
          display: flex;
          align-items: center;
        }
        
        .nav-label p:nth-of-type(2) {
          position: absolute;
          opacity: 0;
        }
        
        .nav-burger {
          width: 22.5px;
          position: relative;
          pointer-events: none;
        }
        
        .nav-burger::after, .nav-burger::before {
          content: "";
          height: 1px;
          width: 100%;
          background-color: white;
          position: relative;
          display: block;
          transition: all 1s cubic-bezier(0.76, 0, 0.24, 1);
        }
        
        .nav-burger::after {
          top: -4px;
        }
        
        .nav-burger::before {
          top: 4px;
        }
        
        .nav-burger.active::after {
          transform: rotate(45deg);
          top: -1px;
        }
        
        .nav-burger.active::before {
          transform: rotate(-45deg);
          top: 1px;
        }
        
        /* Navigation Container Styles */
        .nav-container {
          overflow: hidden;
          position: absolute;
          top: 100%;
          left: 0;
          width: 100%;
          background-color: #f4f0ea;
          z-index: 100;
        }
        
        .nav-wrapper {
          display: flex;
          gap: 50px;
          margin-bottom: 80px;
          padding: 20px;
        }
        
        .nav-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        
        /* Body Styles */
        .nav-body {
          display: flex;
          flex-wrap: wrap;
          margin-top: 40px;
        }
        
        .nav-body a {
          color: black;
          text-decoration: none;
          text-transform: uppercase;
        }
        
        .nav-body p {
          margin: 0px;
          display: flex;
          overflow: hidden;
          font-size: 32px;
          padding-right: 30px;
          padding-top: 10px;
          font-weight: 300;
        }
        
        /* Footer Styles */
        .nav-footer {
          display: flex;
          align-items: flex-end;
          flex-wrap: wrap;
          font-size: 12px;
          text-transform: uppercase;
          margin-top: 40px;
        }
        
        .nav-footer ul {
          width: 50%;
          margin-top: 10px;
          overflow: hidden;
          list-style-type: none;
          padding: 0;
        }
        
        .nav-footer li span {
          color: #9f9689;
        }
        
        .nav-footer li {
          color: black;
        }
        
        /* Image Styles */
        .nav-image {
          opacity: 0;
          transition: opacity 0.3s ease;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          display: flex;
          margin-right: 5%;
        }
        
        .nav-image.active {
          opacity: 1;
        }
        
        .nav-image img {
          max-width: 300px;
          height: auto;
        }

        .shop-text {
            display: block;
            cursor: pointer;
        }
        
        /* Media Queries */
        @media only screen and (min-width: 600px) {
          .navigation-header {
            padding: 20px;
          }
          
          .nav-bar {
            font-size: 15px;
          }
        }
        
        @media only screen and (min-width: 1000px) {
          .nav-wrapper {
            margin-bottom: 0px;
            justify-content: space-between;
          }
          
          .nav-body {
            max-width: 1200px;
            margin-top: 80px;
          }
          
          .nav-body p {
            font-size: 5vw;
            padding-right: 2vw;
          }
          
          .nav-footer {
            justify-content: space-between;
          }
          
          .nav-footer ul {
            width: auto;
          }
          .nav-cart svg path {
            stroke: white; 
          }
        }
      `}</style>
    </div>
  );
}

export default Navigation;