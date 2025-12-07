import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../../../app/slices/cartSlice'

function BestSellingProducts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const products = [
        {
            id: 1,
            name: "Elegant striped blouse",
            price: "₹2,499.00",
            category: "Women",
            rating: 4.8,
            reviews: 1023,
            sizes: ["XS", "S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=880",
        },
        {
            id: 2,
            name: "Elegant long-sleeved green",
            price: "₹1,520.00",
            category: "Women",
            rating: 4.5,
            reviews: 125,
            sizes: ["XS", "S", "M", "L", "XL"],
            image: "https://plus.unsplash.com/premium_photo-1755534537502-1529cf891cdf?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        },
        {
            id: 3,
            name: "Blue long-sleeve casual shirt",
            price: "₹2,859.00",
            category: "Men",
            rating: 4.4,
            reviews: 224,
            sizes: ["XS", "S", "M", "L", "XL"],
            image: "https://images.unsplash.com/photo-1571821324176-52ff15e96348?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        },
        {
            id: 3,
            name: "Blue long-sleeve casual shirt",
            price: "₹2,859.00",
            category: "Men",
            rating: 4.4,
            reviews: 224,
            sizes: ["XS", "S", "M", "L", "XL"],
            image: "https://plus.unsplash.com/premium_photo-1705554519628-5d17d796e488?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
        },
    ];


    return (
        <section className="section mx-5">
            <div className="section-header">
                <div>
                    <h2>Best Selling Products</h2>
                    <br />
                    {/* <p className="subtitle">up to 70% off</p> */}
                </div>
            </div>

            <div className="product-list">
                {products.map((item) => (
                    <div className="product-card2" key={item.id}>
                        <div className="img-box">
                            <img src={item.image} alt={item.name} />
                        </div>
                        <div className="product-info">
                            <h4>{item.name}</h4>
                            <p className="category">{item.category}</p>
                            <div className="rating">
                                <span className="material-icons star">star</span>
                                <span>{item.rating}</span>
                                <span className="reviews">({item.reviews})</span>
                            </div>
                            <div className="sizes">
                                {item.sizes.map((s) => (
                                    <span key={s}>{s}</span>
                                ))}
                            </div>
                            <div className="price-cart">
                                <p className="price">{item.price}</p>
                                <button
                                    className="cart-btn"
                                    onClick={() => {
                                        // Extract numeric price from string like "₹2,499.00"
                                        const numericPrice = Number(item.price.replace(/[^\d.]/g, ''));
                                        dispatch(addItem({
                                            id: `best-${item.id}`,
                                            name: item.name,
                                            price: numericPrice,
                                            image: item.image,
                                            size: item.sizes?.[0] || 'M',
                                            color: item.category,
                                            category: item.category,
                                        }));
                                        navigate('/cart');
                                    }}
                                >
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default BestSellingProducts