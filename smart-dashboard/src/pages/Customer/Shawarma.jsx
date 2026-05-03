import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Shawarma() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ cheese: "", sauce: "", vegetables: "" });

  const shawarmas = [
    { name: "Chicken Shawarma", price: 250, img: "/images/chicken-shawarma.png", rating: 4.8, orders: "2k+ orders", badge: "🌯 CLASSIC", badgeColor: "#e63946" },
    { name: "Zinger Shawarma", price: 300, img: "/images/zinger-shawarma.png", rating: 4.9, orders: "1.8k+ orders", badge: "🔥 SPICY", badgeColor: "#ff6b6b" },
    { name: "Cheese Shawarma", price: 300, img: "/images/cheese-shawarma.png", rating: 4.7, orders: "1.5k+ orders", badge: "🧀 CHEESY", badgeColor: "#e63946" },
    { name: "Veggie Shawarma", price: 300, img: "/images/veggie-shawarma.png", rating: 4.6, orders: "900+ orders", badge: "🥬 VEGGIE", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a shawarma first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🌯 AUTHENTIC FLAVORS</span>
        <h1>OUR SHAWARMAS</h1>
        <p>Authentic Middle Eastern wraps packed with flavor</p>
      </div>

      <div className="popular-grid">
        {shawarmas.map((item, i) => (
          <div key={i} className={`product-card ${selectedItem?.name === item.name ? "active" : ""}`} onClick={() => handleSelectItem(item)}>
            <span className="menu-card-badge" style={{ backgroundColor: item.badgeColor }}>{item.badge}</span>
            <button className={`menu-heart-btn ${likedItems[item.name] ? 'liked' : ''}`} onClick={(e) => toggleLike(e, item.name)}>{likedItems[item.name] ? '❤️' : '🤍'}</button>
            <div className="menu-img-circle"><img src={item.img} alt={item.name} /></div>
            <h3>{item.name}</h3>
            <div className="menu-rating"><span className="stars">{"★".repeat(Math.floor(item.rating))}{item.rating % 1 !== 0 ? "½" : ""}</span><span>{item.rating}</span></div>
            <p className="menu-orders">{item.orders}</p>
            <div className="popular-price-row">
              <span className="popular-price">Rs. {item.price}</span>
              <span className={`select-indicator ${selectedItem?.name === item.name ? 'selected' : ''}`}>{selectedItem?.name === item.name ? '✓ SELECTED' : 'SELECT'}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <>
          <div className="custom-section"><h2 className="custom-title">CUSTOMIZE YOUR ORDER</h2><p className="custom-subtitle">Selected: {selectedItem.name}</p></div>
          <OptionGroup title="CHEESE" items={[{ name: "Cheddar", img: "/images/cheddar.png" }, { name: "Mozzarella", img: "/images/mozrella.png" }, { name: "Swiss", img: "/images/swiss.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Cheese: item.name })} />
          <OptionGroup title="SAUCES" items={[{ name: "Ketchup", img: "/images/Ketchup.png" }, { name: "BBQ", img: "/images/BBQ.png" }, { name: "Garlic Mayo", img: "/images/garlic.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Sauce: item.name })} />
          <OptionGroup title="VEGETABLES" items={[{ name: "Lettuce", img: "/images/lettuce.png" }, { name: "Onion", img: "/images/onion.png" }, { name: "Tomato", img: "/images/tomato.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Veggies: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}