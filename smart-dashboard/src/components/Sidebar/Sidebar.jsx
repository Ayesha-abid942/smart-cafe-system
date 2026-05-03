import React, { useState } from "react";
import "./Sidebar.css";
import { UilSignOutAlt, UilBars } from "@iconscout/react-unicons";
import { SidebarData } from "../../Data/Data";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ expanded, setExpanded }) => {
    const [selected, setSelected] = useState(0);

    const navigate = useNavigate();
    const location = useLocation();

    // ✅ FIX: ADMIN ROUTES CHECK
    React.useEffect(() => {
        const currentPath = location.pathname;

        const activeIndex = SidebarData.findIndex(item => {
            if (item.heading === "Dashboard" && currentPath === "/admin") return true;
            if (item.heading === "Menu" && currentPath === "/admin/menu") return true;
            if (item.heading === "Orders" && currentPath === "/admin/orders") return true;
            if (item.heading === "Analytics" && currentPath === "/admin/analytics") return true;
            if (item.heading === "Inventory" && currentPath === "/admin/inventory") return true;
            return false;
        });

        if (activeIndex !== -1) setSelected(activeIndex);
    }, [location.pathname]);

    const sidebarVariants = {
        true: { left: "0" },
        false: { left: "-60%" },
    };

    // ✅ FIX: NAVIGATION PATHS
    const handleClick = (item, index) => {
        setSelected(index);

        if (item.heading === "Dashboard") navigate("/admin");
        else if (item.heading === "Menu") navigate("/admin/menu");
        else if (item.heading === "Orders") navigate("/admin/orders");
        else if (item.heading === "Analytics") navigate("/admin/analytics");
        else if (item.heading === "Inventory") navigate("/admin/inventory");
    };

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <>
            <div
                className="bars"
                style={expanded ? { left: "60%" } : { left: "5%" }}
                onClick={() => setExpanded(!expanded)}
            >
                <UilBars />
            </div>

            <motion.div
                className="sidebar"
                variants={sidebarVariants}
                animate={window.innerWidth <= 768 ? ` ${expanded} ` : ""}
            >
                <div className="menu">
                    <div className="menu-items">
                        {SidebarData.map((item, index) => (
                            <div
                                key={index}
                                className={selected === index ? "menuItem active" : "menuItem"}
                                onClick={() => handleClick(item, index)}
                            >
                                <item.icon />
                                <span>{item.heading}</span>
                            </div>
                        ))}
                    </div>

                    <div className="menuItem logout" onClick={handleLogout}>
                        <UilSignOutAlt />
                        <span>Logout</span>
                    </div>
                </div>
            </motion.div >
        </>
    );
};

export default Sidebar;