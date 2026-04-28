import React, { useState, useMemo } from "react";
import { Routes, Route } from "react-router-dom";

import styled from "styled-components";
import bg from "./img/bg.jpg";

import { MainLayout } from "./styles/Layouts";
import Orb from "./Components/Orb/Orb";
import Navigation from "./Components/Navigation/Navigation";

import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Transactions from "./Components/Transactions/Transactions";

import Login from "./Components/Login";
import Register from "./Components/Register";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";

import AdminNavigation from "./Components/Admin/AdminNavigation"
import AdminDashboard from "./Components/Admin/AdminDashboard"
import UsersManagement from "./Components/Admin/UsersManagement"
import TransactionsManagement from "./Components/Admin/TransactionsManagement"

function App() {

  const [active, setActive] = useState(1)
  const user = JSON.parse(localStorage.getItem("user"));

  const orbMemo = useMemo(() => {

    return <Orb />

  }, [])

  const display = () => {

    switch (active) {

      case 1:
        return <AdminDashboard />

      case 2:
        return <UsersManagement />

      case 3:
        return <TransactionsManagement />

      default:
        return <AdminDashboard />

    }

  }

  const displayData = () => {

    switch (active) {

      case 1:
        return <Dashboard />

      case 2:
        return <Transactions />

      case 3:
        return <Income />

      case 4:
        return <Expenses />

      default:
        return <Dashboard />

    }

  }

  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("token")
  )

  if (!isAuth) {

    return (

      <Routes>

        <Route path="/" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/register" element={<Register />} />

      </Routes>

    )

  }

  return (

    <AppStyle bg={bg}>

      {orbMemo}

      <Routes>

        <Route path="/admin/*" element={
          <ProtectedRoute>
            <MainLayout>
              <AdminNavigation active={active} setActive={setActive} />
              <main>
                {display()}
              </main>
            </MainLayout>
          </ProtectedRoute>
        } />

        <Route path="/" element={

          user?.role === "admin"

            ? <Navigate to="/admin" />

            : <MainLayout>
              <Navigation active={active} setActive={setActive} />
              <main>{displayData()}</main>
            </MainLayout>

        } />


      </Routes>

    </AppStyle>

  )

}

const AppStyle = styled.div`

  height:100vh;

  background-image:url(${props => props.bg});

  main{

  flex:1;

  background:rgba(255,255,255,0.78);

  border:3px solid #FFFFFF;

  backdrop-filter:blur(4.5px);

  border-radius:32px;

  overflow-x:hidden;

  }

`

export default App