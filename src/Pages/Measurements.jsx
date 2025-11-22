import React, { useState, useEffect } from "react";

export default function Measurements() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 720);
    };
    
    checkWidth();
    window.addEventListener('resize', checkWidth);
    
    return () => window.removeEventListener('resize', checkWidth);
  }, []);

  const handleImageClick = (src) => {
    if (isMobile) {
      setSelectedImage(src);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div style={styles.container}>
        {/* LEFT IMAGES */}
        <div style={styles.leftColumn}>
          <img
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811325/FarahM_mkat5q.webp"
            alt="model"
            style={{
              ...styles.fullImg,
              ...(isMobile && styles.clickableImg)
            }}
            onClick={() => handleImageClick("https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811325/FarahM_mkat5q.webp")}
          />
        </div>

        {/* CENTER MEASUREMENTS */}
        <div style={styles.centerColumn}>
          <h2 style={styles.title}>MEASUREMENTS</h2>

          <div style={styles.row}>
            <span>HEIGHT</span>
            <span>1m80</span>
          </div>

          <div style={styles.row}>
            <span>BUST</span>
            <span>81 cm</span>
          </div>

          <div style={styles.row}>
            <span>WAIST</span>
            <span>60 cm</span>
          </div>

          <div style={styles.row}>
            <span>HIPS</span>
            <span>91 cm</span>
          </div>

          <div style={styles.row}>
            <span>SHOE SIZE</span>
            <span>38/39</span>
          </div>

          <div style={styles.row}>
            <span>SIZE</span>
            <span>36/38</span>
          </div>

          <div style={styles.row}>
            <span>HAIR</span>
            <span>BROWN</span>
          </div>

          <div style={styles.row}>
            <span>EYES</span>
            <span>HONEY</span>
          </div>
        </div>

        {/* RIGHT IMAGES */}
        <div style={styles.rightColumn}>
          <img
            src="https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811328/FarahM2_tuyg2b.webp"
            alt="model"
            style={{
              ...styles.smallImg,
              ...(isMobile && styles.clickableImg)
            }}
            onClick={() => handleImageClick("https://res.cloudinary.com/dbjwsyyyc/image/upload/v1763811328/FarahM2_tuyg2b.webp")}
          />
        </div>
      </div>

      {/* MODAL */}
      {selectedImage && (
        <div style={styles.modal} onClick={closeModal}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={closeModal}>
              ×
            </button>
            <img src={selectedImage} alt="Full size" style={styles.modalImage} />
          </div>
        </div>
      )}
    </>
  );
}

/* ------------------ CSS IN JS ------------------ */

const styles = {
  container: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "20px",
    width: "100%",
    padding: "20px",
    background: "#000",
    color: "#fff",
    paddingTop: "50px",
  },

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  centerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    justifyContent: "center",
  },

  rightColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    position: "relative",
  },

  fullImg: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "4px",
  },

  smallImg: {
    width: "100%",
    objectFit: "cover",
    borderRadius: "4px",
    position: "absolute",
  },

  clickableImg: {
    cursor: "pointer",
    transition: "opacity 0.3s",
  },

  title: {
    fontSize: "28px",
    letterSpacing: "2px",
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid #333",
    padding: "8px 0",
    fontSize: "16px",
  },

  modal: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999,
    padding: "20px",
  },

  modalContent: {
    position: "relative",
    maxWidth: "90%",
    maxHeight: "90%",
  },

  modalImage: {
    width: "70vw",
    height: "80vh",
    objectFit: "contain",
    borderRadius: "4px",
  },

  closeButton: {
    position: "absolute",
    top: "-40px",
    right: "0",
    background: "transparent",
    border: "none",
    color: "#fff",
    fontSize: "40px",
    cursor: "pointer",
    zIndex: 10000,
    padding: "0 10px",
  },
};