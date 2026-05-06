import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "../../components/Cards/Cards";
import "./Analytics.css";

import {
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilClipboardAlt,
    UilCommentAltMessage
} from "@iconscout/react-unicons";

const Analytics = () => {
    const [sales, setSales] = useState([]);
    const [revenue, setRevenue] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [messages, setMessages] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesRes, revenueRes, expenseRes, msgRes] =
                    await Promise.all([
                        axios.get("http://localhost:8001/sales-weekly"),
                        axios.get("http://localhost:8001/total-sales"),
                        axios.get("http://localhost:8001/total-expenses"),
                        axios.get("http://localhost:8001/total-messages"),
                    ]);

                setSales(salesRes.data || []);
                setRevenue(revenueRes.data?.total || 0);
                setExpenses(expenseRes.data?.total || 0);
                setMessages(msgRes.data?.total || 0);

            } catch (err) {
                console.log("Analytics Error:", err);
            }
        };

        fetchData();
    }, []);

    // 📊 chart labels
    const chartDates = sales.map((d) => {
        const date = new Date(d.day);
        return ` ${date.getDate()} -${date.getMonth() + 1}`;
    });

    // 📊 total sales
    const totalSales = sales.reduce(
        (acc, d) => acc + Number(d.total || 0),
        0
    );

    // 🔥 FIXED percentage logic (proper scaling)
    const safePercent = (value, max) => {
        if (!max || max === 0) return 0;
        return Math.min(100, Math.round((value / max) * 100));
    };

    // 🔥 dynamic max values
    const salesValues = sales.map(d => Number(d.total || 0));
    const maxSales = Math.max(...salesValues, 1);
    const expenseValues = sales.map(d => Number(d.total || 0) * 0.3);
    const maxExpenses = Math.max(...expenseValues, 1);

    const cardsData = [
        {
            title: "Sales",
            color: {
                backGround: "linear-gradient(180deg,#bb67ff,#c484f3)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: safePercent(totalSales, maxSales),
            value: totalSales,
            png: UilUsdSquare,
            categories: chartDates,
            series: [{ name: "Sales", data: salesValues }],
        },
        {
            title: "Revenue",
            color: {
                backGround: "linear-gradient(180deg,#FF919D,#FC929D)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: safePercent(revenue, Math.max(revenue, 1)),
            value: revenue,
            png: UilMoneyWithdrawal,
            categories: chartDates,
            series: [{ name: "Revenue", data: salesValues }],
        },
        {
            title: "Expenses",
            color: {
                backGround: "linear-gradient(#f8d49a,#ffca71)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: safePercent(expenses, maxExpenses),
            value: expenses,
            png: UilClipboardAlt,
            categories: chartDates,
            series: [{ name: "Expenses", data: expenseValues }],
        },
        {
            title: "Messages",
            color: {
                backGround: "linear-gradient(180deg,#00c6ff,#0072ff)",
                boxShadow: "0px 10px 20px 0px #a3d8ff",
            },
            barValue: safePercent(messages, 10), // 👈 small scale so change visible
            value: messages,
            png: UilCommentAltMessage,
            categories: chartDates,
            series: [
                {
                    name: "Messages",
                    data: Array(chartDates.length || 1).fill(messages),
                },
            ],
        }
    ];

    return (
        <div className="page-container">
            <div className="page-box">

                <div className="analytics-header">
                    <h1 className="page-title">ANALYTICS DASHBOARD</h1>
                </div>

                <Cards
                    data={{
                        sales: totalSales,
                        salesPercent: safePercent(totalSales, maxSales),
                        salesChart: salesValues,

                        revenue: revenue,
                        revenuePercent: safePercent(revenue, Math.max(revenue, 1)),
                        revenueChart: salesValues,

                        expenses: expenses,
                        expensesPercent: safePercent(expenses, maxExpenses),
                        expensesChart: expenseValues,

                        messages: messages,
                        messagesPercent: safePercent(messages, 10) // 👈 dashboard only
                    }}
                    showMessages={true}
                />

            </div>
        </div>
    );
};

export default Analytics;