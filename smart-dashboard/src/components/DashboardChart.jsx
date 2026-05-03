import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import "./DashboardChart.css";

const DashboardChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:8001/sales-weekly");
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);

    const chartData = {
        options: {
            chart: {
                id: "dashboard-chart",
                toolbar: { show: false },
            },
            xaxis: {
                categories: data.map(d => d.day),
            },
            stroke: {
                curve: "smooth",
            },
            dataLabels: {
                enabled: false,
            },
            colors: ["#BB67FF"], // dashboard theme color
        },
        series: [
            {
                name: "Sales",
                data: data.map(d => d.total),
            },
        ],
    };

    return (
        <div className="dashboard-chart">
            <div className="chart-header">
                <h3>Weekly Sales</h3>
            </div>

            <Chart
                options={chartData.options}
                series={chartData.series}
                type="area"
                height={280}
            />
        </div>
    );
};

export default DashboardChart;