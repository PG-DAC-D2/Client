import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";

import Landing from "./pages/landing/Landing";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Wishlist from "./pages/wishlist/Wishlist";
import WishlistDetail from "./pages/wishlist/components/WishlistDetail";
import Cart from "./pages/cart/Cart";
import Search from "./pages/search/Search";
import Account from "./pages/account/Account";
import Product from "./pages/product/Product";

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

function App() {
  return (
    <div>
      <Routes>
        {/* <Route
          path='/'
          element={<Navigate to='/login' />}
        /> */}
        <Route path="login" element={<Login />} />

        <Route path="merchant" element={<Merchant />}>
          <Route index element={<MerchantDashboard />} />

          <Route path="dashboard" element={<MerchantDashboard />} />

          <Route path="products" element={<MerchantProducts />} />

          <Route path="products/add" element={<AddProduct />} />

          <Route path="accounts" element={<MerchantAccounts />} />
        </Route>

        <Route path="admin" element={<Admin />}>
          <Route index element={<AdminDashboard />} />

          <Route path="dashboard" element={<AdminDashboard />} />

          <Route path="products" element={<AdminProducts />} />
          <Route path="merchants" element={<Merchants />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
          <Route path="admin/account" element={<AdminAccount />} />
        <Route path="register" element={<Register />} />

        <Route path="/" element={<Landing />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="wishlist/:id" element={<WishlistDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="account" element={<Account />} />
        {/* <Route
            path='about-us'
            element={<AboutUs />}
          />
          <Route
            path='contact-us'
            element={<ContactUs />}
          /> */}
      </Routes>
    </div>
  );
}

export default App;
