import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/" />;
    }

    if (user?.role !== "admin") {
        return <Navigate to="/admin" />;
    }

    return children;
}

export default ProtectedRoute;