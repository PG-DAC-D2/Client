import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./app/slices/authSlice";

import Landing from "./pages/landing/Landing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CustomerLogin from "./pages/auth/CustomerLogin";
import MerchantLogin from "./pages/auth/MerchantLogin";
import AdminLogin from "./pages/auth/AdminLogin";
import CustomerRegister from "./pages/auth/CustomerRegister";
import MerchantRegister from "./pages/auth/MerchantRegister";
import AdminRegister from "./pages/auth/AdminRegister";
import AuthLanding from "./pages/auth/AuthLanding";
import Wishlist from "./pages/wishlist/Wishlist";
import WishlistDetail from "./pages/wishlist/components/WishlistDetail";
import Cart from "./pages/cart/Cart";
import Search from "./pages/search/Search";
import Account from "./pages/account/Account";
import Product from "./pages/product/Product";
import Checkout from "./pages/checkout/Checkout";

import Merchant from "./pages/merchant/Merchant";
import MerchantDashboard from "./pages/merchant/components/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/components/merchant/MerchantProducts";
import AddProduct from "./pages/merchant/components/merchant/AddProduct";
import MerchantAccounts from "./pages/merchant/components/accounts/MerchantAccounts";

import Admin from "./pages/admin/Admin";
import AdminDashboard from "./pages/admin/components/admin/AdminDashboard";
import AdminProducts from "./pages/admin/components/admin/AdminProducts";
import AdminAccount from "./pages/admin/components/accounts/AdminAccount";
import Merchants from "./pages/admin/components/admin/Merchant";
import AdminOrders from "./pages/admin/components/admin/AdminOrders";
import Analytics from "./pages/admin/components/admin/Analytics";

import PaymentPage from "./components/PaymentPage";
import NotificationHistory from "./components/NotificationHistory";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, role } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      dispatch(loadUser());
      
    } catch (error) {
      
    }
  }, [dispatch]);

  return (
    <div>
      <Routes>
        <Route path="auth" element={<AuthLanding />} />
        <Route
          path="login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="login/customer"
          element={isAuthenticated ? <Navigate to="/" /> : <CustomerLogin />}
        />
        <Route
          path="login/merchant"
          element={isAuthenticated ? <Navigate to="/" /> : <MerchantLogin />}
        />
        <Route
          path="login/admin"
          element={isAuthenticated ? <Navigate to="/" /> : <AdminLogin />}
        />
        <Route path="register" element={<Register />} />
        <Route path="register/customer" element={<CustomerRegister />} />
        <Route path="register/merchant" element={<MerchantRegister />} />
        <Route path="register/admin" element={<AdminRegister />} />

        {isAuthenticated && role === "ROLE_MERCHANT" && (
          <Route path="merchant" element={<Merchant />}>
            <Route index element={<MerchantDashboard />} />
            <Route path="dashboard" element={<MerchantDashboard />} />
            <Route path="products" element={<MerchantProducts />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="accounts" element={<MerchantAccounts />} />
          </Route>
        )}

        {isAuthenticated && role === "ROLE_ADMIN" && (
          <Route path="admin" element={<Admin />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="merchants" element={<Merchants />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        )}
        {isAuthenticated && role === "ROLE_ADMIN" && (
          <Route path="admin/account" element={<AdminAccount />} />
        )}

        <Route path="/" element={<Landing />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="wishlist/:id" element={<WishlistDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="account" element={<Account />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={isAuthenticated ? <PaymentPage /> : <Navigate to="/login" />} />
        <Route path="notifications" element={isAuthenticated ? <NotificationHistory /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
