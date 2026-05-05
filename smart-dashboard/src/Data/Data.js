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

export const getCardsData = (data = {}) => [
    {
        title: "Sales",
        value: data.sales || 0,
        barValue: data.salesPercent || 0,
        png: UilUsdSquare,
        color: {
            backGround: "linear-gradient(180deg,#bb67ff,#c484f3)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        series: [{ name: "Sales", data: data.salesChart || [] }],
    },
    {
        title: "Revenue",
        value: data.revenue || 0,
        barValue: data.revenuePercent || 0,
        png: UilMoneyWithdrawal,
        color: {
            backGround: "linear-gradient(180deg,#FF919D,#FC929D)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        series: [{ name: "Revenue", data: data.revenueChart || [] }],
    },
    {
        title: "Expenses",
        value: data.expenses || 0,
        barValue: data.expensesPercent || 0,
        png: UilClipboardAlt,
        color: {
            backGround: "linear-gradient(#f8d49a,#ffca71)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        series: [{ name: "Expenses", data: data.expensesChart || [] }],
    },
];