import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import SideCart from "../../components/SideCart";
import "../../style.css";

export default function Menu() {
  const { setIsCartOpen } = useCart();
  const [likedItems, setLikedItems] = useState({});

  const toggleLike = (e, itemName) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const menuItems = [
    {
      name: "Coffee",
      img: "/images/coffee.png",
      rating: 4.8,
      orders: "2k+ orders",
      path: "/coffee",
      badge: "☕ BESTSELLER",
      badgeColor: "#e63946"
    },
    {
      name: "Juice",
      img: "/images/juice.png",
      rating: 4.7,
      orders: "1.8k+ orders",
      path: "/juice",
      badge: "🍊 FRESH",
      badgeColor: "#ff6b6b"
    },
    {
      name: "Ice Cream",
      img: "/images/ice-cream.png",
      rating: 4.9,
      orders: "1.5k+ orders",
      path: "/icecream",
      badge: "🍦 POPULAR",
      badgeColor: "#e63946"
    },
    {
      name: "Burger",
      img: "/images/burger.png",
      rating: 4.8,
      orders: "2.5k+ orders",
      path: "/burger",
      badge: "🍔 HOT",
      badgeColor: "#ff6b6b"
    },
    {
      name: "Tea",
      img: "/images/tea.png",
      rating: 4.6,
      orders: "1.2k+ orders",
      path: "/tea",
      badge: "🫖 CLASSIC",
      badgeColor: "#e63946"
    },
    {
      name: "Milk Shake",
      img: "/images/milk-shake.png",
      rating: 4.8,
      orders: "1.7k+ orders",
      path: "/milkshake",
      badge: "🥤 CREAMY",
      badgeColor: "#ff6b6b"
    },
    {
      name: "Sandwich",
      img: "/images/sandwich.png",
      rating: 4.7,
      orders: "1.4k+ orders",
      path: "/sandwich",
      badge: "🥪 FRESH",
      badgeColor: "#e63946"
    },
    {
      name: "Shawarma",
      img: "/images/shawarma.png",
      rating: 4.7,
      orders: "1.9k+ orders",
      path: "/shawarma",
      badge: "🌯 SPICY",
      badgeColor: "#ff6b6b"
    },
  ];

  return (
    <div className="page">
      <SideCart />

      {/* MENU HEADER */}
      <div className="menu-page-header">
        <span className="popular-tag">🍽️ OUR COMPLETE MENU</span>
        <h1>EXPLORE ALL CATEGORIES</h1>
        <p>Discover our delicious offerings made with love and fresh ingredients</p>
      </div>

      {/* MENU GRID - No Prices, Heart on Top Right */}
      <div className="popular-grid menu-page-grid">
        {menuItems.map((item, i) => (
          <Link to={item.path} key={i} className="menu-card-new">
            {/* Badge on Top Left */}
            <span className="menu-card-badge" style={{ backgroundColor: item.badgeColor }}>
              {item.badge}
            </span>

            {/* Heart Button on Top Right */}
            <button
              className={`menu-heart-btn ${likedItems[item.name] ? 'liked' : ''}`}
              onClick={(e) => toggleLike(e, item.name)}
            >
              {likedItems[item.name] ? '❤️' : '🤍'}
            </button>

            {/* Circle Image */}
            <div className="menu-img-circle">
              <img src={item.img} alt={item.name} />
            </div>

            {/* Item Name */}
            <h3>{item.name}</h3>

            {/* Rating */}
            <div className="menu-rating">
              <span className="stars">
                {"★".repeat(Math.floor(item.rating))}
                {item.rating % 1 !== 0 ? "½" : ""}
              </span>
              <span>{item.rating}</span>
            </div>

            {/* Orders Count */}
            <p className="menu-orders">{item.orders}</p>

            {/* Select Button */}
            <button className="menu-select-btn">SELECT →</button>
          </Link>
        ))}
      </div>
    </div>
  );
}