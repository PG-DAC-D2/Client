import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../app/slices/productSlice';

function ProductView() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      {loading ? <p>Loading...</p> : items.map(p => <p key={p._id}>{p.name}</p>)}
    </div>
  );
}

export default ProductView;
