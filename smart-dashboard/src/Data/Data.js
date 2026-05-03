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


// Dashboard Cards Data
export const cardsData = [
    {
        title: "Sales",
        color: {
            backGround: "linear-gradient(180deg,#bb67ff,#c484f3)",
            boxShadow: "0px 10px 20px 0px #e0c6f5",
        },
        barValue: 70,
        value: "25,970",
        png: UilUsdSquare,
        series: [
            {
                name: "Sales",
                data: [31, 40, 28, 51, 42, 109, 100],
            },
        ],
    },
    {
        title: "Revenue",
        color: {
            backGround: "linear-gradient(180deg,#FF919D,#FC929D)",
            boxShadow: "0px 10px 20px 0px #FDC0C7",
        },
        barValue: 80,
        value: "14,270",
        png: UilMoneyWithdrawal,
        series: [
            {
                name: "Revenue",
                data: [10, 100, 50, 70, 80, 30, 40],
            },
        ],
    },
    {
        title: "Expenses",
        color: {
            backGround: "linear-gradient(#f8d49a,#ffca71)",
            boxShadow: "0px 10px 20px 0px #F9D59B",
        },
        barValue: 60,
        value: "4,270",
        png: UilClipboardAlt,
        series: [
            {
                name: "Expenses",
                data: [10, 25, 15, 30, 12, 15, 20],
            },
        ],
    },
];