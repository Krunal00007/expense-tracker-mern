import React, { useEffect, useState } from "react"
import styled from "styled-components"
import API from "../../utils/api"

function TransactionsManagement() {

    const [transactions, setTransactions] = useState([])
    const [search,setSearch] = useState("")

    useEffect(() => {

        API.get("/admin/transactions")
            .then(res => {

                const incomes = res.data.incomes.map(i => ({
                    ...i,
                    type: "income"
                }))

                const expenses = res.data.expenses.map(e => ({
                    ...e,
                    type: "expense"
                }))

                setTransactions([...incomes,...expenses])

            })

    }, [])

    const filtered = transactions.filter(t =>
        t.user?.name?.toLowerCase().includes(search.toLowerCase())
    )

    return (

        <TransactionsStyled>

            <div className="top">

                <h1>All Transactions</h1>

                <input
                    placeholder="Search by user..."
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                />

            </div>

            <div className="table-card">

                <table>

                    <thead>

                        <tr>
                            <th>Title</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>User</th>
                        </tr>

                    </thead>

                    <tbody>

                        {filtered.map(t => (

                            <tr key={t._id}>

                                <td>{t.title}</td>

                                <td className={t.type === "income" ? "income" : "expense"}>
                                    ₹{t.amount}
                                </td>

                                <td>
                                    <span className={`badge ${t.type}`}>
                                        {t.type}
                                    </span>
                                </td>

                                <td>
                                    {t.user?.name || "Unknown"}
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </TransactionsStyled>

    )

}

const TransactionsStyled = styled.div`

padding:2rem;

h1{

font-size:28px;
margin-bottom:20px;
color:#2b2d42;

}

.table-card{

background:rgba(255,255,255,0.85);

border-radius:18px;

padding:20px;

box-shadow:0 10px 25px rgba(0,0,0,0.08);

}

table{

width:100%;
border-collapse:collapse;

}

thead{

background:#f3f3f3;

}

th{

padding:12px;
text-align:left;
font-weight:600;

}

td{

padding:12px;
border-bottom:1px solid #eee;

}

tr:hover{

background:#fafafa;

}

.green{

color:#4CAF50;
font-weight:bold;

}

.red{

color:#ff4d4d;
font-weight:bold;

}

.badge{

padding:5px 10px;

border-radius:8px;

font-size:12px;

font-weight:600;

}

.badge.Income{

background:#4CAF50;

color:white;

}

.badge.Expense{

background:#ff4d4d;

color:white;

}

.income{

color:#4CAF50;
font-weight:bold;

}

.expense{

color:#ff4d4d;
font-weight:bold;

}

.badge{

padding:4px 10px;
border-radius:6px;
font-size:12px;
font-weight:600;

}

.badge.income{

background:#4CAF50;
color:white;

}

.badge.expense{

background:#ff4d4d;
color:white;

}

.top{

display:flex;
justify-content:space-between;
margin-bottom:20px;

}

input{

padding:8px 14px;
border-radius:10px;
border:1px solid #ddd;

}
`

export default TransactionsManagement