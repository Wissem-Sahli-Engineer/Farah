import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const AboutImage = () => {
  const arrowRef = useRef(null);
  const imageRef = useRef(null);
  const overlayRef = useRef(null);
  const textRefs = useRef([]);

  useEffect(() => {
    // Initialize GSAP ScrollTrigger based parallax (desktop only)
    const initAnimations = () => {
      if (window.innerWidth > 720) {
        // Arrow rotation animation (unchanged)
        if (arrowRef.current && imageRef.current) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: imageRef.current,
              start: "15% 100%",
              end: "100% 0%",
              scrub: 0,
            }
          });

          tl.to(arrowRef.current, {
            rotate: 60,
            ease: "none"
          }, 0);
        }

        // Image overlay parallax using ScrollTrigger (replaces data-scroll-speed)
        if (overlayRef.current && imageRef.current) {
          gsap.to(overlayRef.current, {
            y: -200,
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            }
          });
        }

        // Text parallax effects using ScrollTrigger (replaces data-scroll-speed)
        textRefs.current.forEach((textEl) => {
          if (textEl && imageRef.current) {
            gsap.to(textEl, {
              y: -80,
              ease: 'none',
              scrollTrigger: {
                trigger: imageRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              }
            });
          }
        });
      }
    };

    initAnimations();

    // Handle resize - reinitialize animations
    const handleResize = () => {
      ScrollTrigger.refresh();
      // Re-init animations on resize to handle breakpoint changes
      setTimeout(initAnimations, 100);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Add text elements to refs array for parallax
  const addToTextRefs = (el) => {
    if (el && !textRefs.current.includes(el)) {
      textRefs.current.push(el);
    }
  };

  const styles = `
    .about-image {
      padding-top: calc(var(--section-padding, 10vw) * .75);
      padding-bottom: 0;
      background: var(--color-white, #ffffff);
      position: relative;
      padding-bottom : 100px;
    }

    .about-image .bottom-lightgray {
      position: absolute;
      bottom: 0;
      width: 100%;
      height: var(--section-padding, 10vw);
      left: 0;
      background: var(--color-lightgray, #f5f5f5);
      height: 10vw;
      display: none;
    }

    .about-image .container {
      max-width: var(--container-max-width, 1200px);
      margin: 0 auto;
      padding: 0 var(--container-padding, 2rem);
    }

    .about-image .row {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -calc(var(--container-padding, 2rem) / 2);
    }

    .about-image .flex-col {
      padding: 0 calc(var(--container-padding, 2rem) / 2);
      box-sizing: border-box;
    }

    .about-image .flex-col:nth-child(1) {
      width: 35%;
      padding-left: var(--container-padding, 2rem);
      padding-right: calc(var(--container-padding, 2rem) / 2);
      position: relative;
      top: 100px;
    }

    .about-image .flex-col:nth-child(1) p {
      margin-top: -.33em;
      display: block;
      will-change: transform;
      color: var(--color-dark, #000000);
    }

    .about-image .flex-col:nth-child(1) .arrow {
      position: absolute;
      left: 0;
      transform: rotate(-45deg);
      will-change: transform;
    }

    .about-image .flex-col:nth-child(1) .arrow svg g {
      stroke: var(--color-dark, #000000);
    }

    .about-image .flex-col:nth-child(2) {
      width: 65%;
    }

    .single-about-image {
      width: 100%;
      display: block;
      background: transparent;
      overflow: hidden;
      position: relative;
    }

    /* 3D transform optimization for smoother parallax */
    .single-about-image {
      transform-style: preserve-3d;
    }

    .single-about-image::before {
      content: "";
      display: block;
      padding-top: 135%;
    }

    .single-about-image .overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .single-about-image .overlay.overlay-image {
      background: url("/img/Farah11.jpg") center center no-repeat;
      background-size: cover;
      height: 105%;
      transform: translate3d(0, 0, 0);
      will-change: transform;
    }

    .single-about-image .overlay:nth-child(2) {
      background: url("/img/Farah11.jpg") center center no-repeat;
      display: none;
    }

    .animate-dot {
      animation: dotPulse 1.5s infinite;
      opacity: 0;
    }

    .animate-dot:nth-child(1) {
      animation-delay: 0s;
    }

    .animate-dot:nth-child(2) {
      animation-delay: 0.2s;
    }

    .animate-dot:nth-child(3) {
      animation-delay: 0.4s;
    }

    @keyframes dotPulse {
      0%, 20% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }

      /* Removed Locomotive-scroll attributes: using GSAP ScrollTrigger instead */

    @media screen and (max-width: 840px) {
      .about-image .flex-col:nth-child(1) {
        width: 45%;
        padding-right: calc(var(--container-padding, 2rem) / 1);
      }
      
      .about-image .flex-col:nth-child(2) {
        width: 55%;
      }

      .single-about-image::before {
        padding-top: 125%;
      }
    }

    @media screen and (max-width: 840px) {
      .about-image {
        padding-top: calc(var(--section-padding, 10vw) * .85);
      }

      .about-image .flex-col:nth-child(1) {
        width: unset;
        padding: 0;
        margin-left: calc(var(--container-padding, 2rem) / 1);
        padding-right: calc(var(--container-padding, 2rem) / 1);
        padding-top: calc(var(--section-padding, 10vw) / 4);
        width: 100%;
      }

      .about-image .flex-col:nth-child(1) p {
        max-width: 100%;
      }
      
      .about-image .flex-col:nth-child(2) {
        padding-top: calc(var(--section-padding, 10vw) / 1.15);
        width: 100%;
      }

      .about-image .flex-col:nth-child(1) .arrow {
        top: calc(var(--section-padding, 10vw) / -4);
        transform: rotate(0deg) translateY(-50%);
      }

      .about-image .bottom-lightgray {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: var(--section-padding, 10vw);
        left: 0;
        background: var(--color-lightgray, #f5f5f5);
        height: 60vw;
        display: block;
      }
    }

    
    .animate-dot {
   opacity: 0;
   animation: animateDot1 2s linear infinite;
}

.animate-dot:nth-child(2) {
   animation: animateDot2 2s linear infinite;
}

.animate-dot:nth-child(3) {
   animation: animateDot3 2s linear infinite;
}

@keyframes animateDot1 {
   0%   {opacity: 0; }
   20%  {opacity: 0;}
   30%  {opacity: 1;}
   90% {opacity: 1;}
}

@keyframes animateDot2 {
   0%   {opacity: 0; }
   35%  {opacity: 0;}
   45%  {opacity: 1;}
   90% {opacity: 1;}
}

@keyframes animateDot3 {
   0%   {opacity: 0; }
   50%  {opacity: 0;}
   60%  {opacity: 1;}
   90% {opacity: 1;}
}

    @media screen and (max-width: 720px) {
      .about-image .flex-col:nth-child(1) .arrow {
        /* Disable arrow animation on mobile */
        transform: rotate(-45deg) !important;
      }
    }

    @media screen and (max-width: 540px) {
      .single-about-image::before {
        padding-top: 125%;
        padding-top: 140%;
      }

      .single-about-image .overlay.overlay-image {
        width: 130%;
        left: -30%;
        width: 100%;
        left: 0;
        top: -18%;
        height: 120%;
      }

      .about-image .flex-col:nth-child(1) {
        margin-left: 0;
        padding-right: 0;
      }

      .about-image .flex-col:nth-child(2) {
        padding-top: calc(var(--section-padding, 10vw) * .5);
      }
      .about-image .row {
        gap: 70px;
      }
    }
  `;

  const ArrowIcon = () => (
    <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <title>arrow-up-right</title>
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Artboard" transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
          <g id="arrow-up-right" transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
            <polyline id="Path" points="2.76923077 0 12 0 12 9.23076923"></polyline>
            <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
          </g>
        </g>
      </g>
    </svg>
  );

  return (
    <>
      <style>{styles}</style>
      <section className="section about-image once-in">
        <div className="bottom-lightgray"></div>
        <div className="container">
          <div className="row">
            <div className="flex-col">
              <div className="arrow" ref={arrowRef}>
                <ArrowIcon />
              </div>
              <p 
                ref={addToTextRefs}
              >
                Born and raised in tunisia , 21 years old
                young lady passionate about modelling ,
                she has 3 years of experience in this
                domain both nationally and internationally.
                <br />
                <br />
                She has worked with major brands and
                done many compaigns but her power is
                found in runways with her strong walk ,
                long legs and confidence she rocks every
                runway.
                <br />
                <br />
                Farah is a very dedicated and
                professional model that faced a lot of
                obstacles to get where she is now, she is
                a warrior !
                <br />
                <br />

              </p>
              <p 
                ref={addToTextRefs}
              >
                <span style={{ opacity: .5, display: 'block', paddingTop: '.5em' }}>
                  Always exploring
                  <span className="animate-dot">.</span>
                  <span className="animate-dot">.</span>
                  <span className="animate-dot">.</span>
                </span>
              </p>
            </div>
            <div className="flex-col">
              <div className="single-about-image" ref={imageRef}>
                <div 
                  className="overlay overlay-image" 
                  ref={overlayRef}
                ></div>
                <div className="overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutImage;