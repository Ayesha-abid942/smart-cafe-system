import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Juice() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ fruits: "", berries: "", addons: "" });

  const juices = [
    { name: "Mango Juice", price: 200, img: "/images/mango-juice.png", rating: 4.9, orders: "1.5k+ orders", badge: "🥭 POPULAR", badgeColor: "#e63946" },
    { name: "Orange Juice", price: 200, img: "/images/orange.png", rating: 4.8, orders: "1.2k+ orders", badge: "🍊 FRESH", badgeColor: "#ff6b6b" },
    { name: "Guava Juice", price: 200, img: "/images/guava.png", rating: 4.7, orders: "800+ orders", badge: "🍐 TANGY", badgeColor: "#e63946" },
    { name: "Musami Juice", price: 200, img: "/images/Musami.png", rating: 4.8, orders: "900+ orders", badge: "🍋 CITRUS", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select a juice first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🍹 FRESH & NATURAL</span>
        <h1>OUR JUICES</h1>
        <p>100% fresh fruit juices made to order</p>
      </div>

      <div className="popular-grid">
        {juices.map((item, i) => (
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
          <OptionGroup title="FRUITS" items={[{ name: "Mango", img: "/images/mango.png" }, { name: "Kiwi", img: "/images/kiwi.png" }, { name: "Pineapple", img: "/images/pineapple.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Fruits: item.name })} />
          <OptionGroup title="BERRIES" items={[{ name: "Strawberry", img: "/images/strawberry.png" }, { name: "Cherry", img: "/images/cherry.png" }, { name: "Black Berry", img: "/images/blackberry.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Berries: item.name })} />
          <OptionGroup title="ADD-ONS" items={[{ name: "Ice Cubes", img: "/images/icecubes.png" }, { name: "Crushed Ice", img: "/images/crushedice.png" }, { name: "Aloe Vera", img: "/images/Aleovera.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Addons: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}