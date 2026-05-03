import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./KDS.css";


const socket = io("http://localhost:8001");

const KDS = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // ================= FETCH =================
    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:8001/orders");

        // ❌ delivered hide
        const filtered = res.data.filter(o => o.status !== "delivered");

        setOrders(filtered);
    };

    useEffect(() => {
        fetchOrders();

        socket.on("newOrder", (order) => {
            setOrders((prev) => [order, ...prev]);
        });

        socket.on("orderUpdated", (updated) => {

            // ✅ remove delivered
            if (updated.status === "delivered") {
                setOrders(prev =>
                    prev.filter(o => o.id !== Number(updated.id))
                );
                return;
            }

            setOrders((prev) =>
                prev.map((o) =>
                    o.id === Number(updated.id)
                        ? { ...o, status: updated.status }
                        : o
                )
            );
        });

        return () => {
            socket.off("newOrder");
            socket.off("orderUpdated");
        };
    }, []);

    // ================= UPDATE =================
    const updateStatus = async (id, status) => {
        await axios.put(`http://localhost:8001/orders/${id}`, { status });
    };

    return (
        <div className="kds-container">

            {/* HEADER */}
            <div className="kds-header">
                <h2>Kitchen Display System</h2>
            </div>

            {/* GRID */}
            <div className="kds-grid">

                {orders.map((order) => (
                    <div
                        className="kds-card"
                        key={order.id}
                        onClick={() => setSelectedOrder(order)}
                    >

                        <div className="card-header">
                            <span>Table #{order.table_no}</span>
                            <span className={`status ${order.status}`}>
                                {order.status}
                            </span>
                        </div>

                        <div className="card-body">
                            <div className="items-list">
                                {order.items &&
                                    (typeof order.items === "string"
                                        ? JSON.parse(order.items)
                                        : order.items
                                    ).map((item, i) => (
                                        <p key={i}>
                                            {item.name} x {item.qty}
                                        </p>
                                    ))
                                }
                            </div>
                            <p>👤 {order.customer_name}</p>
                            <p>💰 Rs {order.total_price}</p>
                        </div>

                    </div>
                ))}

            </div>

            {/* DETAILS PANEL */}
            {
                selectedOrder && (
                    <div
                        className="kds-detail"
                        onClick={() => setSelectedOrder(null)} // ✅ background click close
                    >
                        <div
                            className="detail-box"
                            onClick={(e) => e.stopPropagation()} // ✅ prevent close
                        >

                            <h2>Order Details</h2>

                            <p><b>Customer:</b> {selectedOrder.customer_name}</p>
                            <p><b>Items:</b></p>

                            {selectedOrder.items &&
                                (typeof selectedOrder.items === "string"
                                    ? JSON.parse(selectedOrder.items)
                                    : selectedOrder.items
                                ).map((item, i) => (
                                    <p key={i}>
                                        {item.name} x {item.qty}
                                    </p>
                                ))}
                            <p><b>Price:</b> Rs {selectedOrder.total_price}</p>
                            <p><b>Status:</b> {selectedOrder.status}</p>
                            <p><b>Table:</b> {selectedOrder.table_no}</p>

                            <div className="buttons">

                                {/* START */}
                                <button
                                    onClick={() => {
                                        updateStatus(selectedOrder.id, "cooking");

                                        // ✅ popup close
                                        setSelectedOrder(null);
                                    }}
                                >
                                    Start
                                </button>

                                {/* READY */}
                                <button
                                    onClick={() => {
                                        updateStatus(selectedOrder.id, "ready");

                                        // ✅ popup close
                                        setSelectedOrder(null);

                                        // ⏱ auto delivered
                                        setTimeout(() => {
                                            updateStatus(selectedOrder.id, "delivered");
                                        }, 5000);
                                    }}
                                >
                                    Ready
                                </button>

                            </div>

                        </div>

                    </div>

                )
            }

        </div >
    );
};

export default KDS;