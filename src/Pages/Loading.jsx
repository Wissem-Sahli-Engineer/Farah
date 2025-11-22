import React, { useState, useEffect } from 'react';

export default function LoadingPage() {
  const [loading, setLoading] = useState(true);
  const [dotPosition, setDotPosition] = useState(0);

  useEffect(() => {
    // Disable scroll during loading
    document.body.style.overflow = 'hidden';

    // Animate the dots
    const dotInterval = setInterval(() => {
      setDotPosition((prev) => (prev + 1) % 4);
    }, 500);

    // Minimum loading time is 1.5 seconds
    const minLoadTimer = setTimeout(() => {
      setLoading(false);
      // Re-enable scroll after loading completes
      document.body.style.overflow = 'unset';
    }, 2500);

    // Listen for all images to load (home page images)
    const imageLoadListener = () => {
      // If images load before 1.5s, wait until 1.5s to end loading
      // The setTimeout above will handle the actual ending
    };

    window.addEventListener('load', imageLoadListener);

    return () => {
      clearInterval(dotInterval);
      clearTimeout(minLoadTimer);
      window.removeEventListener('load', imageLoadListener);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const getDots = () => {
    return '.'.repeat(dotPosition || 1);
  };

  return (
    <>
      {/* Loading Screen - stays in DOM but slides out */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '150vh',
          backgroundColor: '#000',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          color: '#fff',
          zIndex: 9999,
          transform: loading ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 1.2s cubic-bezier(0.76, 0, 0.24, 1)',
          pointerEvents: loading ? 'auto' : 'none',
        }}
      >
        <div style={{ textAlign: 'center', lineHeight: '1.8' }}>
          <div style={{ fontSize: '32px', marginBottom: '8px', animation: 'fadeIn 0.8s ease-out 0.2s both' }}>Farah Laridhi</div>
          <div style={{ fontSize: '18px', marginBottom: '8px', animation: 'fadeIn 0.8s ease-out 0.4s both' }}>Fashion Model & Actress</div>
          <div style={{ fontSize: '14px', marginBottom: '8px', animation: 'fadeIn 0.8s ease-out 0.6s both' }}>© All right reserved 2026</div>
          <div style={{ fontSize: '14px', marginBottom: '30px', animation: 'fadeIn 0.8s ease-out 0.8s both' }}>By wissem sahli</div>
          <div style={{ fontSize: '16px', minHeight: '24px', animation: 'fadeIn 0.8s ease-out 1s both' }}>
            loading{getDots()}
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

      </div>
    </>
  );
}