import React, { useEffect, useState } from 'react';
import ScrollTxt from './Infinite-scroll.jsx';
import Globe from './Globe.jsx';


const MaskEntry = ({ imageSrc = './img/farah_hero.jpg' }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [textFaded, setTextFaded] = useState(false);
  const [showSlider, setShowSlider] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    const timer = setTimeout(() => setIsAnimating(true), 200); // Small delay to ensure render
    return () => clearTimeout(timer);
  }, []);

  // After mask animation starts, fade out text and show slider after ~1s
  useEffect(() => {
    if (!isAnimating) return;
    const t = setTimeout(() => {
      setTextFaded(true);
      setShowSlider(true);
    }, 1500);
    return () => clearTimeout(t);
  }, [isAnimating]);

  return (
    <>
      <style jsx>{`
        .container {
          display: flex;
          height: 100vh;
          justify-content: center;
          align-items: center;
          background-color: #000;
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        .textContainer {
          display: flex;
          gap: 3vw;
          color: #fff;
          font-size: 10vw;
          position: absolute;
          z-index: 10;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          transition: opacity 0.7s ease-in-out, transform 0.7s ease-in-out;
          opacity: 1;
        }

        .textContainer.fade-out {
          opacity: 0;
          transform: translate(-50%, -30%);
        }
        .textContainer span {
          display: block;
        }
        .imageContainer {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .imageContainer img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          display: block;
        }
        
        
        .text-right{
          font-size: 8vw;
          position: relative;
          top: 2vw;
        }
        /* Fade-in for the infinite scroll slider when mounted */
        .container .sliderContainer {
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out;

        }

        .container.animate .sliderContainer {
          opacity: 1;
          transform: translateY(0);
        }
        .animate .text-left {
          animation: textLeft 1.25s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .animate .text-right {
          animation: textRight 1.25s cubic-bezier(0.76, 0, 0.24, 1) forwards;
        }
        .animate .imageContainer {
          animation: maskReveal 1.3s cubic-bezier(0.76, 0, 0.3, 1) forwards; /* Averaged duration/ease for approximation */
        }
        @keyframes textLeft {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-70%);
          }
        }
        @keyframes textRight {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(70%);
          }
        }
        @keyframes maskReveal {
          from {
            clip-path: polygon(50% 25%, 50% 35%, 50% 75%, 50% 65%);
          }
          to {
            clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
      `}</style>
      <main className={`container ${isAnimating ? 'animate' : ''}`}>
        <h1 className={`textContainer ${textFaded ? 'fade-out' : ''}`}>
          <span className="text-left">Farah</span>
          <span className="text-right">Laridhi</span>
        </h1>
        <div className="imageContainer">
          <img src={imageSrc} alt="Masked background" />
        </div>

        {showSlider && <ScrollTxt /> }
        <Globe />
      </main>
    </>
  );
};

export default MaskEntry;