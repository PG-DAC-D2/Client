import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../app/slices/productSlice';
import ProductCard from './ProductCard';

function MansBottomWear() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.products);
  const [activeCategory, setActiveCategory] = useState('jeans');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredProducts = items.filter(
    p => p.tags?.[0]?.toLowerCase() === activeCategory.toLowerCase()
  );

  const categories = ['jeans', 'pants', 'trousers', 'shorts', 'trackpants'];

  return (
    <section className="section mx-5">
      <div className="section-header">
        <h2>Men's Bottom Wear</h2>
        <p className="subtitle">Up to 70% off</p>
      </div>

      <div className="category-tabs">
        {categories.map(cat => (
          <span
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={activeCategory === cat ? 'active' : ''}
            style={{ cursor: 'pointer', marginRight: '10px' }}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </span>
        ))}
      </div>

      <div className="product-list">
        {filteredProducts.length ? (
          filteredProducts.map(item => (
            <ProductCard
              key={item._id}
              _id={item._id}
              name={item.name}
              imageUrl={item.imageUrl}
              tags={item.tags}
              rating={item.rating}
              review={item.review}
              sizes={item.sizes}
              rate={item.rate}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </section>
  );
}

export default MansBottomWear;
