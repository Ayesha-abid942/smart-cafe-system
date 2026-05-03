import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../components/Sidebar/Sidebar";
import RightSide from "../components/RightSide/RightSide";

import MainDash from "../components/MainDash/MainDash";
import Menu from "../pages/Admin/Menu";
import Orders from "../pages/Admin/Orders";
import Inventory from "../pages/Admin/Inventory";
import Analytics from "../pages/Admin/Analytics";

export default function AdminLayout() {
    const [sidebarExpanded, setSidebarExpanded] = useState(true);

    const location = useLocation();

    // ✅ sirf dashboard ("/admin") pe RightSide show ho
    const isDashboard =
        location.pathname === "/admin" ||
        location.pathname === "/admin/"; // kabhi slash bhi hota hai

    return (
        <div className="App">
            <div className={`AppGlass ${!isDashboard ? "no-right" : ""}`}>
                <Sidebar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />

                <Routes>
                    <Route path="/" element={<MainDash />} />
                    <Route path="menu" element={<Menu />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="inventory" element={<Inventory />} />
                    <Route path="analytics" element={<Analytics />} />
                </Routes>

                {/* ✅ ONLY DASHBOARD */}
                {isDashboard && <RightSide />}
            </div>
        </div>
    );
}