import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("adminToken");

    return token === "admin_authenticated"
        ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;