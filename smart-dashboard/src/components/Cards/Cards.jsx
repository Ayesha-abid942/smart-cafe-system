import React from "react";
import "./Cards.css";
import { getCardsData } from "../../Data/Data";
import Card from "../Card/Card";
import { UilCommentAltMessage } from "@iconscout/react-unicons";

const Cards = ({ data, showMessages = false }) => {

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

            {/* ✅ Messages ONLY Analytics */}
            {showMessages && (
                <div className="parentContainer">
                    <Card
                        title="Messages"
                        color={{
                            backGround: "linear-gradient(180deg,#00c6ff,#0072ff)",
                            boxShadow: "0px 10px 20px 0px #a3d8ff",
                        }}

                        barValue={data?.messagesPercent || 0}
                        value={data?.messages || 0}   // 🔥 THIS FIXES $0 ISSUE

                        png={UilCommentAltMessage}

                        series={[
                            {
                                name: "Messages",
                                data: data?.messagesChart || [],
                            },
                        ]}
                    />
                </div>
            )}
        </div>
    );
};

export default Cards;