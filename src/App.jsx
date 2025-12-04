// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Navigate, Route, Routes } from 'react-router-dom'
// import Landing from './pages/landing/Landing'
// import Register from './pages/auth/Register'
// import Login from './pages/auth/Login'
// import Wishlist from './pages/wishlist/Wishlist'
// import Cart from './pages/cart/Cart'
// import Search from './pages/search/Search'
// import Account from './pages/account/Account'
// import Product from './pages/product/Product'
// import Merchant from './pages/merchant/Merchant'
// import Admin from './pages/admin/Admin'
// import MerchantAccounts from './pages/merchant/components/accounts/MerchantAccounts'
// // import Accounts from './pages/merchant/components/Accounts'

// function App() {

//   return (
//     <div>
//       <Routes>
//         {/* <Route
//           path='/'
//           element={<Navigate to='/login' />}
//         /> */}
//         <Route
//           path='login'
//           element={<Login />}
//         />
//         <Route
//           path='merchant'
//           element={<Merchant />}
//         />
//         <Route
//           path='merchant/accounts'
//           element={<MerchantAccounts />}
//         />
//         <Route
//           path='admin'
//           element={<Admin />}
//         />
//         {/* <Route
//           path='admin/accounts'
//           element={<AdAccounts />}
//         /> */}
//         <Route
//           path='register'
//           element={<Register />}
//         />

//         <Route
//           path='/'
//           element={<Landing />}
//         />
//         <Route
//           path='product/:id'
//           element={<Product />}
//         />
//         <Route
//           path='wishlist'
//           element={<Wishlist />}
//         />
//         <Route
//           path='cart'
//           element={<Cart />}
//         />
//         <Route
//           path='search'
//           element={<Search />}
//         />
//         <Route
//           path='account'
//           element={<Account />}
//         />
//         {/* <Route
//             path='about-us'
//             element={<AboutUs />}
//           />
//           <Route
//             path='contact-us'
//             element={<ContactUs />}
//           /> */}
//       </Routes>
//     </div>
//   )
// }

// export default App


import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'

import Landing from './pages/landing/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Wishlist from './pages/wishlist/Wishlist'
import Cart from './pages/cart/Cart'
import Search from './pages/search/Search'
import Account from './pages/account/Account'
import Product from './pages/product/Product'

import Merchant from './pages/merchant/Merchant'
import MerchantDashboard from "./pages/merchant/components/merchant/MerchantDashboard";
import MerchantProducts from "./pages/merchant/components/merchant/MerchantProducts";
import AddProduct from "./pages/merchant/components/merchant/AddProduct";
import MerchantAccounts from './pages/merchant/components/accounts/MerchantAccounts'

import Admin from './pages/admin/Admin'

function App() {

  return (
    <div>
      <Routes>

        {/* AUTH ROUTES */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />


        {/* MERCHANT ROUTES (NESTED INSIDE Merchant.jsx) */}
        <Route path="merchant" element={<Merchant />}>

          {/* Redirect /merchant → /merchant/dashboard */}
          <Route index element={<Navigate to="dashboard" />} />

          <Route path="dashboard" element={<MerchantDashboard />} />
          <Route path="products" element={<MerchantProducts />} />
          <Route path="products/add" element={<AddProduct />} />
          <Route path="accounts" element={<MerchantAccounts />} />

        </Route>


        {/* ADMIN ROUTE */}
        <Route path="admin" element={<Admin />} />


        {/* USER ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="product/:id" element={<Product />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="cart" element={<Cart />} />
        <Route path="search" element={<Search />} />
        <Route path="account" element={<Account />} />

      </Routes>
    </div>
  )
}

export default App
