import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Landing from './pages/landing/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Wishlist from './pages/wishlist/Wishlist'
import WishlistDetail from './pages/wishlist/components/WishlistDetail'
import Cart from './pages/cart/Cart'
import Search from './pages/search/Search'
import Account from './pages/account/Account'
import Product from './pages/product/Product'

function App() {

  return (
    <div>
      <Routes>
        {/* <Route
          path='/'
          element={<Navigate to='/login' />}
        /> */}
        <Route
          path='login'
          element={<Login />}
        />
        <Route
          path='register'
          element={<Register />}
        />

        <Route
          path='/'
          element={<Landing />}
        />
        <Route
          path='product/:id'
          element={<Product />}
        />
        <Route
          path='wishlist'
          element={<Wishlist />}
        />
        <Route
          path='wishlist/:id'
          element={<WishlistDetail />}
        />
        <Route
          path='cart'
          element={<Cart />}
        />
        <Route
          path='search'
          element={<Search />}
        />
        <Route
          path='account'
          element={<Account />}
        />
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
  )
}

export default App
