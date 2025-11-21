import React from 'react';
import Orb from './Gallery.jsx'; 

export default function GalleryPage() {
  const myImages = [
    "./src/assets/farah_hero.jpg",
    "./src/assets/Farah_icon.jpg",
    "./src/assets/Farah1.jpg",
    "./src/assets/Farah2.jpg",
    "./src/assets/Farah3.png",
    "./src/assets/Farah4.jpg",
    "./src/assets/Farah5.jpg",
    "./src/assets/Farah6(1).jpg",
    "./src/assets/Farah7.jpg",
    "./src/assets/Farah8.jpg",
    "./src/assets/Farah9.jpg",
    "./src/assets/Farah10.jpg",
    "./src/assets/Farah11.jpg",
    "./src/assets/Farah12.jpg",
    "./src/assets/Farah13.jpg",
    "./src/assets/Farah14.jpg",
    "./src/assets/Farah15.jpg",
    "./src/assets/Farah16.jpg",
    "./src/assets/Farah17.jpg",
    "./src/assets/Farah18.jpg",
    "./src/assets/Farah19.jpg",
    "./src/assets/Farah20.jpg",
    "./src/assets/Farah21.jpg",
    "./src/assets/Farah30.jpg",
  ];

  return (
    <div className="app">
      <style jsx>{`
        * {
        .Orb-container {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        nav,
        footer {
          position: fixed;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 3em;
          z-index: 2;
        }
        nav {
          top: 0;
        }
        footer {
          bottom: 0;
        }
        h1 {
          text-transform: uppercase;
          font-family: "Gojo", sans-serif; /* Add Google Font link in index.html if needed */
          font-size: 18px;
          font-weight: 900;
          color: #fff;
        }
        p {
          text-transform: uppercase;
          font-family: "Akkurat Mono", monospace;
          font-size: 11px;
          color: #777;
        }
      `}</style>
      <Orb
        images={myImages} // Pass the array!
        totalItems={50} // More for even distribution; repeats images
        sphereRadius={5}
        backgroundColor="black"
      />
      <footer>
        <p>[Archive beyond]</p>
      </footer>
    </div>
  );
}