import React, { useState, useEffect, useRef } from 'react';

export default function LoadingScreen() {
  const [titleVisible, setTitleVisible] = useState(false);
  const [subtitleVisible, setSubtitleVisible] = useState(false);
  const [copyrightVisible, setCopyrightVisible] = useState(false);
  const [overlayActive, setOverlayActive] = useState(false);
  const [containerFadeOut, setContainerFadeOut] = useState(false);
  const [loadingComplete, setLoadingComplete] = useState(false);
  
  const digit1Ref = useRef(null);
  const digit2Ref = useRef(null);

  const animateDigit = (digitElement, newValue, delay) => {
    const currentValue = digitElement.textContent;
    if (currentValue === newValue) return;

    // Create temporary container
    const tempContainer = document.createElement('span');
    tempContainer.className = 'digit';
    tempContainer.style.width = '0.6em';
    tempContainer.style.height = '1.2em';
    tempContainer.style.display = 'inline-block';
    tempContainer.style.overflow = 'hidden';
    tempContainer.style.position = 'relative';

    // Create old and new digit spans
    const oldSpan = document.createElement('span');
    oldSpan.className = 'old';
    oldSpan.textContent = currentValue;

    const newSpan = document.createElement('span');
    newSpan.className = 'new';
    newSpan.textContent = newValue;

    tempContainer.appendChild(oldSpan);
    tempContainer.appendChild(newSpan);

    // Replace digitElement content with tempContainer
    digitElement.innerHTML = '';
    digitElement.appendChild(tempContainer);

    // Trigger animations
    setTimeout(() => {
      oldSpan.classList.add('rolling-out');
      setTimeout(() => {
        newSpan.classList.add('rolling-in');
        // Clean up after animation
        setTimeout(() => {
          digitElement.innerHTML = newValue;
        }, 400); // Match roll-in duration
      }, 350); // Delay roll-in until roll-out nearly complete
    }, delay);
  };

  const updateYear = (newYear) => {
    const digits = String(newYear).slice(-2); // Get last two digits
    const digit1 = digit1Ref.current;
    const digit2 = digit2Ref.current;

    // Animate digits with stagger
    animateDigit(digit1, digits[0], 100); // First digit with 100ms delay
    animateDigit(digit2, digits[1], 200); // Second digit with 200ms delay
  };

  useEffect(() => {
    const runAnimationSequence = () => {
      // Fade in h1
      setTimeout(() => {
        setTitleVisible(true);
        
        // Fade in subtitle
        setTimeout(() => {
          setSubtitleVisible(true);
          
          // Fade in copyright and start year animation
          setTimeout(() => {
            setCopyrightVisible(true);
            
            // Start year transitions
            setTimeout(() => {
              updateYear(2024); // 2003 to 2024
              setTimeout(() => {
                updateYear(2025); // 2024 to 2025
                // Pause for 0.5s, then start container fade-out
                setTimeout(() => {
                  setOverlayActive(true);
                  setTimeout(() => {
                    setContainerFadeOut(true);
                    setTimeout(() => {
                      setLoadingComplete(true);
                    }, 500); // Match container fade-out duration
                  }, 800); // Match overlay transition duration
                }, 1250); // Pause for 0.5s
              }, 1500); // Wait 1.5s before second transition
            }, 750); // Start year animation after copyright fade-in
          }, 500); // Delay for copyright
        }, 500); // Delay for subtitle
      }, 500); // Initial delay for h1
    };

    runAnimationSequence();
  }, []);

  if (loadingComplete) {
    return (
        <></>
    );
  }

  return (
    <>
      <style>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: black;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: serif;
          color: white;
          opacity: 1;
          transition: opacity 0.8s ease-in-out;
        }

        .loading-container.fade-out {
          opacity: 0;
        }

        .loading-content {
          text-align: center;
        }

        .main-title {
          font-weight: 400;
          letter-spacing: 1px;
          font-size: 22px;
          margin-bottom: 8px;
          margin-top: 0;
          opacity: 0;
        }

        .main-title.fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .subtitle {
          font-size: 14px;
          letter-spacing: 2px;
          margin-bottom: 24px;
          margin-top: 0;
          opacity: 0;
        }

        .subtitle.fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .copyright {
          font-size: 13px;
          margin-top: 32px;
          margin-bottom: 0;
          opacity: 0;
        }

        .copyright.fade-in {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        .year {
          display: inline-flex;
          font-size: 13px;
          height: 1.2em;
          overflow: hidden;
          vertical-align: middle;
        }

        .digit {
          position: relative;
          width: 0.6em;
          height: 1.2em;
          text-align: center;
          overflow: hidden;
          display: inline-block;
        }

        .digit span {
          position: absolute;
          width: 100%;
          text-align: center;
          top: 0;
          left: 0;
        }

        .digit .old {
          transform: translateY(0);
          opacity: 1;
          z-index: 2;
        }

        .digit .new {
          transform: translateY(100%);
          opacity: 0;
          z-index: 1;
        }

        .digit .old.rolling-out {
          transform: translateY(-100%);
          opacity: 0;
          transition: transform 0.4s ease-in-out, opacity 0.2s ease-in-out;
        }

        .digit .new.rolling-in {
          transform: translateY(0);
          opacity: 1;
          transition: transform 0.4s ease-in-out, opacity 0.3s ease-in-out;
        }

        .fade-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #fbfbfb;
          opacity: 0;
          transform: translateY(100%);
          z-index: 10;
          transition: transform 0.8s ease-in-out, opacity 0.8s ease-in-out;
        }

        .fade-overlay.active {
          transform: translateY(0);
          opacity: 1;
        }
      `}</style>

      <div className={`loading-container ${containerFadeOut ? 'fade-out' : ''}`}>
        <div className="loading-content">
          <h1 className={`main-title ${titleVisible ? 'fade-in' : ''}`}>
            ~Farah Laridhi~
          </h1>
          <p className={`subtitle ${subtitleVisible ? 'fade-in' : ''}`}>
            Fashion Model & Actress
          </p>
          <p className={`copyright ${copyrightVisible ? 'fade-in' : ''}`}>
            <span style={{'position': 'relative','top':'3px'}}>© </span>
            <span className="year">
              20
              <span className="digit" ref={digit1Ref}>0</span>
              <span className="digit" ref={digit2Ref}>3</span>
            </span>
          </p>
        </div>
      </div>

      <div className={`fade-overlay ${overlayActive ? 'active' : ''}`} />
    </>
  );
}