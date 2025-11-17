"use client"

import { useState, useEffect, useRef } from "react"
import "./contact.css"
import { Instagram, Mail, MessageCircle } from 'lucide-react'



export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    message: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    message: "",
  })
  const formRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (formRef.current) observer.observe(formRef.current)
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
      })
    }
  }

  // 🔍 Get phone and email dynamically from the contact info section
  const getContactInfo = () => {
    const phoneElement = document.querySelector(".info-phone")
    const emailElement = document.querySelector(".info-email")

    const phoneNumber = phoneElement
      ? phoneElement.textContent.replace(/[^0-9]/g, "")
      : "+216 90369458"

    const email = emailElement ? emailElement.textContent.trim() : "Laridhifarah@gmail.com"

    return { phoneNumber, email }
  }

  // ✅ Validate form fields
  const validateForm = () => {
    const newErrors = {
      name: "",
      message: "",
    }

    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis"
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = "Le message est requis"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  // 📱 Send via WhatsApp
  const handleWhatsAppSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const { phoneNumber } = getContactInfo()
    const namePart = formData.name ? `Nom: ${formData.name}\n\n` : ""
    const message = `${namePart}Message:\n${formData.message}`
    const encodedMessage = encodeURIComponent(message)
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    window.open(whatsappURL, "_blank")
  }

  // 📧 Always open Gmail compose (works on all devices)
  const handleEmailSubmit = (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const { email } = getContactInfo()
    const subject = encodeURIComponent(`Message de ${formData.name || "Visiteur"}`)
    const body = encodeURIComponent(formData.message)
    const gmailURL = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${body}`
    window.open(gmailURL, "_blank")
  }

  return (
    <div className="farah-contact">
      <div className="contact-hero">
        <p className="contact-subtitle">Let's stay in touch</p>
        <div className="title-decoration">
          <span className="decoration-line"></span>
          <h1 className="contact-title">Contact Me</h1>
          <span className="decoration-line"></span>
        </div>
      </div>

      <div className="contact-content" ref={formRef}>
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Nom *"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Message *"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                className={errors.message ? "error" : ""}
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <div className="button-group">
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className="submit-btn whatsapp-btn"
                disabled={!formData.name.trim() || !formData.message.trim()}
              >
                <span>SEND VIA WHATSAPP</span>
                <MessageCircle className="button-icon" />
              </button>

              <button
                type="button"
                onClick={handleEmailSubmit}
                className="submit-btn email-btn"
                disabled={!formData.name.trim() || !formData.message.trim()}
              >
                <Mail className="button-icon" />
                <span>Send Via e-mail</span>
              </button>
            </div>

            <p className="required-note">* required fields</p>
          </form>
        </div>

        <div className="contact-info-section">
          <h3 className="info-title">Farah Laridhi</h3>
            <p className="info-address">Tunisia, Tunis</p>
            <p className="info-address">currently living in hongkong</p>
            <br />
            <p className="info-phone">+852 97971823</p>
            <p className="info-phone">+216 90369458</p>
            <br />
            <p className="info-email">Laridhifarah@gmail.com</p>

            <button
                type="button"
                className="submit-btn instagram-btn"
                style={{marginTop:'20px'}}
                onClick={() => window.open('https://www.instagram.com/faraharidhi/', '_blank')}
              >
                <Instagram className="button-icon" />
                <span>Visit Instagram</span>
              </button>
          </div>
        </div>
    </div>
  )
}