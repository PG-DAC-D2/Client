import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductById, fetchProducts } from "../../app/slices/productSlice";
import "./Product.css";
import ProductCard from "../landing/components/ProductCard";
import Navbar from "../../shared/common/navbar/Navbar";

function Product() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { product, items, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        if (id) {
            dispatch(fetchProductById(id));
            dispatch(fetchProducts());
        }
    }, [dispatch, id]);

    console.log(product)
    if (loading || !product) {
        return <div className="loading-kd">Loading...</div>;
    }

    if (error) {
        return <div className="error-kd">Error: {error}</div>;
    }

    // Find similar products based on same tag
    const similarProducts = items.filter(
        (p) => p.tags?.[0] === product.tags?.[0] && p._id !== product._id
    );

    return (
        <>
            <Navbar />
            <br />
            <br />
            <br />
            <div className="product-page-kd">
                <div className="product-main-kd">
                    <div className="product-image-kd">
                        <img src={product.imageUrl?.[0]} alt={product.name} />
                    </div>

                    <div className="product-details-kd">
                        <h2 className="product-name-kd">{product.name}</h2>
                        <p className="product-tag-kd">{product.tags?.join(", ")}</p>
                        <p className="product-desc-kd">{product.description}</p>

                        <div className="product-rating-kd">
                            ⭐ {product.rating} ({product.review} reviews)
                        </div>

                        <div className="product-price-kd">₹{product.rate}</div>

                        <button
                            className="add-cart-btn-kd"
                            onClick={() => navigate('/cart')}
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

                <div className="product-reviews-kd">
                    <h3>Customer Reviews</h3>
                    {product.customersReviews?.length ? (
                        product.customersReviews.map((rev, i) => (
                            <div key={i} className="review-card-kd">
                                <p><strong>{rev.customerId}</strong></p>
                                <p>{rev.comment}</p>
                                <p>{rev.rating}</p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews yet.</p>
                    )}
                </div>

                <section className="section">
                    <div className="section-header my-4">
                        <h2>Similar Products</h2>
                        {/* <p className="subtitle">Up to 70% Off</p> */}
                    </div>
                    <div className="similar-list-kd">
                        <div className="product-list">

                            {similarProducts.map((item) => (
                                <ProductCard _id={item._id} key={item._id} name={item.name} imageUrl={item.imageUrl} tags={item.tags} rating={item.rating} review={item.review} sizes={item.sizes} rate={item.rate} />

                            ))}
                        </div>
                    </div>
                </section>
            </div >
        </>
    );
}

export default Product;
