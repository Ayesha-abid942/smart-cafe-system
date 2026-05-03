import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../../components/Card/Card";
import "./Analytics.css";

import {
    UilUsdSquare,
    UilMoneyWithdrawal,
    UilClipboardAlt,
} from "@iconscout/react-unicons";

const Analytics = () => {
    const [sales, setSales] = useState([]);
    const [revenue, setRevenue] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const salesRes = await axios.get("http://localhost:8001/sales-weekly");
                const revenueRes = await axios.get("http://localhost:8001/total-sales");

                setSales(salesRes.data || []);
                setRevenue(revenueRes.data.total || 0);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const totalSales = revenue;
    const expenses = Math.round(revenue * 0.3);

    const chartDates = sales.map((d) => {
        const date = new Date(d.day);
        return `${date.getDate()}-${date.getMonth() + 1}`;
    });

    const cardsData = [
        {
            title: "Sales",
            color: {
                backGround: "linear-gradient(180deg,#bb67ff,#c484f3)",
                boxShadow: "0px 10px 20px 0px #e0c6f5",
            },
            barValue: 70,
            value: totalSales,
            png: UilUsdSquare,
            categories: chartDates,
            series: [
                {
                    name: "Sales",
                    data: sales.map((d) => Number(d.total) || 0),
                },
            ],
        },
        {
            title: "Revenue",
            color: {
                backGround: "linear-gradient(180deg,#FF919D,#FC929D)",
                boxShadow: "0px 10px 20px 0px #FDC0C7",
            },
            barValue: 80,
            value: revenue,
            png: UilMoneyWithdrawal,
            categories: chartDates,
            series: [
                {
                    name: "Revenue",
                    data: sales.map((d) => Number(d.total) || 0),
                },
            ],
        },
        {
            title: "Expenses",
            color: {
                backGround: "linear-gradient(#f8d49a,#ffca71)",
                boxShadow: "0px 10px 20px 0px #F9D59B",
            },
            barValue: 60,
            value: expenses,
            png: UilClipboardAlt,
            categories: chartDates,
            series: [
                {
                    name: "Expenses",
                    data: sales.map((d) =>
                        Math.round(Number(d.total) * 0.3)
                    ),
                },
            ],
        },
    ];

    return (
        <div className="page-container">
            <div className="page-box">
                <div className="analytics-header">
                    <h1 className="page-title">ANALYTICS DASHBOARD</h1>
                </div>

                <div className="Cards">
                    {cardsData.map((card, id) => (
                        <div className="parentContainer" key={id}>
                            <Card {...card} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Analytics;