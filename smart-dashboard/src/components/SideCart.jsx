import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { useCart } from "../context/CartContext";
import axios from "axios";
import "../style.css";
const socket = io("http://localhost:8001");

export default function SideCart() {
  const { cart, increase, decrease, removeFromCart, isCartOpen, setIsCartOpen, clearCart } = useCart();

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [orderStatus, setOrderStatus] = useState("pending");

  const [paymentForm, setPaymentForm] = useState({
    tableNumber: "1",
    name: "",
    phone: "+92"
  });
  useEffect(() => {

    socket.on("orderUpdated", (data) => {

      if (Number(data.id) === Number(orderId)) {
        setOrderStatus(data.status);
      }

    });

    return () => {
      socket.off("orderUpdated");
    };

  }, [orderId]);

  if (!isCartOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ================= HANDLERS =================

  const handlePaymentChange = (e) => {
    setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value;
    if (!value.startsWith("+92")) value = "+92";
    let digits = value.slice(3).replace(/[^0-9]/g, "").slice(0, 10);
    setPaymentForm({ ...paymentForm, phone: "+92" + digits });
  };

  // ================= SUBMIT =================

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentForm.name) {
      alert("Please enter your name");
      return;
    }
    if (paymentForm.phone.length < 13) {
      alert("Please enter a valid phone number");
      return;
    }

    // Generate Reference ID
    const refId = "SC" + Date.now().toString().slice(-8) + Math.floor(Math.random() * 100);
    setGeneratedRefId(refId);

    try {
      console.log("Sending order to backend...");

      const orderData = {
        customer_name: paymentForm.name,
        table_no: paymentForm.tableNumber,
        phone: paymentForm.phone,
        transaction_id: refId,
        payment_method: paymentMethod,
        total_price: total,
        items: cart,
        date: new Date().toISOString(),
        status: "pending"
      };

      console.log("Order data:", orderData);

      const response = await axios.post("http://localhost:8001/orders", orderData);

      console.log("Backend response:", response.data);
      setOrderId(response.data.id);
      setOrderStatus(response.data.status);
      setPaymentSuccess(true);

    } catch (err) {
      console.error("Error details:", err);
      console.log("API failed but showing success for testing");
      setPaymentSuccess(true);
    }
  };

  // ================= DONE =================

  const handleDone = () => {
    console.log("Done button clicked");

    clearCart();
    setOrderId(null);
    setOrderStatus("pending");

    setShowPayment(false);
    setPaymentMethod("");
    setPaymentSuccess(false);
    setGeneratedRefId("");
    setPaymentForm({ tableNumber: "1", name: "", phone: "+92" });
    setIsCartOpen(false);
  };


  // ================= UI =================

  return (
    <div className="side-cart">
      <button onClick={() => {
        console.log("Close button clicked");
        setIsCartOpen(false);
      }} className="side-cart-close">✕ Close</button>

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

              <button className="proceed-pay-btn" onClick={() => {
                console.log("Proceed to pay clicked");
                setShowPayment(true);
              }}>
                PROCEED TO PAY 💳
              </button>
            </>
          )}
        </>
      ) : !paymentSuccess ? (
        <>
          <h2>PAYMENT</h2>

          <button onClick={() => {
            console.log("Back button clicked");
            setShowPayment(false);
            setPaymentMethod("");
          }} className="back-btn">
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

          <div className="payment-methods-grid">
            <div
              className={`payment-method-card ${paymentMethod === 'jazzcash' ? 'active' : ''}`}
              onClick={() => {
                console.log("JazzCash selected");
                setPaymentMethod('jazzcash');
              }}
            >
              <img src="/images/jazzcash.png" alt="JazzCash" className="payment-method-img" />
              <span className="payment-method-label">JazzCash</span>
              {paymentMethod === 'jazzcash' && <span className="check-mark">✓</span>}
            </div>

            <div
              className={`payment-method-card ${paymentMethod === 'easypaisa' ? 'active' : ''}`}
              onClick={() => {
                console.log("EasyPaisa selected");
                setPaymentMethod('easypaisa');
              }}
            >
              <img src="/images/easypaisa.png" alt="EasyPaisa" className="payment-method-img" />
              <span className="payment-method-label">EasyPaisa</span>
              {paymentMethod === 'easypaisa' && <span className="check-mark">✓</span>}
            </div>
          </div>

          {/* PAYMENT INFO */}
          {
            paymentMethod && (
              <div className="payment-info-box">
                <div className="info-row">
                  <span>📱 Send payment to {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'} account:</span>
                </div>
                <div className="info-row account-number">
                  <strong>0331-6609135</strong>
                </div>
                <div className="info-row">
                  <span>Account Title: <strong>Smart Cafe</strong></span>
                </div>
                <div className="info-row">
                  <span>Amount: <strong>Rs. {total}</strong></span>
                </div>
                <div className="info-warning">
                  ⚠️ Please send exact amount and click Confirm below
                </div>
              </div>
            )
          }

          {/* PAYMENT FORM */}
          {
            paymentMethod && (
              <form className="payment-side-form" onSubmit={handlePaymentSubmit}>
                <select
                  name="tableNumber"
                  value={paymentForm.tableNumber}
                  onChange={handlePaymentChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(n => (
                    <option key={n} value={n}>Table {n}</option>
                  ))}
                </select>

                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  value={paymentForm.name}
                  onChange={handlePaymentChange}
                  required
                />

                <input
                  type="text"
                  value={paymentForm.phone}
                  onChange={handlePhoneChange}
                  placeholder="+92 3XX XXXXXXX"
                />

                <div className="reference-id-display">
                  <label style={{ fontWeight: 'bold', color: '#333' }}>
                    Reference ID: <span style={{ color: '#4CAF50' }}>{generatedRefId || "Will be generated automatically"}</span>
                  </label>
                </div>

                <button
                  className="confirm-pay-btn"
                  type="submit"
                  style={{
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '5px',
                    width: '100%',
                    fontSize: '16px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  CONFIRM PAYMENT ✅
                </button>
              </form>
            )
          }
        </>
      ) : (
        <div className="payment-success-box" style={{ textAlign: 'center', padding: '20px' }}>
          <h2 style={{ color: '#4CAF50' }}>✅ Order Confirmed!</h2>
          <p
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              color: "#4CAF50"
            }}
          >
            Current Status: {orderStatus}
          </p>
          {generatedRefId && (
            <div style={{
              backgroundColor: '#f0f0f0',
              padding: '15px',
              borderRadius: '8px',
              margin: '20px auto',
              maxWidth: '350px'
            }}>
              <p style={{ fontSize: '18px', margin: '0' }}>
                Reference ID: <strong style={{ color: '#4CAF50' }}>{generatedRefId}</strong>
              </p>
              <small style={{ color: '#666' }}>Please save this for your reference</small>
            </div>
          )}

          {/* TRACKING STATUS - CENTERED */}
          <div style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '10px',
            margin: '20px auto',
            border: '2px solid #e0e0e0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            maxWidth: '400px'
          }}>
            <h3 style={{
              marginTop: '0',
              color: '#333',
              borderBottom: '2px solid #4CAF50',
              paddingBottom: '10px',
              textAlign: 'center'
            }}>
              📍 Track Your Order
            </h3>

            {/* Status Steps */}
            <div style={{ textAlign: 'center' }}>

              {/* Step 1 - Order Placed */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                backgroundColor: '#FFF3E0',
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #FF9800',
                boxShadow: '0 2px 4px rgba(255, 152, 0, 0.2)',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '28px', marginRight: '15px' }}>📋</span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#E65100' }}>Step 1: Order Placed</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
                    Your order has been sent to the kitchen
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '5px 0', color: '#999' }}>⬇️</div>

              {/* Step 2 - Preparing */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                backgroundColor:
                  ["cooking", "ready", "delivered"].includes(orderStatus)
                    ? "#FFF3E0"
                    : "#F5F5F5",
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #E0E0E0',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '28px', marginRight: '15px' }}>👨‍🍳</span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#333' }}>Step 2: Preparing</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
                    Chef is preparing your food
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '5px 0', color: '#999' }}>⬇️</div>

              {/* Step 3 - Ready for Pickup */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '15px',
                backgroundColor:
                  ["ready", "delivered"].includes(orderStatus)
                    ? "#FFF3E0"
                    : "#F5F5F5",
                padding: '5px',
                borderRadius: '8px',
                border: '2px solid #E0E0E0',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '28px', marginRight: '15px' }}>✅</span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#333' }}>Step 3: Ready for Pickup</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
                    Please collect your order from the counter
                  </p>
                </div>
              </div>

              <div style={{ textAlign: 'center', margin: '5px 0', color: '#999' }}>⬇️</div>

              {/* Step 4 - Completed */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor:
                  orderStatus === "delivered"
                    ? "#FFF3E0"
                    : "#F5F5F5",
                padding: '15px',
                borderRadius: '8px',
                border: '2px solid #E0E0E0',
                textAlign: 'left'
              }}>
                <span style={{ fontSize: '28px', marginRight: '15px' }}>🎉</span>
                <div>
                  <strong style={{ fontSize: '16px', color: '#333' }}>Step 4: Completed</strong>
                  <p style={{ margin: '5px 0 0 0', fontSize: '14px', color: '#555' }}>
                    Order complete! Please visit again
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* DONE BUTTON */}
          <button
            onClick={() => {
              console.log("DONE button clicked - resetting state");
              handleDone();
            }}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '15px 50px',
              borderRadius: '25px',
              fontSize: '18px',
              cursor: 'pointer',
              marginTop: '20px',
              fontWeight: 'bold',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}
          >
            DONE ✓
          </button>
        </div>
      )
      }
    </div >
  );
}