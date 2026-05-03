import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function IceCream() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({ fruits: "", berries: "", nuts: "" });

  const icecreams = [
    { name: "Chocolate IceCream", price: 200, img: "/images/chocolate-icecream.png", rating: 4.9, orders: "2k+ orders", badge: "🍫 FAVORITE", badgeColor: "#e63946" },
    { name: "Strawberry IceCream", price: 200, img: "/images/strawberry-icecream.png", rating: 4.8, orders: "1.5k+ orders", badge: "🍓 BERRY", badgeColor: "#ff6b6b" },
    { name: "Mango IceCream", price: 200, img: "/images/mango-icecream.png", rating: 4.9, orders: "1.8k+ orders", badge: "🥭 TROPICAL", badgeColor: "#e63946" },
    { name: "Kulfa IceCream", price: 200, img: "/images/kulfa-icecream.png", rating: 4.7, orders: "1.2k+ orders", badge: "🥛 CREAMY", badgeColor: "#ff6b6b" },
  ];

  const toggleLike = (e, itemName) => { e.stopPropagation(); setLikedItems(prev => ({ ...prev, [itemName]: !prev[itemName] })); };
  const handleSelectItem = (item) => setSelectedItem(item);
  const handleAddToCart = () => {
    if (!selectedItem) { alert("Please select an ice cream first"); return; }
    addToCart({ ...selectedItem, options: selectedOptions });
  };

  return (
    <div className="page">
      <div className="menu-page-header">
        <span className="popular-tag">🍦 CREAMY DELIGHTS</span>
        <h1>OUR ICE CREAMS</h1>
        <p>Smooth, creamy, and absolutely delicious</p>
      </div>

      <div className="popular-grid">
        {icecreams.map((item, i) => (
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
          <OptionGroup title="NUTS" items={[{ name: "Almond", img: "/images/almond.png" }, { name: "Walnut", img: "/images/walnut.png" }, { name: "Peanut", img: "/images/peanut.png" }]} onSelect={(item) => setSelectedOptions({ ...selectedOptions, Nuts: item.name })} />
          <button className="cart-btn" onClick={handleAddToCart}>ADD TO CART</button>
        </>
      )}
    </div>
  );
}