import React, { useEffect, useRef, useState } from 'react';

// useInView hook
const useInView = ({ threshold = 0.5, triggerOnce = false } = {}) => {
  const [inView, setInView] = useState(false);
  const [entry, setEntry] = useState(undefined);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        setEntry(entry);
        
        if (entry.isIntersecting && triggerOnce) {
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [threshold, triggerOnce]);

  return { ref, inView, entry };
};

// PixelImage component
export default function PixelImage() {
  const images = [
    {
      high: '/img/img_webp/Farah13.webp',
      low: '/img/img_webp/Farah13.webp'
    },
    {
      high: '/img/img_webp/Farah10.webp',
      low: '/img/img_webp/Farah10.webp'
    }
  ];

  const Picture = ({ src, src10 }) => {
    const imgRef = useRef(null);
    const canvasRef = useRef(null);
    const [loaded, setLoaded] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const highResImageRef = useRef(null);
    const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true });

    useEffect(() => {
      const { width, height } = imgRef.current.getBoundingClientRect();
      setDimensions({ width, height });

      const img = new Image();
      img.onload = () => {
        highResImageRef.current = img;
        setLoaded(true);
      };
      img.style.objectFit = 'cover';
      img.src = src;
    }, [src]);

    useEffect(() => {
      if (inView && loaded) {
        animate(highResImageRef.current);
      }
    }, [inView, loaded]);

    const drawImage = (img) => {
      const ctx = canvasRef.current.getContext('2d');
      ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
    };

    const animate = (img, pixelSize = 64) => {
      const ctx = canvasRef.current.getContext('2d');
      const width = dimensions.width;
      const height = dimensions.height;

      drawImage(img);

      if (pixelSize < 5) {
        return;
      }

      const imageData = ctx.getImageData(0, 0, width, height).data;

      for (let y = 0; y < height; y += pixelSize) {
        for (let x = 0; x < width; x += pixelSize) {
          const index = (x + y * width) * 4;
          ctx.fillStyle = `rgba(${imageData[index]},${imageData[index + 1]},${imageData[index + 2]},${imageData[index + 3]})`;
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }

      setTimeout(() => {
        animate(img, pixelSize / 2);
      }, 150);
    };

    return (
      <div ref={ref} className="picture">
        <img ref={imgRef} src={src10} alt="Low quality preview" />
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
        />
      </div>
    );
  };

  return (
    <>
      <style>{`
        .pixel-image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;  
          margin-top: 5rem;
          gap: 2rem;
          flex-wrap: wrap;
          margin-bottom: 2rem;
        }

        .picture {
          position: relative;
        }

        .picture img {
          width: 400px;
          image-rendering: pixelated;
          height: 90vh;
        }

        .picture canvas {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
        }
      `}</style>
      <div className="pixel-image-container">
        {images.map((img, index) => (
          <Picture
            key={index}
            src={img.high}
            src10={img.low}
          />
        ))}
      </div>
    </>
  );
}