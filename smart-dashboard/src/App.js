import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import KDS from "./Kitchen/KDS";
import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>

          {/* CUSTOMER */}
          <Route path="/*" element={<CustomerLayout />} />

          {/* ADMIN */}
          <Route path="/admin/*" element={<AdminLayout />} />

          {/* KDS */}
          <Route path="/kds" element={<KDS />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;