import React, { useEffect, useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Lenis Smooth Scroll Implementation
class Lenis {
  constructor() {
    this.animatedScroll = 0;
    this.targetScroll = 0;
    this.actualScroll = 0;
    this.velocity = 0;
    this.direction = 0;
    this.isScrolling = false;
    this.time = 0;
    
    this.options = {
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
      wheelMultiplier: 1
    };
    
    this.setupScrollListener();
  }
  
  setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.actualScroll = window.pageYOffset;
      this.targetScroll = this.actualScroll;
    });
  }
  
  raf(time) {
    const deltaTime = time - (this.time || time);
    this.time = time;
    
    if (Math.abs(this.targetScroll - this.animatedScroll) > 0.1) {
      this.animatedScroll += (this.targetScroll - this.animatedScroll) * this.options.lerp;
      this.velocity = this.animatedScroll - this.actualScroll;
      this.direction = Math.sign(this.velocity);
    }
  }
}

const HorizontalScrollSection = () => {
  const lenisRef = useRef(null);

  useEffect(() => {
    lenisRef.current = new Lenis();
    
    const raf = (time) => {
      lenisRef.current.raf(time);
      requestAnimationFrame(raf);
    };
    
    requestAnimationFrame(raf);
  }, []);

  return (
    <main className="main">
      <Section1 />
      <Section2 />
      <Section3 />
    </main>
  );
};

const Section1 = () => {
  return (
    <div className="container1">
      <div className="images">
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811158/Farah14_d4q11i.webp" 
            alt="Farah"
          />
        </div>
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811412/Farah15_kj9yng.webp" 
            alt="Farah"
          />
        </div>
      </div>
      <div className="body">
        <div className="header">
          <h1>THE NEW FACE</h1>
          <h2>OF YOUR AGENCY</h2>
        </div>
        <p>FashionModel - Actress</p>
      </div>
    </div>
  );
};

