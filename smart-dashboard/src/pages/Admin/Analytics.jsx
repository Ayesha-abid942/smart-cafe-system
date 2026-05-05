import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
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

    // Labels for chart
    const chartDates = sales.map((d) => {
        const date = new Date(d.day);
        return ` ${date.getDate()}-${date.getMonth() + 1}`;
    });

    // Total sales
    const totalSales = sales.reduce(
        (acc, d) => acc + Number(d.total || 0),
        0
    );

    // Safe percentage helper (crash proof)
    const safePercent = (value, max) => {
        if (!max || max === 0) return 0;
        return Math.min(100, Math.round((value / max) * 100));
    };

    const cardsData = [
        {
            title: "Sales",
            color: {
                backGround: "linear-gradient(180deg,#bb67ff,#c484f3)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: safePercent(totalSales, 10000),
            value: totalSales,
            png: UilUsdSquare,
            categories: chartDates,
            series: [
                {
                    name: "Sales",
                    data: sales.map((d) => Number(d.total || 0)),
                },
            ],
        },
        {
            title: "Revenue",
            color: {
                backGround: "linear-gradient(180deg,#FF919D,#FC929D)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: safePercent(revenue, 150000),
            value: revenue,
            png: UilMoneyWithdrawal,
            categories: chartDates,
            series: [
                {
                    name: "Revenue",
                    data: sales.map((d) => Number(d.total || 0)),
                },
            ],
        },
        {
            title: "Expenses",
            color: {
                backGround: "linear-gradient(#f8d49a,#ffca71)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: safePercent(expenses, revenue),
            value: expenses,
            png: UilClipboardAlt,
            categories: chartDates,
            series: [
                {
                    name: "Expenses",
                    data: sales.map((d) =>
                        Math.round(Number(d.total || 0) * 0.3)
                    ),
                },
            ],
        },
        {
            title: "Messages",
            color: {
                backGround: "linear-gradient(180deg,#00c6ff,#0072ff)",
                boxShadow: "0px 10px 20px 0px #a3d8ff",
            },
            barValue: safePercent(messages, 50),
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
                        salesPercent: safePercent(totalSales, 10000),
                        salesChart: sales.map(d => Number(d.total || 0)),

                        revenue: revenue,
                        revenuePercent: safePercent(revenue, 150000),
                        revenueChart: sales.map(d => Number(d.total || 0)),

                        expenses: expenses,
                        expensesPercent: safePercent(expenses, revenue),
                        expensesChart: sales.map(d => Number(d.total || 0)),
                    }}
                />
                />
            </div>
        </div>
    );
};

export default Analytics;