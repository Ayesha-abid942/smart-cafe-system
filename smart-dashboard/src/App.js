import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import KDS from "./Kitchen/KDS";
import LoginPage from "./pages/Login/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* CUSTOMER */}
          <Route path="/*" element={<CustomerLayout />} />
          {/* LOGIN */}
          <Route path="/login" element={<LoginPage />} />



          {/* ADMIN */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          />

          {/* KDS */}
          <Route path="/kds" element={<KDS />} />



        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;