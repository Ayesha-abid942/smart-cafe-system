import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { io } from "socket.io-client";

// ✅ FIXED SOCKET URL
const socket = io("http://localhost:8001");

const CustomerReview = () => {

    const [series, setSeries] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {

        const fetchData = () => {
            axios.get("http://localhost:8001/api/reviews/stats")
                .then(res => {

                    const counts = res.data.map(item => item.count);
                    const times = res.data.map(item => item.time);

                    setSeries([
                        {
                            name: "Reviews",
                            data: counts,
                        },
                    ]);

                    setCategories(times);
                })
                .catch(err => console.log(err));
        };

        // 🔥 Initial load
        fetchData();

        // 🔥 REAL-TIME UPDATE
        socket.on("newReview", () => {
            fetchData();
        });

        // cleanup
        return () => {
            socket.off("newReview");
        };

    }, []);

    const data = {
        series: series,
        options: {
            chart: {
                type: "area",
                height: "auto",
            },
            fill: {
                type: "gradient",
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                curve: "smooth",
                colors: ["#ff929f"],
            },
            tooltip: {
                x: {
                    format: "dd/MM/yy HH:mm",
                },
            },
            grid: {
                show: false,
            },
            xaxis: {
                type: "datetime",
                categories: categories,
            },
            yaxis: {
                show: false
            },
            toolbar: {
                show: false
            }
        },
    };

    return (
        <div className="CustomerReview">
            <Chart options={data.options} series={data.series} type="area" />
        </div>
    );
};

export default CustomerReview;