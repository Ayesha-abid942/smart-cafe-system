import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:8001/orders");
        setOrders(res.data);
    };

    // ✅ SAFE PARSE
    const getItems = (order) => {
        if (!order.items) return [];

        try {
            const parsed =
                typeof order.items === "string"
                    ? JSON.parse(order.items)
                    : order.items;

            return Array.isArray(parsed) ? parsed : [];
        } catch {
            return [];
        }
    };

    return (
        <div className="page-container">
            <div className="page-box">
                <h1 className="page-title">Orders</h1>

                {/* GRID */}
                <div className="orders-grid">
                    {orders.map((order) => {
                        const items = getItems(order);

                        return (
                            <div
                                className="order-card"
                                key={order.id}
                                onClick={() => setSelectedOrder(order)}
                            >
                                <h3>{order.customer_name}</h3>

                                {/* ITEMS */}
                                {items.length > 0 ? (
                                    items.map((item, i) => (
                                        <p key={i}>
                                            🍽 {item.name} x {item.qty}
                                        </p>
                                    ))
                                ) : (
                                    <p>No items</p>
                                )}

                                <p className="price">💰 Rs {order.total_price}</p>

                                <span className={`status ${order.status}`}>
                                    {order.status}
                                </span>
                            </div>
                        );
                    })}
                </div>

                {/* POPUP */}
                {
                    selectedOrder && (
                        <div className="order-popup">
                            <div className="popup-box">
                                <h2>Order Details</h2>

                                <div className="detail-row">
                                    <span>Customer:</span>
                                    <span>{selectedOrder.customer_name}</span>
                                </div>

                                <div className="detail-row">
                                    <span>Table:</span>
                                    <span>{selectedOrder.table_no}</span>
                                </div>

                                <div className="detail-row">
                                    <span>Status:</span>
                                    <span className={`status ${selectedOrder.status}`}>
                                        {selectedOrder.status}
                                    </span>
                                </div>

                                <div className="items-box">
                                    <h4>Items</h4>

                                    {(() => {
                                        const items = getItems(selectedOrder);

                                        return items.length > 0 ? (
                                            items.map((item, i) => (
                                                <div className="item-row" key={i}>
                                                    <span>{item.name}</span>
                                                    <span>x {item.qty}</span>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No items</p>
                                        );
                                    })()}
                                </div>

                                <div className="detail-row total">
                                    <span>Total:</span>
                                    <span>Rs {selectedOrder.total_price}</span>
                                </div>

                                <button onClick={() => setSelectedOrder(null)}>
                                    Close
                                </button>
                            </div>
                        </div >
                    )}
            </div >
        </div>
    );
};

export default Orders;