const Section2 = () => {
  const containerRef = useRef(null);
  const contextRef = useRef(null);

  const setHorizontalSection = () => {
    if (!containerRef.current) return;
    
    contextRef.current = gsap.context(() => {
      gsap.to(containerRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=2500px",
          scrub: true,
          pin: true,
          pinSpacing: true,
          ease: "none"
        },
        x: `-${containerRef.current.scrollWidth - window.innerWidth}px`
      });
    });
  };

  useLayoutEffect(() => {
    setHorizontalSection();

    const handleResize = () => {
      if (contextRef.current) {
        contextRef.current.revert();
      }
      setHorizontalSection();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (contextRef.current) {
        contextRef.current.revert();
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="container2">
      <div className="intro">
        <div className="header">
          <h2>Some Project :</h2>
          <p>I’ve had the chance to work across a range of creative projects, including campaigns for GVSTUDIO and FIRM, a test shoot for KK GV, and runway moments at Tunis Fashion Week.</p>
        </div>
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811083/Farah3_qtazio.webp" 
            alt="Scenic view"
          />
        </div>
      </div>
      
      <div className="double">
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811414/Farah16_wakngi.webp" 
            alt="Portrait 1"
          />
        </div>
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811412/Farah17_vkybim.webp" 
            alt="Portrait 2"
          />
        </div>
      </div>
      
      <div className="description">
        <p>My experience also includes a jewelry campaign for Niki Paris, editorials for ESMOD’s Perle Noire featured in SCHÖN Magazine, and the Wild Horses project for TNFW. I’ve collaborated on commercial photoshoots for Taobao and UMBRA, strengthening my versatility across fashion, editorial, and brand-focused work.</p>
      </div>
      
      <div className="end">
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811424/Farah20_raizlr.webp" 
            alt="Landscape"
          />
        </div>
        <div className="imageContainer">
          <img 
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811420/Farah18_jlzx6u.webp" 
            alt="Nature"
          />
        </div>
      </div>
    </div>
  );
};

const Section3 = () => {
  return (
    <div className="container3">
      <div className="imageContainer">
        <img 
          src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811414/Farah21_mxpgn7.webp" 
          alt="Final image"
        />
      </div>
      <div className="body">
        <h2>Farah Laridhi</h2>
        <p style={{marginBottom :'50px'}}>I’m now ready for new collaborations, bringing my experience, discipline, and passion to every project. Confident, versatile, and dedicated, I’m open to working with brands, designers, and creative teams looking for a professional model who delivers impact and presence.</p>
        
        <a
          className="style_button1__YwofB"
          tabIndex={0}
          href="/public/files/farah aridhi portfolio 2.pdf"
          download
          style={{textDecoration :'none'}}
        >
          <div className="style_round__Du95J"></div>
          <p className="style_title__W0TuT">
              Portfolio
          </p>
          <div className="style_arrow__ComPi">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M15.7071 8.70711C16.0976 8.31658 16.0976 7.68342 15.7071 7.29289L9.34315 0.928932C8.95262 0.538408 8.31946 0.538408 7.92893 0.928932C7.53841 1.31946 7.53841 1.95262 7.92893 2.34315L13.5858 8L7.92893 13.6569C7.53841 14.0474 7.53841 14.6805 7.92893 15.0711C8.31946 15.4616 8.95262 15.4616 9.34315 15.0711L15.7071 8.70711ZM0 9H15V7H0V9Z" fill="white"></path>
              </svg>
          </div>
          </a>

      </div>
    </div>
  );
};

export default function Horizontal() {
  return (
    <>
      <style>{`

      .style_button1__YwofB {
    position: relative;
    display: flex;
    align-items: center;
    gap: 15px;
    cursor: pointer;
    background-color: #fff;
    border-radius: 25px;
    padding: 20px 35px;
    overflow: hidden;
    height: 50px;
    color: Black;
    border: 1px solid #000;
    width: 175px;
}

.style_button1__YwofB .style_round__Du95J {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #000;
    transition: all .3s ease-out
}

.style_button1__YwofB .style_title__W0TuT {
    margin: 0;
    font-size: 16px;
    transition: all .3s ease-out;
    z-index: 2
}

.style_button1__YwofB .style_arrow__ComPi {
    position: absolute;
    left: 100%;
    transition: transform .3s ease-out;
    z-index: 2;
    top: 18px
}

.style_button1__YwofB:hover .style_round__Du95J {
    transform: scale(40);
    background-color: black
}

.style_button1__YwofB:hover .style_title__W0TuT {
    color: #fff;
    transform: translateX(-25px)
}

.style_button1__YwofB:hover .style_arrow__ComPi {
    transform: translateX(-50px)
}
.style_button1__YwofB:hover {
    border: 1px solid white;
}


        .main {
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 150px;
          margin-bottom: 50px;
          overflow-x: hidden;
          width: 100%;
          padding-top: 50px;
        }

        /* Section 1 */
        .container1 {
          width: 100%;
          padding: 0 20px;
        }

        .container1 .images {
          display: flex;
          gap: 20px;
        }

        .container1 .images .imageContainer {
          position: relative;
          height: 500px;
          overflow: hidden;
        }

        .container1 .images .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container1 .images .imageContainer:first-of-type {
          width: 30%;
          min-width: 600px;
        }

        .container1 .images .imageContainer:nth-of-type(2) {
          width: 70%;
        }

        .container1 .body .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-top: 20px;
        }

        .container1 .body .header h1 {
          font-size: 64px;
          line-height: 64px;
          font-weight: 700;
          margin: 0;
        }

        .container1 .body .header h2 {
          font-size: 40px;
          line-height: 40px;
          font-weight: 700;
          margin: 0;
        }

        .container1 .body p {
          font-size: 16px;
          margin-top: 10px;
        }

        /* Section 2 - Horizontal Scroll */
        .container2 {
          height: 80vh;
          display: flex;
          gap: 100px;
          padding-top: 10vh;
          padding-left: 20px;
        }

        .container2 .intro {
          width: 80vw;
          height: 100%;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .container2 .intro .header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          white-space: normal;
          margin-bottom: 20px;
        }

        .container2 .intro .header h2 {
          font-size: 40px;
          font-weight: 700;
          margin: 0;
          width: 100%;
        }

        .container2 .intro .header p {
          font-size: 16px;
          line-height: 1.6;
        }

        .container2 .intro .imageContainer {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .container2 .intro .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container2 .double {
          display: flex;
          flex-flow: nowrap;
          gap: 20px;
          height: 100%;
          width: 120vw;
          flex-shrink: 0;
        }

        .container2 .double .imageContainer {
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
        }

        .container2 .double .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container2 .description {
          height: 100%;
          width: 30vw;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .container2 .description p {
          font-size: 16px;
          line-height: 1.6;
        }

        .container2 .end {
          display: flex;
          flex-direction: row;
          gap: 50px;
          width: 60vw;
          flex-shrink: 0;
          padding-right: 50px;
        }

        .container2 .end .imageContainer {
          position: relative;
          width: 50%;
          height: 100%;
          overflow: hidden;
        }

        .container2 .end .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container2 .end .imageContainer:first-of-type {
          height: 40%;
          align-self: flex-start;
        }

        /* Section 3 */
        .container3 {
          width: 100%;
          display: flex;
          align-items: center;
          padding: 0 20px;
          gap: 50px;
        }

        .container3 .imageContainer {
          position: relative;
          width: 30%;
          height: 70vh;
          max-height: 1200px;
          overflow: hidden;
        }

        .container3 .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .container3 .body {
          width: 40%;
          max-width: 600px;
        }

        .container3 .body h2 {
          font-size: 40px;
          font-weight: 700;
          margin: 0 0 20px 0;
        }

        .container3 .body p {
          font-size: 16px;
          line-height: 1.6;
        }

        @media (max-width: 768px) {
          .container1 .images {
            flex-direction: column;
          }

          .container1 .images .imageContainer:first-of-type {
            width: 100%;
            min-width: auto;
          }

          .container1 .images .imageContainer:nth-of-type(2) {
            width: 100%;
          }

          .container1 .body .header {
            flex-direction: column;
            align-items: flex-start;
          }

          .container1 .body .header h1 {
            font-size: 40px;
            line-height: 40px;
          }

          .container1 .body .header h2 {
            font-size: 24px;
            line-height: 24px;
          }

          .container2 .intro .header {
            flex-direction: column;
          }

          .container2 .intro .header h2 {
            font-size: 28px;
          }

          .container3 {
            flex-direction: column;
          }

          .container3 .imageContainer,
          .container3 .body {
            width: 100%;
          }
          .container2 .description p {
            line-height: 1.2;
          }
        }
      `}</style>
      <HorizontalScrollSection />
    </>
  );
}