import { Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SideCart from "../components/SideCart";

import Home from "../pages/Customer/Home";
import Menu from "../pages/Customer/Menu";
import About from "../pages/Customer/About";
import Reviews from "../pages/Customer/Reviews";
import Contact from "../pages/Customer/Contact";
import Coffee from "../pages/Customer/Coffee";
import Burger from "../pages/Customer/Burger";
import Juice from "../pages/Customer/Juice";
import IceCream from "../pages/Customer/IceCream";
import Tea from "../pages/Customer/Tea";
import MilkShake from "../pages/Customer/MilkShake";
import Sandwich from "../pages/Customer/Sandwich";
import Shawarma from "../pages/Customer/Shawarma";
import "../style.css";
export default function CustomerLayout() {
    return (
        <>
            <Navbar />
            <SideCart />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="about" element={<About />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="contact" element={<Contact />} />

                <Route path="coffee" element={<Coffee />} />
                <Route path="burger" element={<Burger />} />
                <Route path="juice" element={<Juice />} />
                <Route path="icecream" element={<IceCream />} />
                <Route path="tea" element={<Tea />} />
                <Route path="milkshake" element={<MilkShake />} />
                <Route path="sandwich" element={<Sandwich />} />
                <Route path="shawarma" element={<Shawarma />} />
            </Routes>

            <Footer />
        </>
    );
}