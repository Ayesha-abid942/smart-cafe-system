import { useState } from "react";
import "../../style.css";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <div className="menu-page-header">

        <h1 className="contact-title">Contact Us</h1>
        <p>We'd love to hear from you</p>
      </div>

      {/* INFO SECTION */}
      <div className="contact-info">
        <div className="info-card">
          <h3>📍 Address</h3>
          <p>Lalamusa, Punjab, Pakistan</p>
        </div>

        <div className="info-card">
          <h3>📞 Phone</h3>
          <p>+92 300 1234567</p>
        </div>

        <div className="info-card">
          <h3>✉️ Email</h3>
          <p>smartcafe@gmail.com</p>
        </div>

        <div className="info-card">
          <h3>🕐 Timings</h3>
          <p>Mon - Sun: 10:00 AM - 11:00 PM</p>
        </div>
      </div>

      {/* FORM */}
      <div className="contact-form-box">
        <h2>Send us a Message</h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <textarea
            name="message"
            placeholder="Your Message..."
            rows="5"
            value={form.message}
            onChange={handleChange}
            required
          />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}