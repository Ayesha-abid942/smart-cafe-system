import * as React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import "./Table.css";

const socket = io("http://localhost:8001");

// 🎨 STATUS STYLE
const makeStyle = (status) => {
    if (status === "pending") {
        return { background: "#fff3cd", color: "#856404" };
    } else if (status === "cooking") {
        return { background: "#ffe0b2", color: "#e65100" };
    } else if (status === "ready") {
        return { background: "#d1ecf1", color: "#0c5460" };
    } else {
        return { background: "#d4edda", color: "#155724" };
    }
};

export default function BasicTable() {
    const [rows, setRows] = useState([]);

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

    // 🔥 FORMAT FUNCTION
    const formatOrder = (item) => {
        const items = getItems(item);

        return {
            id: item.id,
            customer: item.customer_name,
            items:
                items
                    .slice(0, 2)
                    .map((i) => `${i.name} x${i.qty}`)
                    .join(", ") +
                (items.length > 2 ? "..." : ""),
            total: item.total_price,
            date: item.created_at
                ? new Date(item.created_at).toLocaleDateString("en-GB")
                : "-",
            status: item.status || "pending",
        };
    };

    // ================= FETCH =================
    const fetchOrders = async () => {
        const res = await axios.get("http://localhost:8001/orders");

        const latest = res.data
            .slice(0, 5) // ✅ LIMIT 5
            .map(formatOrder);

        setRows(latest);
    };

    useEffect(() => {
        fetchOrders();

        // 🔥 NEW ORDER REAL-TIME
        socket.on("newOrder", (order) => {
            setRows((prev) => {
                const updated = [formatOrder(order), ...prev];
                return updated.slice(0, 5); // keep only 5
            });
        });

        // 🔥 STATUS UPDATE REAL-TIME
        socket.on("orderUpdated", ({ id, status }) => {
            setRows((prev) =>
                prev.map((o) =>
                    o.id === Number(id) ? { ...o, status } : o
                )
            );
        });

        return () => {
            socket.off("newOrder");
            socket.off("orderUpdated");
        };
    }, []);

    return (
        <div className="Table">
            <h3>Recent Orders</h3>

            <TableContainer component={Paper}>
                <Table>

                    {/* HEAD */}
                    <TableHead>
                        <TableRow>
                            <TableCell>Customer</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Total</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>

                    {/* BODY */}
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.customer}</TableCell>
                                <TableCell>{row.items}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>Rs {row.total}</TableCell>

                                <TableCell>
                                    <span
                                        className="status"
                                        style={makeStyle(row.status)}
                                    >
                                        {row.status}
                                    </span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
            </TableContainer>
        </div>
    );
}