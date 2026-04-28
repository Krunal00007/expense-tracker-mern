import React, { useEffect, useState } from "react";
import styled from "styled-components";
import API from "../../utils/api";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {

    const [stats, setStats] = useState({

        totalUsers: 0,
        totalIncome: 0,
        totalExpense: 0

    })

    const chartData = {

        labels: ["Income", "Expense"],

        datasets: [

            {

                label: "Finance",

                data: [stats.totalIncome, stats.totalExpense],

                backgroundColor: [

                    "#4CAF50",
                    "#FF6384"

                ],

                borderWidth: 1

            }

        ]

    };

    const options = {

        responsive: true,

        maintainAspectRatio: false

    }

    useEffect(() => {

        fetchStats()

    }, [])

    const fetchStats = async () => {

        try {

            const res = await API.get("/admin/stats")

            setStats(res.data)

        } catch (err) {

            console.log(err)

        }

    }

    return (

        <DashboardStyled>

            <h1>Admin Dashboard</h1>

            <div className="cards">

                <div className="card">

                    <h3>Total Users</h3>

                    <p>{stats.totalUsers}</p>

                </div>

                <div className="card">

                    <h3>Total Income</h3>

                    <p>{stats.totalIncome}</p>

                </div>

                <div className="card">

                    <h3>Total Expense</h3>

                    <p>{stats.totalExpense}</p>

                </div>

            </div>

            <h2>Income vs Expense</h2>

            <div className="chart">

                <Pie data={chartData} options={options} />

            </div>

        </DashboardStyled>

    )

}

const DashboardStyled = styled.div`

padding:2rem;

.cards{

display:grid;

grid-template-columns:repeat(3,1fr);

gap:20px;

margin-bottom:30px;

}

.card{

background:linear-gradient(135deg,#ffffff,#f8f8ff);

padding:20px;

border-radius:15px;

box-shadow:0 8px 20px rgba(0,0,0,0.08);

transition:0.3s;

cursor:pointer;

}

.card:hover{

transform:translateY(-5px);

box-shadow:0 12px 30px rgba(0,0,0,0.15);

}

.card h3{

font-size:18px;

color:#444;

margin-bottom:10px;

}

.card p{

font-size:28px;

font-weight:bold;

color:#4c6ef5;

}

.chart{

margin-top:20px;

height:350px;
max-width:500px;

background:white;

border-radius:18px;

display:flex;

align-items:center;
justify-content:center;

padding:20px;

box-shadow:0 10px 25px rgba(0,0,0,0.08);

margin-left:auto;
margin-right:auto;

}
`;

export default AdminDashboard