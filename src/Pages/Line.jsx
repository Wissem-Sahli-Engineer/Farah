'use client'
import { useRef, useEffect, useState } from 'react';

function AnimatedLine() {
  const path = useRef(null);
  const containerRef = useRef(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  let progress = 0;
  let x = 0.5;
  let time = Math.PI / 2;
  let reqId = null;

  useEffect(() => {
    setPath(progress);
    
    const handleResize = () => {
      setPath(progress);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  const setPath = (progress) => {
    if (!containerRef.current || !path.current) return;
    const width = containerRef.current.offsetWidth;
    path.current.setAttributeNS(
      null, 
      "d", 
      `M0 250 Q${width * x} ${250 + progress}, ${width} 250`
    )
  }

  const lerp = (x, y, a) => x * (1 - a) + y * a

  const handleMouseDown = () => {
    setIsGrabbing(true);
    if(reqId){
      cancelAnimationFrame(reqId)
      resetAnimation()
    }
  }

  const handleMouseUp = () => {
    setIsGrabbing(false);
    animateOut();
  }

  const manageMouseMove = (e) => {
    if (!isGrabbing) return;
    
    const { movementY, clientX } = e;
    const pathBound = path.current.getBoundingClientRect();
    x = (clientX - pathBound.left) / pathBound.width;
    progress += movementY
    setPath(progress);
  }

  const animateOut = () => {
    const newProgress = progress * Math.sin(time);
    progress = lerp(progress, 0, 0.025);
    time += 0.2;
    setPath(newProgress);
    if(Math.abs(progress) > 0.75){
      reqId = requestAnimationFrame(animateOut);
    }
    else{
      resetAnimation();
    }
  }

  const resetAnimation = () => {
    time = Math.PI / 2;
    progress = 0;
  }

  return (
    <>
      <style jsx>{`
        .line {
          height: 1px;
          margin-bottom: 20px;
          width: 100%;
          position: relative;
          box-sizing: border-box;
        }

        .line svg {
          width: 100%;
          height: 500px;
          position: absolute;
          top: -250px;
          left: 0;
          overflow: visible;
          pointer-events: none;
        }

        .line svg path {
          stroke: white;
          stroke-width: 1px;
          fill: none;
          vector-effect: non-scaling-stroke;
        }

        .line .box {
          height: 40px;
          width: 100%;
          display: block;
          position: relative;
          top: -20px;
          z-index: 1;
          box-sizing: border-box;
          cursor: grab;
        }

        .line .box.grabbing {
          cursor: grabbing;
          height: 500px;
          top: -250px;
        }
      `}
      </style>
      
      <div className={"line"} ref={containerRef}>
        <span 
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={(e) => {manageMouseMove(e)}} 
          className={`box ${isGrabbing ? 'grabbing' : ''}`}
        ></span>
        <svg>
          <path ref={path}></path>
        </svg>
      </div>
    </>
  );
}

export default AnimatedLine;