import { dashboard, users, transactions} from "./Icons";

export const adminMenuItems = [

    {
        id: 1,
        title: "Admin Dashboard",
        icon: dashboard,
        link: "/admin"
    },

    {
        id: 2,
        title: "Users Management",
        icon: users,
        link: "/admin/users"
    },

    {
        id: 3,
        title: "Transactions",
        icon: transactions,
        link: "/admin/transactions"
    },

];