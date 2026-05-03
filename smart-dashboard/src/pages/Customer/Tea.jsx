import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Tea() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ milk: "", sweeteners: "", herbs: "" });

  const teas = [
    { name: "Normal Tea", price: 100, img: "/images/tea.png", rating: 4.8, orders: "2.5k+ orders", badge: "☕ CLASSIC", badgeColor: "#e63946" },
    { name: "Green Tea", price: 120, img: "/images/green.png", rating: 4.7, orders: "1.5k+ orders", badge: "🍃 HEALTHY", badgeColor: "#ff6b6b" },
    { name: "Kashmiri Tea", price: 120, img: "/images/Kashmiri.png", rating: 4.9, orders: "1.8k+ orders", badge: "💗 PINK TEA", badgeColor: "#e63946" },
    { name: "Tandhori Tea", price: 120, img: "/images/tandhori.png", rating: 4.8, orders: "1.2k+ orders", badge: "🔥 SPECIAL", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a tea first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🫖 AROMATIC BREWS</span>
        <h1>OUR TEAS</h1>
        <p>Warm, comforting, and perfectly brewed</p>
      </div>

      <div className="popular-grid">
        {teas.map((item, i) => (
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
          <OptionGroup title="SWEETENERS" items={[{ name: "White Sugar", img: "/images/Whitesugar.png" }, { name: "Brown Sugar", img: "/images/brownsugar.png" }, { name: "Honey", img: "/images/Honey.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Sweeteners: item.name })} />
          <OptionGroup title="HERBS" items={[{ name: "Mint", img: "/images/mint.png" }, { name: "Ginger", img: "/images/ginger.png" }, { name: "Lemon Grass", img: "/images/Lemongrass.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Herbs: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}