import React, { useEffect } from 'react';
import './hero.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const HeroSection = () => {
  useEffect(() => {
    // Use installed gsap + ScrollTrigger packages instead of CDN
    if (typeof window === 'undefined') return;
    gsap.registerPlugin(ScrollTrigger);

    function initScrollLetters() {
      let direction = 1;

      const roll1 = roll('.big-name .name-wrap', { duration: 18 });
      const scroll = ScrollTrigger.create({
        trigger: document.body,
        onUpdate(self) {
          if (self.direction !== direction) {
            direction *= -1;
            gsap.to([roll1], { timeScale: direction, overwrite: true });
          }
        }
      });

      function roll(targets, vars, reverse) {
        vars = vars || {};
        vars.ease || (vars.ease = 'none');
        const tl = gsap.timeline({
          repeat: -1,
          onReverseComplete() {
            this.totalTime(this.rawTime() + this.duration() * 10);
          }
        });
        const elements = gsap.utils.toArray(targets);
        const clones = elements.map(el => {
          let clone = el.cloneNode(true);
          el.parentNode.appendChild(clone);
          return clone;
        });
        const positionClones = () => elements.forEach((el, i) => gsap.set(clones[i], { position: 'absolute', overwrite: false, top: el.offsetTop, left: el.offsetLeft + (reverse ? -el.offsetWidth : el.offsetWidth) }));
        positionClones();
        elements.forEach((el, i) => tl.to([el, clones[i]], { xPercent: reverse ? 100 : -100, ...vars }, 0));
        window.addEventListener('resize', () => {
          let time = tl.totalTime();
          tl.totalTime(0);
          positionClones();
          tl.totalTime(time);
        });
        return tl;
      }
    }

    function initGlobeScroll() {
      if (document.querySelector('.digital-ball .globe')) {
        const triggerElement = document.querySelector('main') || document.body;
        const targetElement = document.querySelector('.digital-ball .globe');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: triggerElement,
            start: '100% 100%',
            end: '100% 0%',
            scrub: 0,
          }
        });

        tl.to(targetElement, {
          ease: 'none',
          rotate: 90
        });
      }
    }

    initScrollLetters();
    initGlobeScroll();

    return () => {
      try { ScrollTrigger.getAll().forEach(trigger => trigger.kill()); } catch (e) {}
    };
  }, []);

  return (
    <header className="section home-header theme-dark" data-scroll-section>
      <div className="overlay personal-image no-select once-in" data-scroll data-scroll-speed="-3" data-scroll-position="top">
        <img src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811071/Farah5_ycgzqq.webp" alt="" />
      </div>

      <div className="overlay get-height once-in once-in-secondary">
        <div className="hanger">
          <p><span>Located </span><span>in </span><span>HongKong</span></p>
          <svg width="300px" height="121px" viewBox="0 0 300 121" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <title>Combined Shape</title>
            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
              <g id="Artboard" transform="translate(0.000000, -366.000000)" fill="#1C1D20">
                <g id="Group" transform="translate(149.816828, 426.633657) rotate(90.000000) translate(-149.816828, -426.633657) translate(89.816828, 276.816828)">
                  <g id="Hanger" transform="translate(60.000000, 149.816828) rotate(-90.000000) translate(-60.000000, -149.816828) translate(-89.816828, 89.816828)">
                    <path d="M239.633657,0 C272.770742,1.0182436e-15 299.633657,26.862915 299.633657,60 C299.633657,93.137085 272.770742,120 239.633657,120 L0,120 L0,0 L239.633657,0 Z M239.633657,18.7755102 C216.866,18.7755102 198.409167,37.232343 198.409167,60 C198.409167,82.767657 216.866,101.22449 239.633657,101.22449 C262.401314,101.22449 280.858147,82.767657 280.858147,60 C280.858147,37.232343 262.401314,18.7755102 239.633657,18.7755102 Z" id="Combined-Shape"></path>
                  </g>
                </g>
              </g>
            </g>
          </svg>
          <div className="digital-ball">
            <div className="overlay"></div>
            <div className="globe">
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

      <div className="container once-in once-in-secondary">
        <div className="row">
          <div className="flex-col">
            <div className="header-above-h4" data-scroll data-scroll-speed="1">
              <div className="arrow big">
                <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <title>arrow-up-right</title>
                  <g id="Page-1" stroke="black" strokeWidth="1" fill="none" fillRule="evenodd">
                    <g id="Artboard" transform="translate(-1019.000000, -279.000000)" stroke="#FFFFFF" strokeWidth="1.5">
                      <g id="arrow-up-right" transform="translate(1026.000000, 286.000000) rotate(90.000000) translate(-1026.000000, -286.000000) translate(1020.000000, 280.000000)">
                        <polyline id="Path" points="2.76923077 0 12 0 12 9.23076923"></polyline>
                        <line x1="12" y1="0" x2="0" y2="12" id="Path"></line>
                      </g>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
            <h4><span>Freelance</span> Fashion Model & Actress</h4>
          </div>
        </div>
      </div>

      <div className="big-name">
        <div className="name-h1" data-scroll data-scroll-direction="horizontal" data-scroll-speed="4" data-scroll-position="top">
          <div className="name-wrap">
            <h1 className="no-select once-in once-in-secondary">Farah Laridhi<span className="spacer">—</span></h1>
          </div>
        </div>
      </div>

      <div className="white-block"></div>
    </header>
  );
};

export default HeroSection;