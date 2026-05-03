import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../style.css";

export default function Home() {
  const [likedItems, setLikedItems] = useState({});
  const [likedMenuItems, setLikedMenuItems] = useState({});
  const [currentMenuIndex, setCurrentMenuIndex] = useState(0);

  // Menu items for auto-scrolling
  const scrollingMenuItems = [
    { name: "Coffee", img: "/images/coffee.png", desc: "Rich & Aromatic", path: "/coffee" },
    { name: "Burger", img: "/images/burger.png", desc: "Juicy & Delicious", path: "/burger" },
    { name: "Juice", img: "/images/juice.png", desc: "Fresh & Natural", path: "/juice" },
    { name: "Ice Cream", img: "/images/ice-cream.png", desc: "Creamy & Sweet", path: "/icecream" },
    { name: "Shawarma", img: "/images/shawarma.png", desc: "Spicy & Flavorful", path: "/shawarma" },
    { name: "Milk Shake", img: "/images/milk-shake.png", desc: "Thick & Creamy", path: "/milkshake" },
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMenuIndex((prev) => (prev + 1) % scrollingMenuItems.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const popularItems = [
    { name: "Latte", img: "/images/latte.png", rating: 4.9, orders: "1.2k+ orders", path: "/coffee", badge: "🔥 POPULAR", badgeColor: "#e63946" },
    { name: "Zinger Burger", img: "/images/zinger-burger.png", rating: 4.8, orders: "950+ orders", path: "/burger", badge: "🍔 HOT", badgeColor: "#ff6b6b" },
    { name: "Mango Shake", img: "/images/mango-shake.png", rating: 4.9, orders: "800+ orders", path: "/milkshake", badge: "🥤 CREAMY", badgeColor: "#e63946" },
    { name: "Chicken Shawarma", img: "/images/chicken-shawarma.png", rating: 4.7, orders: "1.5k+ orders", path: "/shawarma", badge: "🌯 SPICY", badgeColor: "#ff6b6b" },
  ];

  const menuItems = [
    { name: "Coffee", img: "/images/coffee.png", rating: 4.8, orders: "2k+ orders", path: "/coffee", badge: "☕ BESTSELLER", badgeColor: "#e63946" },
    { name: "Juice", img: "/images/juice.png", rating: 4.7, orders: "1.8k+ orders", path: "/juice", badge: "🍊 FRESH", badgeColor: "#ff6b6b" },
    { name: "Ice Cream", img: "/images/ice-cream.png", rating: 4.9, orders: "1.5k+ orders", path: "/icecream", badge: "🍦 POPULAR", badgeColor: "#e63946" },
    { name: "Burger", img: "/images/burger.png", rating: 4.8, orders: "2.5k+ orders", path: "/burger", badge: "🍔 HOT", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const toggleMenuLike = (e, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedMenuItems(prev => ({ ...prev, [itemName]: !prev[itemName] }));
  };

  const currentItem = scrollingMenuItems[currentMenuIndex];

  return (
    <div className="home-page">
      {/* HERO SECTION */}
      <section className="hero-split">
        <div className="hero-left-content">
          <span className="hero-badge">✨ WELCOME TO</span>
          <h1 className="hero-main-title">
            SMART<br />
            <span className="hero-highlight">CAFE</span>
          </h1>
          <p className="hero-description">
            Enjoy delicious food made with love and freshness. From hot coffee to juicy burgers,
            we serve everything to satisfy your cravings in one place.
          </p>

          <div className="hero-stats-row">
            <div className="hero-stat">
              <span className="stat-value">50+</span>
              <span className="stat-name">Menu Items</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">4.9★</span>
              <span className="stat-name">Rating</span>
            </div>
            <div className="hero-stat">
              <span className="stat-value">10K+</span>
              <span className="stat-name">Customers</span>
            </div>
          </div>

          <Link to="/menu">
            <button className="hero-order-btn">
              ORDER NOW <span className="arrow">→</span>
            </button>
          </Link>
        </div>

        <div className="hero-right-scroll">
          <div className="scroll-container">
            <div className="scroll-badge">🔥 HOT & FRESH</div>

            <div className="current-item-display" key={currentMenuIndex}>
              <Link to={currentItem.path} className="current-item-link">
                <div className="current-item-card">
                  <div className="item-image-wrapper">
                    <img src={currentItem.img} alt={currentItem.name} />
                  </div>
                  <div className="item-info">
                    <h2>{currentItem.name}</h2>
                    <p className="item-desc">{currentItem.desc}</p>
                    <p className="item-price">{currentItem.price}</p>
                  </div>
                </div>
              </Link>
            </div>

            <div className="scroll-progress">
              {scrollingMenuItems.map((_, index) => (
                <span
                  key={index}
                  className={`progress-dot ${index === currentMenuIndex ? 'active' : ''}`}
                  onClick={() => setCurrentMenuIndex(index)}
                />
              ))}
            </div>

            <div className="up-next">
              <span className="up-next-label">UP NEXT:</span>
              <span className="up-next-item">
                {scrollingMenuItems[(currentMenuIndex + 1) % scrollingMenuItems.length].name}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* POPULAR ITEMS SECTION */}
      <section className="popular-section">
        <div className="popular-header">
          <span className="popular-tag">🔥 MOST ORDERED</span>
          <h2>OUR POPULAR ITEMS</h2>
          <p>Discover our most loved dishes, handpicked by our customers</p>
        </div>

        <div className="popular-grid">
          {popularItems.map((item, i) => (
            <Link to={item.path} key={i} className="menu-card-new">
              <span className="menu-card-badge" style={{ backgroundColor: item.badgeColor }}>
                {item.badge}
              </span>

              <button
                className={`menu-heart-btn ${likedItems[item.name] ? 'liked' : ''}`}
                onClick={(e) => toggleLike(e, item.name)}
              >
                {likedItems[item.name] ? '❤️' : '🤍'}
              </button>

              <div className="menu-img-circle">
                <img src={item.img} alt={item.name} />
              </div>

              <h3>{item.name}</h3>

              <div className="menu-rating">
                <span className="stars">
                  {"★".repeat(Math.floor(item.rating))}
                  {item.rating % 1 !== 0 ? "½" : ""}
                </span>
                <span>{item.rating}</span>
              </div>

              <p className="menu-orders">{item.orders}</p>

              <button className="menu-select-btn">SELECT →</button>
            </Link>
          ))}
        </div>

        <div className="popular-cta">
          <Link to="/menu">
            <button className="view-all-btn">VIEW FULL MENU →</button>
          </Link>
        </div>
      </section>

      {/* CONTINUOUS GRADIENT WRAPPER */}
      <div className="continuous-gradient-wrapper">
        {/* EXPLORE MENU SECTION */}
        <section className="explore-menu-section">
          <div className="popular-header">
            <span className="popular-tag">🍽️ OUR SELECTION</span>
            <h2>EXPLORE OUR MENU</h2>
            <p>Discover our delicious offerings made with love and fresh ingredients</p>
          </div>

          <div className="popular-grid">
            {menuItems.map((item, i) => (
              <Link to={item.path} key={i} className="menu-card-new">
                <span className="menu-card-badge" style={{ backgroundColor: item.badgeColor }}>
                  {item.badge}
                </span>

                <button
                  className={`menu-heart-btn ${likedMenuItems[item.name] ? 'liked' : ''}`}
                  onClick={(e) => toggleMenuLike(e, item.name)}
                >
                  {likedMenuItems[item.name] ? '❤️' : '🤍'}
                </button>

                <div className="menu-img-circle">
                  <img src={item.img} alt={item.name} />
                </div>

                <h3>{item.name}</h3>

                <div className="menu-rating">
                  <span className="stars">
                    {"★".repeat(Math.floor(item.rating))}
                    {item.rating % 1 !== 0 ? "½" : ""}
                  </span>
                  <span>{item.rating}</span>
                </div>

                <p className="menu-orders">{item.orders}</p>

                <button className="menu-select-btn">SELECT →</button>
              </Link>
            ))}
          </div>

          <div className="popular-cta">
            <Link to="/menu">
              <button className="view-all-btn">VIEW ALL CATEGORIES →</button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}