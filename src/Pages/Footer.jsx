import React from "react";
import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  const handleNav = (e, target) => {
    e.preventDefault();
    if (target === 'home') return navigate('/');
    if (target === 'gallery') return navigate('/gallery');
    if (target === 'about') return navigate('/', { state: { target: 'about' } });
    if (target === 'contact') return navigate('/', { state: { target: 'contact' } });
    return null;
  };

  return (
    <footer style={styles.footer}>
      {/* LINE */}
      <div style={styles.line} />

      {/* NAV LINKS */}
      <div style={styles.links}>
        <a href="/" className="hover-link" style={styles.link} onClick={(e) => handleNav(e, 'home')}>Home</a>
        <a href="/about" className="hover-link" style={styles.link} onClick={(e) => handleNav(e, 'about')}>About</a>
        <a href="/gallery" className="hover-link" style={styles.link} onClick={(e) => handleNav(e, 'gallery')}>Gallery</a>
        <a href="/contact" className="hover-link" style={styles.link} onClick={(e) => handleNav(e, 'contact')}>Contact</a>
      </div>

      {/* SOCIAL ICONS */}
      <div style={styles.socials}>
        <a href="https://www.instagram.com/faraharidhi/" target="_blank" rel="noopener" style={styles.icon}><ion-icon name="logo-instagram"></ion-icon></a>
        <a href="https://www.facebook.com/farfouraridhi" target="_blank" rel="noopener" style={styles.icon}><ion-icon name="logo-facebook"></ion-icon></a>
        <a href="https://www.tiktok.com/@faraharidhi" target="_blank" rel="noopener" style={styles.icon}><ion-icon name="logo-tiktok"></ion-icon></a>
        <a href="https://wa.me/+21690369458" target="_blank" rel="noopener" style={styles.icon}><ion-icon name="logo-whatsapp"></ion-icon></a>
      </div>

      {/* COPYRIGHT */}
      <p style={styles.copy}>
        © All rights reserved — This website is created by <strong>Wissem Sahli</strong>
      </p>

      {/* DEDICATION */}
      <p style={styles.dedication}>For my dearest model Farah <ion-icon name="heart-outline" style={{color: "red",position : "relative",top: "2px", left: "2px" ,marginRight: "2px"}}></ion-icon></p>

      <style jsx>{`
        .hover-link {
          position: relative;
          display: inline-block;
          padding: 4px 0;
        }

        .hover-link:hover {
          opacity: 1;
        }

        .hover-link::before {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: #fff;
          transform: scaleX(0);
          transform-origin: center;
          opacity: 0;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .hover-link:hover::before {
          transform: scaleX(1);
          opacity: 1;
        }
      `}</style>
    </footer>
  );
}

/* ------------------ CSS IN JS ------------------ */

const styles = {
  footer: {
    width: "100%",
    padding: "40px 20px",
    background: "#000",
    color: "#fff",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  line: {
    width: "80%",
    height: "1px",
    background: "rgba(255,255,255,0.15)",
    marginBottom: "10px",
    marginLeft: "auto",
    marginRight: "auto",
  },

  links: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    fontSize: "15px",
  },

  link: {
    color: "#fff",
    textDecoration: "none",
    opacity: 0.8,
    transition: "0.3s ease",
  },

  icon: {
    color: "#fff",
    textDecoration: "none",
    fontSize: "20px",
    padding: "6px 10px",
    opacity: 0.8,
    transition: "0.2s",
  },

  socials: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
  },

  copy: {
    fontSize: "13px",
    opacity: 0.7,
  },

  dedication: {
    fontSize: "12px",
    opacity: 0.5,
  },
};