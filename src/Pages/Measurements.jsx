import { positionalKeys } from "framer-motion";
import React from "react";

export default function Measurements() {
  return (
    <div style={styles.container}>
      {/* LEFT IMAGES */}
      <div style={styles.leftColumn}>
        <img
          src="./img/FarahM.jpg"
          alt="model"
          style={styles.fullImg}
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
          src="./img/FarahM2.png"
          alt="model"
          style={styles.smallImg}
        />
      </div>
    </div>
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
};
