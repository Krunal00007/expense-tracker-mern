import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { InnerLayout } from "../../styles/Layouts";
import { useGlobalContext } from "../../context/globalContext";
import { bitcoin, book, calender, card, circle, clothing, comment, dollar, food, freelance, medical, money, piggy, stocks, takeaway, trash, tv, users, yt } from '../../utils/Icons';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function Transactions() {

    const { incomes, expenses, getIncome, getExpenses, delIncome, delExpense } = useGlobalContext();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("all");

    useEffect(() => {

        getIncome();
        getExpenses();

    }, []);

    const categoryIcons = {
        salary: money,
        freelancing: freelance,
        investments: stocks,
        stocks: stocks,
        bitcoin: bitcoin,
        bank: piggy,
        youtube: yt,
        food: food,
        takeaway: takeaway,
        medical: medical,
        entertainment: tv,
        clothing: clothing,
        travel: freelance,
        education: book,
        groceries: food,
        subscriptions: tv,
        
        other: circle

    };

    const transactions = [
        ...incomes.map(i => ({ ...i, type: "income" })),
        ...expenses.map(e => ({ ...e, type: "expense" }))
    ];

    const filteredTransactions = transactions.filter(item => {

        const matchSearch = item.title.toLowerCase().includes(search.toLowerCase());

        const matchFilter = filter === "all" || item.type === filter;

        return matchSearch && matchFilter;

    });

    const downloadCSV = () => {

        const rows = filteredTransactions.map(t =>
            `${t.date},${t.title},${t.category},${t.amount},${t.type}`
        );

        const csv = "Date,Title,Category,Amount,Type\n" + rows.join("\n");

        const blob = new Blob([csv]);

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");

        a.href = url;
        a.download = "transactions.csv";

        a.click();

    };

    const downloadPDF = () => {

        const doc = new jsPDF();

        const tableColumn = ["Date", "Title", "Category", "Amount", "Type"];

        const tableRows = filteredTransactions.map(t => [
            new Date(t.date).toLocaleDateString(),
            t.title,
            t.category,
            t.amount,
            t.type
        ]);

        autoTable(doc, {
            head: [tableColumn],
            body: tableRows
        });

        doc.save("transactions-report.pdf");

    }

    return (

        <TransactionsStyled>

            <InnerLayout>

                <h1>View Transactions</h1>

                <div className="top-bar">

                    <input
                        type="text"
                        placeholder="Search transaction..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >

                        <option value="all">All</option>
                        <option value="income">Income</option>
                        <option value="expense">Expense</option>

                    </select>

                    <button onClick={downloadPDF}>
                        Download PDF
                    </button>

                </div>

                <table>

                    <thead>

                        <tr>

                            <th>Date</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Type</th>
                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredTransactions.map(item => {

                            return (

                                <tr key={item._id}>

                                    <td>{new Date(item.date).toLocaleDateString()}</td>

                                    <td>{item.title}</td>

                                    <td>

                                        <span className="category-icon">
                                            {categoryIcons[item.category] || circle}
                                        </span>

                                        {item.category}

                                    </td>

                                    <td className={item.type === "income" ? "green" : "red"}>

                                        ₹{item.amount}

                                    </td>

                                    <td>{item.type}</td>

                                    <td>

                                        <button

                                            className="delete-btn"

                                            onClick={() => {

                                                item.type === "income"
                                                    ? delIncome(item._id)
                                                    : delExpense(item._id)

                                            }}

                                        >

                                            Delete

                                        </button>

                                    </td>

                                </tr>

                            )

                        })}

                    </tbody>

                </table>

            </InnerLayout>

        </TransactionsStyled>

    );

}

const TransactionsStyled = styled.div`

    .top-bar{

    display:flex;
    gap:1rem;
    margin:1rem 0;

    input{

    padding:.5rem 1rem;
    border-radius:10px;
    border:2px solid white;

    }

    select{

    padding:.5rem 1rem;
    border-radius:10px;

    }

    button{

    padding:.5rem 1rem;
    border:none;
    border-radius:10px;
    background:#6c63ff;
    color:white;
    cursor:pointer;

    }

    }

    table{

    width:100%;
    border-collapse:collapse;

    background:#FCF6F9;
    border-radius:20px;
    overflow:hidden;

    }

    th{

    background:#f1f1f1;
    padding:12px;

    }

    td{

    padding:10px;
    text-align:center;

    }

    .green{

    color:green;
    font-weight:bold;

    }

    .red{

    color:red;
    font-weight:bold;

    }

    .delete-btn{

    background:#ff4d4d;
    color:white;
    border:none;
    padding:5px 10px;
    border-radius:8px;
    cursor:pointer;

    }

    .category-icon{

    margin-right:8px;

    font-size:16px;

    color:#6c63ff;

    }

`;

export default Transactions;