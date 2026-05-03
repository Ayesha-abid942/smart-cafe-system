import React from "react";

import Home from "./Home";
import Menu from "./Menu";
import Burger from "./Burger";
import Coffee from "./Coffee";
import Juice from "./Juice";
import IceCream from "./IceCream";
import Sandwich from "./Sandwich";
import Shawarma from "./Shawarma";
import MilkShake from "./MilkShake";
import Tea from "./Tea";
import Reviews from "./Reviews";
import Contact from "./Contact";
import About from "./About";

import Navbar from "../../components/Navbar";
import SideCart from "../../components/SideCart";
import "../../style.css";

const CustomerMain = () => {
    return (
        <div>

            {/* NAVBAR */}
            <Navbar />

            {/* SECTIONS (scroll wali website) */}
            <Home />
            <Menu />
            <Burger />
            <Coffee />
            <Juice />
            <IceCream />
            <Sandwich />
            <Shawarma />
            <MilkShake />
            <Tea />
            <Reviews />
            <About />
            <Contact />

            {/* CART */}
            <SideCart />

        </div>
    );
};

export default CustomerMain;