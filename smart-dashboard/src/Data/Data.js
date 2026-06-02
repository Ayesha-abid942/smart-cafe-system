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
            backGround: "rgba(255,255,255,0.18)",
            borderColor: "#D62839",
            boxShadow: "0px 10px 20px rgba(214,40,57,0.12)",
        },
        series: [{ name: "Sales", data: [1000, 2000, 3000, 5000] }],
    },
    {
        title: "Revenue",
        value: 8000,
        barValue: 60,
        png: UilMoneyWithdrawal,
        color: {
            backGround: "rgba(255,255,255,0.18)",
            borderColor: "#ff758c",
            boxShadow: "0px 8px 20px rgba(255,117,140,0.12)",
        },
        series: [{ name: "Revenue", data: [2000, 3000, 4000, 8000] }],
    },
    {
        title: "Expenses",
        value: 3000,
        barValue: 40,
        png: UilClipboardAlt,
        color: {
            backGround: "rgba(255,255,255,0.18)",
            borderColor: "#ffb347",
            boxShadow: "0px 8px 20px rgba(255,179,71,0.12)",
        },
        series: [{ name: "Expenses", data: [500, 1000, 2000, 3000] }],
    },
];