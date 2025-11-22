import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

const DeviceBlock = () => {
  const videoRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    // Initialize play/pause video on scroll
    initPlayVideoInview();

    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Play Video Inview - from script.js
  const initPlayVideoInview = () => {
    const videoElem = videoRef.current;
    if (!videoElem) return;

    ScrollTrigger.create({
      trigger: videoElem,
      start: '0% 120%',
      end: '100% -20%',
      onEnter: () => videoElem.play(),
      onEnterBack: () => videoElem.play(),
      onLeave: () => videoElem.pause(),
      onLeaveBack: () => videoElem.pause(),
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="section single-block block-device block_0" 
      style={{backgroundColor: '#FFFFFF', paddingBottom: '50px'}}
      data-scroll-section
    >
        <style>
            {`
            .single-block {
  padding-bottom: 0;
  margin-top: -1px;
  background: var(--color-white);
}

.single-block .dark-overlay {
  background: var(--color-dark-dark);
}

.single-block.block-padding-bottom {
  padding-bottom: var(--section-padding);
}

.block-device .overlay-device-image {
  width: 100%;
  position: relative;
}

.block-device .overlay-device-image::before {
  content: "";
  display: block;
  padding-top: 56.8%;
}

.block-device .single-image {
  width: 100%;
  background: rgba(100, 100, 100, 0.1);
  overflow: hidden;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.block-device .single-image::before {
  content: "";
  display: block;
  padding-top: 62.5%;
}

.block-device .single-image .parallax-image-wrap {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.block-device .single-image .image-wrap img {
  width: 100%;
}

.block-device .overlay-top {
  position: absolute;
  object-fit: contain;
  position: absolute;
  top: 0;
  height: unset;
}

/* Device MBP 16 Lower */
.block-device .device-mbp16lower {
  padding-left: calc(var(--container-padding) / 2);
  padding-right: calc(var(--container-padding) / 2);
}

.block-device .device-mbp16lower .single-image {
  width: 79.5%;
  top: 45.3%;
}

@media screen and (max-width: 540px) { 
  .block-device .device-mbp16lower {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Device MBP 15 */
.block-device .device-mbp15 .overlay-device-image::before {
  content: "";
  display: block;
  padding-top: 50.365%;
}

.block-device .device-mbp15 {
  padding-left: calc(var(--container-padding) / 2);
  padding-right: calc(var(--container-padding) / 2);
}

.block-device .device-mbp15 .single-image {
  width: 74.4%;
  left: 49.95%;
  top: 47.3%;
  border-radius: 5px 5px 0 0;
}

@media screen and (max-width: 540px) { 
  .block-device .device-mbp15 {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Device MacPro */
.block-device .device-macpro .overlay-device-image::before {
  content: "";
  display: block;
  padding-top: 85.5%;
}

.block-device .device-macpro {
  padding-left: calc(var(--container-padding) / 1);
  padding-right: calc(var(--container-padding) / 1);
}

.block-device .device-macpro video.overlay,
.block-device .device-macpro img.overlay {
  object-position: center top;
}

.block-device .device-macpro .single-image {
  width: 98.7%;
  top: 33.4%;
}

.block-device .device-macpro .single-image::before {
  padding-top: 57%;
}

@media screen and (max-width: 540px) { 
  .block-device .device-macpro {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Device MacPro Higher */
.block-device .device-macprohigher .overlay-device-image::before {
  content: "";
  display: block;
  padding-top: 85.5%;
}

.block-device .device-macprohigher {
  padding-left: calc(var(--container-padding) / 1);
  padding-right: calc(var(--container-padding) / 1);
}

.block-device .device-macprohigher .single-image {
  width: 98.8%;
  top: 37%;
}

@media screen and (max-width: 540px) { 
  .block-device .device-macprohigher {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Device No Device */
.block-device .device-nodevice .single-image {
  position: relative;
  top: unset;
  left: unset;
  transform: translate(0, 0);
}

.block-device .device-nodevice {
  padding-left: calc(var(--container-padding) / 1);
  padding-right: calc(var(--container-padding) / 1);
}

@media screen and (max-width: 540px) { 
  .block-device .device-nodevice {
    padding-left: 0;
    padding-right: 0;
  }
}

/* Device iPad Pro */
.block-device .device-ipadpro .overlay-device-image::before {
  content: "";
  display: block;
  padding-top: 63.7%;
}

.block-device .device-ipadpro {
  padding-left: calc(var(--container-padding) / 1.25);
  padding-right: calc(var(--container-padding) / 1.25);
}

.block-device .device-ipadpro .single-image {
  width: 97%;
  top: 50%;
  border-radius: 2.5%/4%;
  left: 50.1%;
}

.block-device .device-ipadpro .overlay-pencil {
  height: 60%;
  width: auto;
  left: 71%;
  top: 51%;
}

@media screen and (max-width: 540px) { 
  .block-device .device-ipadpro {
    padding-left: 0;
    padding-right: 0;
  }
}
            `}
        </style>
      <div className="container">
        <div className="row device-mbp16lower">
          <div className="flex-col">
            <div className="device">
              <div className="single-image">
                <div className="overlay overlay-image playpauze">
                  <video 
                    ref={videoRef}
                    className="overlay" 
                    src="/assets/FarahWalk.MP4" 
                    loop 
                    muted 
                    playsInline
                  ></video>
                </div>                                     
              </div>
                
              <div className="overlay-device-image">
                <div 
                  className="overlay overlay-device" 
                  style={{
                    background: "url(https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811938/device-mbp-16-lower-nonotch_byoreh.webp) center center no-repeat", 
                    backgroundSize: "cover"
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeviceBlock;