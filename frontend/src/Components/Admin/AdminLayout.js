import React, { useState } from "react"
import { MainLayout } from "../../styles/Layouts"
import AdminNavigation from "./AdminNavigation"
import AdminDashboard from "./AdminDashboard"
import UsersManagement from "./UsersManagement"
import TransactionsManagement from "./TransactionsManagement"
import Analytics from "./Analytics"
import Activity from "./Activity"

function AdminLayout() {

    const [active, setActive] = useState(1)

    const display = () => {

        switch (active) {

            case 1:
                return <AdminDashboard />

            case 2:
                return <UsersManagement />

            case 3:
                return <TransactionsManagement />

            case 4:
                return <Analytics />

            case 5:
                return <Activity />

            default:
                return <AdminDashboard />

        }

    }

    return (

        <MainLayout>

            <AdminNavigation active={active} setActive={setActive} />

            <main>

                {display()}

            </main>

        </MainLayout>

    )

}

export default AdminLayout