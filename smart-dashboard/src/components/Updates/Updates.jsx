import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import "./Updates.css";

const socket = io("http://localhost:8001");

const Updates = () => {
    const [alerts, setAlerts] = useState([]);
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {

        // ================= INVENTORY =================
        const fetchInventory = async () => {
            const res = await axios.get("http://localhost:8001/inventory");

            const filtered = res.data
                .filter((item) => item.quantity <= 5)
                .slice(0, 4)
                .map((item) => ({
                    type: "stock",
                    name: item.name,
                    quantity: item.quantity
                }));

            setAlerts(filtered);
        };

        fetchInventory();

        // ================= LOW STOCK REALTIME =================
        socket.on("lowStock", (item) => {
            setAlerts((prev) => {
                const exists = prev.find(
                    (a) => a.name === item.name
                );

                if (exists) {
                    return prev.map((a) =>
                        a.name === item.name
                            ? {
                                ...a,
                                quantity: item.quantity
                            }
                            : a
                    );
                }

                return [
                    {
                        type: "stock",
                        name: item.name,
                        quantity: item.quantity
                    },
                    ...prev
                ].slice(0, 6);
            });
        });

        // ================= CONTACT MESSAGES =================
        socket.on("newMessage", (msg) => {
            setMessages((prev) => [
                {
                    type: "message",
                    name: msg.name,
                    email: msg.email,
                    message: msg.message
                },
                ...prev
            ].slice(0, 6));
        });

        return () => {
            socket.off("lowStock");
            socket.off("newMessage");
        };

    }, []);

    return (
        <div className="updates">

            {/* ================= STOCK ALERTS ================= */}

            {alerts.map((a, i) => (
                <div
                    key={"s" + i}
                    className="update-card"
                >
                    <div className="name">
                        {a.name}
                    </div>

                    <div
                        className={`status ${a.quantity <= 3
                            ? "critical"
                            : "low"
                            }`}
                    >
                        {a.quantity <= 3
                            ? `🚨 Critical (${a.quantity})`
                            : `⚠️ Low (${a.quantity})`}
                    </div>
                </div>
            ))}

            {/* ================= MESSAGES ================= */}

            {messages.map((m, i) => (
                <div
                    key={"m" + i}
                    className="update-card message-card"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        navigate(
                            "/admin/analytics#messages-section"
                        )
                    }
                >
                    <div className="msg-header">
                        <strong>{m.name}</strong>
                    </div>

                    <div className="msg-email">
                        {m.email}
                    </div>

                    <div className="msg-body">
                        {m.message}
                    </div>
                </div>
            ))}

            {alerts.length === 0 &&
                messages.length === 0 && (
                    <p className="no-alerts">
                        ✅ No updates
                    </p>
                )}

        </div>
    );
};

export default Updates;