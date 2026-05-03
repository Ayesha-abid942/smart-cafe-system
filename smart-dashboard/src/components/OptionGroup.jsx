import { useState } from "react";
import "../style.css";

export default function OptionGroup({ title, items, onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (item) => {
    setSelected(item.name);
    if (onSelect) onSelect(item);
  };

  return (
    <div className="group">
      <h2 className="group-title">{title}</h2>
      <div className="options">
        {items.map((item, i) => (
          <div
            className={`option-card ${selected === item.name ? 'selected' : ''}`}
            key={i}
            onClick={() => handleSelect(item)}
          >
            <div className="option-img-circle">
              <img src={item.img} alt={item.name} />
            </div>
            <p>{item.name}</p>
            {selected === item.name && <span className="option-check">✓</span>}
          </div>
        ))}
      </div>
    </div>
  );
}