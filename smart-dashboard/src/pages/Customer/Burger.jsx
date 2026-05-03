import { useState } from "react";
import { useCart } from "../../context/CartContext";
import OptionGroup from "../../components/OptionGroup";
import "../../style.css";

export default function Burger() {
  const { addToCart } = useCart();
  const [likedItems, setLikedItems] = useState({});

  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({
    cheese: "",
    sauce: "",
    veggies: "",
  });

  const burgers = [
    {
      name: "Chicken Burger",
      price: 350,
      img: "/images/chicken-burger.png",
      rating: 4.8,
      orders: "1.5k+ orders",
      badge: "🍔 CLASSIC",
      badgeColor: "#e63946"
    },
    {
      name: "Zinger Burger",
      price: 400,
      img: "/images/zinger-burger.png",
      rating: 4.9,
      orders: "2k+ orders",
      badge: "🔥 SPICY",
      badgeColor: "#ff6b6b"
    },
    {
      name: "Cheese Burger",
      price: 380,
      img: "/images/cheese-burger.png",
      rating: 4.7,
      orders: "1.2k+ orders",
      badge: "🧀 CHEESY",
      badgeColor: "#e63946"
    },
    {
      name: "Beef Burger",
      price: 400,
      img: "/images/beef-burger.png",
      rating: 4.8,
      orders: "1.8k+ orders",
      badge: "🥩 PREMIUM",
      badgeColor: "#ff6b6b"
    },
  ];

  const toggleLike = (e, itemName) => {
    e.stopPropagation();
    setLikedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleAddToCart = () => {
    if (!selectedItem) {
      alert("Please select a burger");
      return;
    }
    addToCart({
      ...selectedItem,
      options: selectedOptions,
    });
  };

  return (
    <div className="page">
      {/* HEADER */}
      <div className="menu-page-header">
        <span className="popular-tag">🍔 JUICY BURGERS</span>
        <h1>OUR BURGERS</h1>
        <p>Handcrafted burgers with premium ingredients</p>
      </div>

      {/* BURGER ITEMS - Equal Cards with Price + SELECT */}
      <div className="popular-grid">
        {burgers.map((item, i) => (
          <div
            key={i}
            className={`product-card ${selectedItem?.name === item.name ? "active" : ""}`}
            onClick={() => handleSelectItem(item)}
          >
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

            {/* Price + SELECT Row */}
            <div className="popular-price-row">
              <span className="popular-price">Rs. {item.price}</span>
              <span className={`select-indicator ${selectedItem?.name === item.name ? 'selected' : ''}`}>
                {selectedItem?.name === item.name ? '✓ SELECTED' : 'SELECT'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* CUSTOMIZE SECTION */}
      {selectedItem && (
        <>
          <div className="custom-section">
            <h2 className="custom-title">CUSTOMIZE YOUR ORDER</h2>
            <p className="custom-subtitle">Selected: {selectedItem.name}</p>
          </div>

          <OptionGroup
            title="CHEESE"
            items={[
              { name: "Cheddar", img: "/images/cheddar.png" },
              { name: "Mozzarella", img: "/images/mozrella.png" },
              { name: "Swiss", img: "/images/swiss.png" },
            ]}
            onSelect={(item) => setSelectedOptions({ ...selectedOptions, Cheese: item.name })}
          />

          <OptionGroup
            title="SAUCES"
            items={[
              { name: "Ketchup", img: "/images/Ketchup.png" },
              { name: "BBQ", img: "/images/BBQ.png" },
              { name: "Garlic Mayo", img: "/images/garlic.png" },
            ]}
            onSelect={(item) => setSelectedOptions({ ...selectedOptions, Sauce: item.name })}
          />

          <OptionGroup
            title="VEGETABLES"
            items={[
              { name: "Lettuce", img: "/images/lettuce.png" },
              { name: "Onion", img: "/images/onion.png" },
              { name: "Tomato", img: "/images/tomato.png" },
            ]}
            onSelect={(item) => setSelectedOptions({ ...selectedOptions, Veggies: item.name })}
          />

          <button className="cart-btn" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </>
      )}
    </div>
  );
}