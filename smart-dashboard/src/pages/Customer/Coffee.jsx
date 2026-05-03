import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Coffee() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ cream: "", milk: "", chocolate: "" });

  const coffees = [
    { name: " Latte Coffee", price: 350, img: "/images/latte.png", rating: 4.9, orders: "1.2k+ orders", badge: "🔥 POPULAR", badgeColor: "#e63946" },
    { name: "Espresso Coffee", price: 250, img: "/images/espresso.png", rating: 4.8, orders: "950+ orders", badge: "☕ CLASSIC", badgeColor: "#ff6b6b" },
    { name: "Mocha Coffee", price: 380, img: "/images/mocha.png", rating: 4.9, orders: "850+ orders", badge: "🍫 RICH", badgeColor: "#e63946" },
    { name: "Americano Coffee", price: 300, img: "/images/americano.png", rating: 4.7, orders: "700+ orders", badge: "💧 SMOOTH", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a coffee first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">☕ PREMIUM SELECTION</span>
        <h1>OUR COFFEE</h1>
        <p>Rich, aromatic, and freshly brewed just for you</p>
      </div>

      <div className="popular-grid">
        {coffees.map((item, i) => (
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
          <OptionGroup title="CREAM" items={[{ name: "Vanilla", img: "/images/Vanilla.png" }, { name: "Chocolate", img: "/images/Chocolate.png" }, { name: "Whipped", img: "/images/Whipped.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Cream: item.name })} />
          <OptionGroup title="MILK" items={[{ name: "Fresh Milk", img: "/images/milk.png" }, { name: "Condensed", img: "/images/Condensed.png" }, { name: "Evaporated", img: "/images/Evaporated.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Milk: item.name })} />
          <OptionGroup title="CHOCOLATE" items={[{ name: "Powder", img: "/images/cocopowder.png" }, { name: "Chips", img: "/images/chips.png" }, { name: "Syrup", img: "/images/syrup.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Chocolate: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}