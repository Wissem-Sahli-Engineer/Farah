import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Splitting function to split text into words and characters
const splitText = (element) => {
  if (!element) return;
  
  const text = element.textContent;
  const words = text.split(' ');
  
  element.innerHTML = words.map(word => {
    const chars = word.split('').map(char => 
      `<span class="char">${char}</span>`
    ).join('');
    return `<span class="word">${chars}</span>`;
  }).join(' ');
};

export const TextAboutMe = () => {
  const effect6Ref = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Split the text
    if (effect6Ref.current) {
      splitText(effect6Ref.current);
    }

    // Effect 6 Animation
    if (effect6Ref.current) {
      const words = [...effect6Ref.current.querySelectorAll(".word")];

      for (const word of words) {
        const chars = word.querySelectorAll(".char");

        chars.forEach((char) => gsap.set(char.parentNode, { perspective: 2000 }));

        gsap.fromTo(
          chars,
          {
            willChange: "opacity, transform",
            opacity: 0,
            y: (position, _, arr) => -40 * Math.abs(position - arr.length / 2),
            z: () => gsap.utils.random(-1500, -600),
            rotationX: () => gsap.utils.random(-500, -200)
          },
          {
            ease: "power1.inOut",
            opacity: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            stagger: {
              each: 0.06,
              from: "center"
            },
            scrollTrigger: {
              trigger: word,
              start: "top bottom",
              end: "top top+=25%",
              scrub: true
            }
          }
        );
      }
    }

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
        }

        .text-about-container {
          width: 100%;
          min-height: 100vh;
          background: transparent;
        }

        .sectionTXT {
          width: 100%;
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
        }

        .contentTXT {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
        }

        .heading-effect6 {
          font-size: clamp(3rem, 8vw, 8rem);
          font-weight: 900;
          text-align: center;
          color: #FFFFFF;
          line-height: 1.2;
          margin: 0;
          padding: 0;
        }

        .word {
          display: inline-block;
          white-space: nowrap;
          margin-right: 0.3em;
        }

        .char {
          display: inline-block;
          transform-style: preserve-3d;
        }


        @media (max-width: 768px) {
          .heading-effect6 {
            font-size: clamp(2rem, 6vw, 6rem);
          }

          .section {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      <div className="text-about-container" ref={containerRef}>
        {/* Effect 6 - Name */}
        <div className="sectionTXT">
          <div className="contentTXT">
            <h2 ref={effect6Ref} className="heading-effect6">
              ~GET TO KNOW FARAH~
            </h2>
          </div>
        </div>

        
      </div>
    </>
  );
};

export default TextAboutMe;