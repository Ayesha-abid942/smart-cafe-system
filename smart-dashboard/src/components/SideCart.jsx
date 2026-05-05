import { useState } from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../style.css";

export default function SideCart() {
  const { cart, increase, decrease, removeFromCart, isCartOpen, setIsCartOpen, clearCart } = useCart();

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    cardName: ""
  });

  const [paymentForm, setPaymentForm] = useState({
    tableNumber: "1",
    name: "",
    phone: "+92",
    transactionId: ""
  });

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ================= HANDLERS =================

  const handlePaymentChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+92")) value = "+92";
    let digits = value.slice(3).replace(/[^0-9]/g, "").slice(0, 10);
    setPaymentForm({ ...paymentForm, phone: "+92" + digits });
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "").replace(/[^0-9]/g, "").slice(0, 16);
    let formatted = value.replace(/(.{4})/g, "$1 ").trim();
    setCardDetails({ ...cardDetails, cardNumber: formatted });
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "").slice(0, 4);
    if (value.length > 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    setCardDetails({ ...cardDetails, expiry: value });
  };

  const handleCvvChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
    setCardDetails({ ...cardDetails, cvv: value });
  };

  // ================= SUBMIT =================

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    // Card validation
    if (paymentMethod === 'card') {
      if (cardDetails.cardNumber.replace(/\s/g, "").length < 16) return alert("Invalid card number");
      if (cardDetails.expiry.length < 5) return alert("Invalid expiry");
      if (cardDetails.cvv.length < 3) return alert("Invalid CVV");
      if (!cardDetails.cardName) return alert("Enter card holder name");
    }

    try {
      await axios.post("http://localhost:8001/orders", {
        customer_name: paymentForm.name,
        table_no: paymentForm.tableNumber,
        phone: paymentForm.phone,
        transaction_id: paymentForm.transactionId,
        payment_method: paymentMethod,
        total_price: total,
        items: cart,

        // ✅ SAME DATE FORMAT (fix)
        date: new Date().toISOString(),

        status: "pending"
      });

      setPaymentSuccess(true);

    } catch (err) {
      console.log(err);
      alert("Order failed");
    }
  };

  // ================= DONE =================

  const handleDone = () => {
    clearCart();
    setShowPayment(false);
    setPaymentMethod("");
    setPaymentSuccess(false);
    setPaymentForm({ tableNumber: "1", name: "", phone: "+92", transactionId: "" });
    setCardDetails({ cardNumber: "", expiry: "", cvv: "", cardName: "" });
    setIsCartOpen(false);
  };

  // ================= UI =================

  return (
    <div className="side-cart">
      <button onClick={() => setIsCartOpen(false)} className="side-cart-close">✕ Close</button>

      {!showPayment ? (
        <>
          <h2>YOUR ORDER</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">No items in cart</p>
          ) : (
            <>
              {cart.map((item, i) => (
                <div key={i} className="side-item">
                  <p className="side-item-name">{item.name}</p>

                  {item.options && Object.entries(item.options).map(([key, value]) =>
                    value ? <p key={key} className="side-item-option">{key}: {value}</p> : null
                  )}

                  <p className="side-item-price">Rs. {item.price}</p>

                  <div className="qty-box">
                    {item.qty > 1 ? (
                      <button onClick={() => decrease(i)}>−</button>
                    ) : (
                      <button onClick={() => removeFromCart(i)} className="delete-btn">🗑️</button>
                    )}
                    <span>{item.qty}</span>
                    <button onClick={() => increase(i)}>+</button>
                  </div>
                </div>
              ))}

              <h3>Total: Rs. {total}</h3>

              <button className="proceed-pay-btn" onClick={() => setShowPayment(true)}>
                PROCEED TO PAY 💳
              </button>
            </>
          )}
        </>
      ) : !paymentSuccess ? (
        <>
          <h2>PAYMENT</h2>

          <button onClick={() => setShowPayment(false)} className="back-btn">
            ← Back to Cart
          </button>

          {/* ORDER SUMMARY */}
          <div className="payment-order-summary">
            <h4>Order Summary</h4>
            {cart.map((item, i) => (
              <div key={i} className="payment-summary-item">
                <span>{item.qty}x {item.name}</span>
                <span>Rs. {item.price * item.qty}</span>
              </div>
            ))}
            <div className="payment-summary-total">
              <strong>TOTAL: Rs. {total}</strong>
            </div>
          </div>

          <h4 className="payment-method-title">SELECT PAYMENT METHOD</h4>

          {/* ✅ IMAGES SAME */}
          <div className="payment-methods-grid">
            <div className={`payment-method-card ${paymentMethod === 'jazzcash' ? 'active' : ''}`} onClick={() => setPaymentMethod('jazzcash')}>
              <img src="/images/jazzcash.png" className="payment-method-img" />
              {paymentMethod === 'jazzcash' && <span className="check-mark">✓</span>}
            </div>

            <div className={`payment-method-card ${paymentMethod === 'easypaisa' ? 'active' : ''}`} onClick={() => setPaymentMethod('easypaisa')}>
              <img src="/images/easypaisa.png" className="payment-method-img" />
              {paymentMethod === 'easypaisa' && <span className="check-mark">✓</span>}
            </div>

            <div className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`} onClick={() => setPaymentMethod('card')}>
              <img src="/images/card.png" className="payment-method-img" />
              {paymentMethod === 'card' && <span className="check-mark">✓</span>}
            </div>
          </div >
          {paymentMethod === "jazzcash" && (
            <div className="payment-info-box">
              <div className="info-row">
                <span>📱 Send Rs. {total} to:</span>
              </div>

              <div className="info-row">
                <strong>JazzCash: 03001234567</strong>
              </div>

              <div className="info-row">
                <span>Account Name: Smart Cafe</span>
              </div>

              <div className="info-warning">
                ⚠️ Enter TID after payment
              </div>
            </div>
          )}

          {paymentMethod === "easypaisa" && (
            <div className="payment-info-box">
              <div className="info-row">
                <span>📱 Send Rs. {total} to:</span>
              </div>

              <div className="info-row">
                <strong>Easypaisa: 03123456789</strong>
              </div>

              <div className="info-row">
                <span>Account Name: Smart Cafe</span>
              </div>

              <div className="info-warning">
                ⚠️ Enter TID after payment
              </div>
            </div>
          )}


          {paymentMethod && (
            <form className="payment-side-form" onSubmit={handlePaymentSubmit}>
              <select name="tableNumber" value={paymentForm.tableNumber} onChange={handlePaymentChange}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                  <option key={n} value={n}>Table {n}</option>
                ))}
              </select>

              <input type="text" name="name" placeholder="Your Name" value={paymentForm.name} onChange={handlePaymentChange} required />
              <input type="text" value={paymentForm.phone} onChange={handlePhoneChange} />

              {paymentMethod === 'card' ? (
                <>
                  <input placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleCardNumberChange} />
                  <input placeholder="MM/YY" value={cardDetails.expiry} onChange={handleExpiryChange} />
                  <input placeholder="CVV" value={cardDetails.cvv} onChange={handleCvvChange} />
                  <input placeholder="Card Holder Name" value={cardDetails.cardName} onChange={handleCardChange} />
                </>
              ) : (
                <input name="transactionId" placeholder="Transaction ID" value={paymentForm.transactionId} onChange={handlePaymentChange} />
              )}

              <button className="confirm-pay-btn" type="submit">
                {paymentMethod === 'card' ? `PAY Rs. ${total}` : "CONFIRM PAYMENT"}
              </button>
            </form>
          )
          }
        </>
      ) : (
        <div className="payment-success-box">
          <h2>✅ Payment Confirmed!</h2>
          <p>Order sent to kitchen 🍽️</p>
          <button onClick={handleDone} className="done-btn">DONE</button>
        </div>
      )}
    </div >
  );
}