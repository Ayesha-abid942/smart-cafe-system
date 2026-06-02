import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import "./Analytics.css";

const Analytics = () => {
    const [sales, setSales] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [messages, setMessages] = useState(0);
    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [
                salesRes,
                revenueRes,
                expenseRes,
                msgRes,
                messagesRes
            ] = await Promise.all([
                axios.get("http://localhost:8001/sales-weekly"),
                axios.get("http://localhost:8001/total-sales"),
                axios.get("http://localhost:8001/total-expenses"),
                axios.get("http://localhost:8001/total-messages"),
                axios.get("http://localhost:8001/api/messages"),
            ]);

            setSales(salesRes.data || []);
            setRevenue(revenueRes.data?.total || 0);
            setExpenses(expenseRes.data?.total || 0);
            setMessages(msgRes.data?.total || 0);
            setAllMessages(messagesRes.data || []);

        } catch (err) {
            console.log("Analytics Error:", err);
        }
    };

    const deleteMessage = async (id) => {
        try {
            await axios.delete(
                ` http://localhost:8001/api/messages/${id}`
            );

            setAllMessages(
                allMessages.filter((msg) => msg.id !== id)
            );

            setMessages((prev) => prev - 1);

        } catch (err) {
            console.log("Delete Error:", err);
        }
    };

    const chartDates = sales.map((d) => {
        const date = new Date(d.day);
        return `${date.getDate()} -${date.getMonth() + 1}`;
    });

    const totalSales = sales.reduce(
        (acc, d) => acc + Number(d.total || 0),
        0
    );

    const safePercent = (value, max) => {
        if (!max || max === 0) return 0;
        return Math.min(100, Math.round((value / max) * 100));
    };

    const salesValues = sales.map(
        (d) => Number(d.total || 0)
    );

    const maxSales = Math.max(...salesValues, 1);

    const expenseValues = sales.map(
        (d) => Number(d.total || 0) * 0.3
    );

    const maxExpenses = Math.max(...expenseValues, 1);

    return (
        <div className="page-container">
            <div className="page-box">

                <div className="analytics-header">
                    <h1 className="page-title">
                        ANALYTICS DASHBOARD
                    </h1>
                </div>

                <Cards
                    data={{
                        sales: totalSales,
                        salesPercent: safePercent(
                            totalSales,
                            maxSales
                        ),
                        salesChart: salesValues,

                        revenue: revenue,
                        revenuePercent: safePercent(
                            revenue,
                            Math.max(revenue, 1)
                        ),
                        revenueChart: salesValues,

                        expenses: expenses,
                        expensesPercent: safePercent(
                            expenses,
                            maxExpenses
                        ),
                        expensesChart: expenseValues,

                        messages: messages,
                        messagesPercent: safePercent(
                            messages,
                            10
                        )
                    }}
                    showMessages={true}
                />

                {/* Messages Table */}

                <div
                    id="messages-section"
                    className="messages-section">

                    <div className="messages-header">
                        <h2>💬 Customer Messages</h2>
                        <span>
                            {allMessages.length} Messages
                        </span>
                    </div>

                    <div className="messages-table-container">

                        <table className="messages-table">

                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Message</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                {allMessages.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="4"
                                            className="empty-row"
                                        >
                                            No Messages Found
                                        </td>
                                    </tr>
                                ) : (
                                    allMessages.map((msg) => (
                                        <tr key={msg.id}>

                                            <td>{msg.name}</td>

                                            <td>{msg.email}</td>

                                            <td className="message-text">
                                                {msg.message}
                                            </td>

                                            <td>
                                                <button
                                                    className="delete-btn"
                                                    onClick={() =>
                                                        deleteMessage(msg.id)
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>

                                        </tr>
                                    ))
                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default Analytics;