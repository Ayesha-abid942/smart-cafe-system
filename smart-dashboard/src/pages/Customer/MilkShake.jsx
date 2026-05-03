import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function MilkShake() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ milk: "", essence: "", cream: "" });

  const shakes = [
    { name: "Mango Shake", price: 250, img: "/images/mango-shake.png", rating: 4.9, orders: "2k+ orders", badge: "🥭 FAVORITE", badgeColor: "#e63946" },
    { name: "Strawberry Shake", price: 250, img: "/images/strawberry-shake.png", rating: 4.8, orders: "1.5k+ orders", badge: "🍓 BERRY", badgeColor: "#ff6b6b" },
    { name: "Chocolate Shake", price: 250, img: "/images/chocolate-shake.png", rating: 4.9, orders: "2.2k+ orders", badge: "🍫 RICH", badgeColor: "#e63946" },
    { name: "Oreo Shake", price: 250, img: "/images/oreao-shake.png", rating: 4.8, orders: "1.8k+ orders", badge: "🍪 CRUNCHY", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a shake first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🥤 THICK & CREAMY</span>
        <h1>OUR MILK SHAKES</h1>
        <p>Rich, thick, and absolutely satisfying</p>
      </div>

      <div className="popular-grid">
        {shakes.map((item, i) => (
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
          <OptionGroup title="MILK" items={[{ name: "Fresh Milk", img: "/images/milk.png" }, { name: "Condensed", img: "/images/Condensed.png" }, { name: "Evaporated", img: "/images/Evaporated.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Milk: item.name })} />
          <OptionGroup title="ESSENCE" items={[{ name: "Vanilla", img: "/images/vanillaessence.png" }, { name: "Caramel", img: "/images/caramel.png" }, { name: "Honey", img: "/images/Honey.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Essence: item.name })} />
          <OptionGroup title="CREAM" items={[{ name: "Vanilla", img: "/images/Vanilla.png" }, { name: "Chocolate", img: "/images/Chocolate.png" }, { name: "Whipped", img: "/images/Whipped.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Cream: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}