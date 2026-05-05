import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style.css";

function Navbar() {
  const { setIsCartOpen, cart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const cartCount = cart.reduce((total, item) => total + item.qty, 0);

  const handleGoBack = () => navigate(-1);

  // Home page detect
  const isHomePage =
    location.pathname === "/" ||
    location.pathname === "/customer";

  return (
    <ul className="navbar">

      {/* BACK BUTTON */}
      {!isHomePage && (
        <li>
          <button onClick={handleGoBack} className="nav-back-btn">
            ← BACK
          </button>
        </li>
      )}

      {/* NAV LINKS */}
      <div
        className="nav-links-container"
        style={{ display: "flex", gap: "40px" }}
      >
        <li><Link to="/">HOME</Link></li>
        <li><Link to="/menu">MENU</Link></li>
        <li><Link to="/about">ABOUT</Link></li>
        <li><Link to="/reviews">REVIEWS</Link></li>
        <li><Link to="/contact">CONTACT</Link></li>
      </div>

      {/* CART */}
      <li>
        <div
          onClick={() => setIsCartOpen(true)}
          className="cart-icon-wrapper"
          style={{ cursor: "pointer" }}
        >
          <img src="/images/cart.png" alt="cart" className="cart-icon" />

          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>
      </li>

    </ul>
  );
}

export default Navbar;