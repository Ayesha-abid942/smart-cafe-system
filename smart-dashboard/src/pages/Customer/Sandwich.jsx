import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Sandwich() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ cheese: "", sauces: "", vegetables: "" });

  const sandwiches = [
    { name: "Chicken Sandwich", price: 250, img: "/images/chickensandwich.png", rating: 4.8, orders: "1.5k+ orders", badge: "🥪 CLASSIC", badgeColor: "#e63946" },
    { name: "Grilled Sandwich", price: 300, img: "/images/grilled-sandwich.png", rating: 4.7, orders: "1.2k+ orders", badge: "🔥 GRILLED", badgeColor: "#ff6b6b" },
    { name: "Cheese Sandwich", price: 300, img: "/images/cheese-sandwich.png", rating: 4.8, orders: "1k+ orders", badge: "🧀 CHEESY", badgeColor: "#e63946" },
    { name: "Veggie Sandwich", price: 300, img: "/images/veggie-sandwich.png", rating: 4.6, orders: "800+ orders", badge: "🥬 HEALTHY", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a sandwich first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🥪 FRESHLY MADE</span>
        <h1>OUR SANDWICHES</h1>
        <p>Delicious sandwiches made with fresh ingredients</p>
      </div>

      <div className="popular-grid">
        {sandwiches.map((item, i) => (
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
          <OptionGroup title="SAUCES" items={[{ name: "Ketchup", img: "/images/Ketchup.png" }, { name: "BBQ", img: "/images/BBQ.png" }, { name: "Garlic Mayo", img: "/images/garlic.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Sauces: item.name })} />
          <OptionGroup title="VEGETABLES" items={[{ name: "Lettuce", img: "/images/lettuce.png" }, { name: "Onion", img: "/images/onion.png" }, { name: "Tomato", img: "/images/tomato.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Veggies: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}