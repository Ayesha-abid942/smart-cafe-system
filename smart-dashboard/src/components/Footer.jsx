import { Link } from "react-router-dom";
import "../style.css";

export default function Footer() {
  return (
    <footer className="footer">
      <h3>SMART CAFE</h3>
      <p>Fresh Taste, Fast Service</p>

      <div className="footer-links">
        <Link to="/">HOME</Link>
        <Link to="/menu">MENU</Link>
        <Link to="/about">ABOUT</Link>
        <Link to="/reviews">REVIEWS</Link>
        <Link to="/contact">CONTACT</Link>
      </div>

      <p className="copy">© 2026 Smart Cafe. All rights reserved.</p>
    </footer>
  );
}