import React, { useState, useContext } from "react";
import API from "../utils/api";

//const BASE_URL = "http://localhost:2000/api/";

const GlobalContext = React.createContext();

export const GlobalProvider = ({ children }) => {

    const [incomes, setIncome] = useState([]);
    const [expenses, setExpense] = useState([]);
    const [error, setError] = useState(null);

    const addIncome = async (income) => {
        const response = await API.post("/add-income", income)
            .catch ((err) =>{
                setError(err.response.data.message);
            })
        getIncome();
    }

    const getIncome = async () => {
        const response = await API.get(`/get-income`)
        setIncome(response.data)
        console.log(response.data)
    }

    const delIncome = async (id) => {
        const response = await API.delete(`/del-income/${id}`)
        getIncome();
    }

    const totalIncome = () => {
        let totalIncome = 0;
        incomes.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const addExpense = async (income) => {
        const response = await API.post(`/add-exp`, income)
            .catch((err) =>{
                setError(err.response.data.message)
            })
        getExpenses()
    }

    const getExpenses = async () => {
        const response = await API.get(`/get-exp`)
        setExpense(response.data)
        console.log(response.data)
    }

    const deleteExpense = async (id) => {
        const res  = await API.delete(`/del-exp/${id}`)
        getExpenses()
    }

    const totalExpenses = () => {
        let totalIncome = 0;
        expenses.forEach((income) =>{
            totalIncome = totalIncome + income.amount
        })

        return totalIncome;
    }

    const totalBalance = () => {
        return totalIncome() - totalExpenses()
    }

    const transactionHistory = () => {
        const history = [...incomes, ...expenses]
        history.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
        })

        return history.slice(0, 3)
    }

    return (
        <GlobalContext.Provider value={{
            addIncome,
            getIncome,
            incomes,
            delIncome,
            totalIncome,
            addExpense,
            getExpenses,
            expenses,
            deleteExpense,
            totalExpenses,
            totalBalance,
            transactionHistory,
            error,
            setError
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(GlobalContext)
}