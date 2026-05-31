import {
    UilEstate,
    UilClipboardAlt,
    UilPackage,
    UilChart,
    UilBox,
    UilUsdSquare,
    UilMoneyWithdrawal,
} from "@iconscout/react-unicons";


// Sidebar Data
export const SidebarData = [
    {
        icon: UilEstate,
        heading: "Dashboard",
        path: "/admin",
    },
    {
        icon: UilClipboardAlt,
        heading: "Orders",
        path: "/admin/orders",
    },
    {
        icon: UilPackage,
        heading: "Menu",
        path: "/admin/menu",
    },
    {
        icon: UilChart,
        heading: "Analytics",
        path: "/admin/analytics",
    },
    {
        icon: UilBox,
        heading: "Inventory",
        path: "/admin/inventory",
    }
];

export const getCardsData = () => [
    {
        title: "Sales",
        value: 5000,
        barValue: 70,
        png: UilUsdSquare,
        color: {
            backGround: "linear-gradient(180deg,#D62839,#FF6B6B)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        series: [{ name: "Sales", data: [1000, 2000, 3000, 5000] }],
    },
    {
        title: "Revenue",
        value: 8000,
        barValue: 60,
        png: UilMoneyWithdrawal,
        color: {
            backGround: "linear-gradient(135deg,#ff758c,#ff7eb3)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        series: [{ name: "Revenue", data: [2000, 3000, 4000, 8000] }],
    },
    {
        title: "Expenses",
        value: 3000,
        barValue: 40,
        png: UilClipboardAlt,
        color: {
            backGround: "linear-gradient(135deg,#ffb347,#ffcc33)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        series: [{ name: "Expenses", data: [500, 1000, 2000, 3000] }],
    },
];