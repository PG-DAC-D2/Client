import React from "react";
import Navbar from "../../shared/common/navbar/Navbar";
import "./Landing.css";
import ShopByCategores from "./components/ShopByCategores";
import WomensWear from "./components/WomensWear";
import TopDeals from "./components/TopDeals";
import BestSellingProducts from "./components/BestSellingProducts";
import ProductView from "../ProductView";
import WomensBottomWear from "./components/WomensBottomWear";
import MansWear from "./components/MansWear";
import MansBottomWear from "./components/MansBottomWear";

function Landing() {
  const topDeals = [
    {
      id: 1,
      name: "Elegant Striped Blouse",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Beige Linen Dress",
      price: "₹3,629",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Blue Casual Shirt",
      price: "₹2,859",
      image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3a30?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const bestSelling = [
    {
      id: 1,
      name: "Elegant Long-sleeved Green",
      price: "₹1,520",
      image: "https://images.unsplash.com/photo-1520974735194-3d8b1a1a2b49?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Beige Women’s Shorts",
      price: "₹1,199",
      image: "https://images.unsplash.com/photo-1618354691373-d851c2b98b2b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Stylish Summer Top",
      price: "₹899",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
    },
  ];

  return (
    <>
      <Navbar />
      <br />
      <br />
      <br />
      <br />
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero mx-5">
        <div className="hero-content">
          <h1>Discover Fashion that Defines You</h1>
          <p>
            Explore the latest trends and exclusive styles at <b>Vanilo</b>.
            From casual wear to premium collections — shop everything in one place.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary">Shop Now</button>
            <button className="btn-outline">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          {/* <img
            src="https://images.unsplash.com/photo-1740650874524-4f57a78e5878?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=798"
            alt="Fashion"
          /> */}
        </div>
      </section>
      {/* TOP DEALS */}
      <TopDeals/>

      {/* BEST SELLING */}
      <BestSellingProducts/>

      {/* CTA */}
      <section className="cta mx-5 section" >
        <h2>Ready to Elevate Your Style?</h2>
        <p>Join thousands of shoppers and get the best offers today.</p>
        <button className="btn-primary">Start Shopping</button>
      </section>

     

      {/* Women's Wear */}
      <MansWear/>
      <MansBottomWear/>
      <WomensWear/>
      <WomensBottomWear/>

      {/* Shop by Category */}
      <ShopByCategores />

      {/* ................ */}


      {/* FEATURES */}
      <section className="features">
        <div className="feature">
          <span className="material-icons">local_shipping</span>
          <h3>Free Delivery</h3>
          <p>On all orders above ₹999</p>
        </div>
        <div className="feature">
          <span className="material-icons">verified</span>
          <h3>Quality Guarantee</h3>
          <p>Premium products from trusted brands</p>
        </div>
        <div className="feature">
          <span className="material-icons">support_agent</span>
          <h3>24/7 Support</h3>
          <p>We are here to help anytime</p>
        </div>
      </section>

          <section className="spacer">
            <ProductView />
          </section>
    </div>
    </>
  );
}

export default Landing;
