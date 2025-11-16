import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './globe.css';

// Register plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const Globe = () => {
  const globeRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    if (!globeRef.current) return;

    const triggerElement = document.querySelector('main');
    if (!triggerElement) return;

    gsap.to(globeRef.current, {
      rotate: 90,
      ease: "none",
      scrollTrigger: {
        trigger: triggerElement,
        start: "100% 100%",
        end: "100% 0%",
        scrub: 0,
      }
    });

  }, { scope: containerRef });

  return (
    <div className="overlay get-height once-in once-in-secondary" ref={containerRef}>
      <div className="hanger">
        <p>
          <span>Located </span>
          <span>in 𖡡 </span>
          <span>Tunisia, Tunis</span>
        </p>
        
        <svg 
          width="300px" 
          height="121px" 
          viewBox="0 0 300 121" 
          version="1.1" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Combined Shape</title>
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(0.000000, -366.000000)" fill="#1C1D20">
              <g transform="translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)">
                <g transform="translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)">
                  <path d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z"></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        
        <div className="digital-ball">
          <div className="overlay"></div>
          <div className="globe" ref={globeRef}>
            <div className="globe-wrap">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle-hor"></div>
              <div className="circle-hor-middle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;