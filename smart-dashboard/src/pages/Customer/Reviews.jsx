import { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "../../style.css";

const socket = io("http://localhost:8001");

export default function Reviews() {

  const [reviews, setReviews] = useState([]);

  const [form, setForm] = useState({
    name: "",
    text: "",
    rating: 5,
  });

  // LOAD + SOCKET LISTEN
  useEffect(() => {
    fetchReviews();

    socket.on("newReview", (review) => {
      setReviews(prev => [review, ...prev]);
    });

    return () => socket.off("newReview");
  }, []);

  const fetchReviews = () => {
    axios.get("http://localhost:8001/api/reviews")
      .then(res => setReviews(res.data));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8001/api/reviews", {
      name: form.name,
      message: form.text,
      rating: form.rating
    });

    setForm({ name: "", text: "", rating: 5 });
  };

  return (
    <div className="reviews-page">

      <div className="menu-page-header">
        <h1>Customer Reviews</h1>
        <p>Share your experience</p>
      </div>

      {/* FORM */}
      <form className="review-form" onSubmit={handleSubmit}>
        <input
          placeholder="Your Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <textarea
          placeholder="Write review..."
          value={form.text}
          onChange={(e) => setForm({ ...form, text: e.target.value })}
          required
        />

        <select
          value={form.rating}
          onChange={(e) => setForm({ ...form, rating: e.target.value })}
        >
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <button type="submit">Submit</button>
      </form>

      {/* LIST */}
      <div className="reviews-grid">
        {reviews.map((r) => (
          <div className="review-card" key={r.id}>
            <img src="/images/user.png" alt="" className="review-img" />
            <h3>{r.name}</h3>
            <div>{"⭐".repeat(r.rating)}</div>
            <p>"{r.message}"</p>
          </div>
        ))}
      </div>

    </div>
  );
}