import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./Updates.css";

const socket = io("http://localhost:8001");

const Updates = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {

        // 🔹 1. INITIAL LOAD (API)
        const fetchData = async () => {
            const res = await axios.get("http://localhost:8001/inventory");

            const filtered = res.data
                .filter((item) => item.quantity <= 5)
                .slice(0, 4)
                .map((item) => ({
                    name: item.name,
                    quantity: item.quantity
                }));

            setAlerts(filtered);
        };

        fetchData();

        // 🔹 2. REAL-TIME LISTENER
        socket.on("lowStock", (item) => {
            console.log("⚡ Real-time low stock:", item);

            setAlerts((prev) => {
                const exists = prev.find(a => a.name === item.name);

                if (exists) {
                    // update quantity
                    return prev.map(a =>
                        a.name === item.name
                            ? { ...a, quantity: item.quantity }
                            : a
                    );
                } else {
                    // add new alert on top
                    return [
                        { name: item.name, quantity: item.quantity },
                        ...prev
                    ].slice(0, 4);
                }
            });
        });

        // 🔹 cleanup
        return () => {
            socket.off("lowStock");
        };

    }, []);

    return (
        <div className="updates">

            {alerts.length === 0 && (
                <p className="no-alerts">✅ All stock OK</p>
            )}

            {alerts.map((a, i) => (
                <div key={i} className="update-card">
                    <div className="name">{a.name}</div>

                    <div className={`status ${a.quantity <= 3 ? "critical" : "low"}`}>
                        {a.quantity <= 3
                            ? ` 🚨 Critical (${a.quantity})`
                            : `⚠️ Low (${a.quantity})`}
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Updates;