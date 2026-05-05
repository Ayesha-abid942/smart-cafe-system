import React from "react";
import "./Cards.css";
import { getCardsData } from "../../Data/Data";
import Card from "../Card/Card";

const Cards = ({ data }) => {

    const safeData = {
        sales: data?.sales || 0,
        salesPercent: data?.salesPercent || 0,
        salesChart: data?.salesChart || [],

        revenue: data?.revenue || 0,
        revenuePercent: data?.revenuePercent || 0,
        revenueChart: data?.revenueChart || [],

        expenses: data?.expenses || 0,
        expensesPercent: data?.expensesPercent || 0,
        expensesChart: data?.expensesChart || [],
    };

    const cardsData = getCardsData(safeData);

    return (
        <div className="Cards">
            {cardsData.map((card, id) => (
                <div className="parentContainer" key={id}>
                    <Card {...card} />
                </div>
            ))}
        </div>
    );
};

export default Cards;