import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Gallery() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
  const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
  const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
  const scale9 = useTransform(scrollYProgress, [0, 1], [1, 9]);

  // Using placeholder images from Picsum
  const pictures = [
    { 
      src: "./img/Farah1.jpg", 
      scale: scale4 
    },
    { 
      src: "./img/Farah2.jpg", 
      scale: scale5 
    },
    { 
      src: "./img/Farah7.jpg", 
      scale: scale6 
    },
    { 
      src: "./img/Farah4.jpg", 
      scale: scale5 
    },
    { 
      src: "./img/Farah5.jpg", 
      scale: scale6 
    },
    { 
      src: "./img/Farah6(1).jpg", 
      scale: scale8 
    },
    { 
      src: "./img/Farah8.jpg", 
      scale: scale9 
    },
  ];

  return (
    <div ref={container} className="gallery-container">
      <div className="sticky">
        {pictures.map(({ src, scale }, index) => (
          <motion.div key={index} style={{ scale }} className="el">
            <div className="imageContainer">
              <img
                src={src}
                alt={`Gallery image ${index + 1}`}
                loading="lazy"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <style jsx>{`
        .gallery-container {
          height: 300vh;
          position: relative;
          margin-top: 200px;
        }

        .sticky {
          position: sticky;
          overflow: hidden;
          top: 0;
          height: 100vh;
        }

        .el {
          width: 100%;
          height: 100%;
          top: 0;
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .imageContainer {
          position: relative;
          width: 25vw;
          height: 25vh;
        }

        .imageContainer img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
          """border-radius: 8px;"""
        }

        .el:nth-of-type(2) .imageContainer {
          top: -30vh;
          left: 5vw;
          width: 35vw;
          height: 30vh;
        }

        .el:nth-of-type(3) .imageContainer {
          top: -10vh;
          left: -25vw;
          width: 20vw;
          height: 45vh;
        }

        .el:nth-of-type(4) .imageContainer {
          left: 27.5vw;
          width: 25vw;
          height: 25vh;
        }

        .el:nth-of-type(5) .imageContainer {
          top: 27.5vh;
          left: 5vw;
          width: 20vw;
          height: 25vh;
        }

        .el:nth-of-type(6) .imageContainer {
          top: 27.5vh;
          left: -22.5vw;
          width: 30vw;
          height: 20vh;
        }

        .el:nth-of-type(7) .imageContainer {
          top: 27.5vh;
          left: 30vw;
          width: 20vw;
          height: 25vh;
          border-radius: 0px;
        }
      `}</style>
    </div>
  );
}