// components/LocomotiveScrollProvider.jsx
import React, { useEffect, useRef } from 'react';
import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'locomotive-scroll/dist/locomotive-scroll.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const LocomotiveScrollProvider = ({ children }) => {
  const scrollContainerRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      // Initialize Locomotive Scroll
      scrollRef.current = new LocomotiveScroll({
        el: scrollContainerRef.current,
        smooth: true,
        multiplier: 1,
        lerp: 0.1,
        class: 'is-inview', // This adds the 'is-inview' class you mentioned!
      });

      // Update ScrollTrigger on scroll
      scrollRef.current.on('scroll', ScrollTrigger.update);

      // Tell ScrollTrigger to use these proxy methods for the smooth scroll element
      ScrollTrigger.scrollerProxy(scrollContainerRef.current, {
        scrollTop(value) {
          return arguments.length 
            ? scrollRef.current.scrollTo(value, 0, 0) 
            : scrollRef.current.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollContainerRef.current.style.transform ? "transform" : "fixed"
      });

      // Each time the window updates, refresh ScrollTrigger and update LocomotiveScroll
      ScrollTrigger.addEventListener('refresh', () => scrollRef.current.update());
      ScrollTrigger.refresh();

      // Handle resize
      const handleResize = () => {
        setTimeout(() => {
          scrollRef.current.update();
          ScrollTrigger.refresh();
        }, 100);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize);
        if (scrollRef.current) {
          scrollRef.current.destroy();
        }
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div 
      ref={scrollContainerRef} 
      data-scroll-container
      style={{ 
        perspective: '1px',
        height: '100vh',
        overflowY: 'auto',
        overflowX: 'hidden'
      }}
    >
      {children}
    </div>
  );
};

export default LocomotiveScrollProvider;