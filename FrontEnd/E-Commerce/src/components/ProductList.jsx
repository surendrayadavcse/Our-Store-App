import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import { getProducts } from '../components/reduxtoolkit/productsSlice';
import { addToCart } from '../components/reduxtoolkit/cartSlice'; 
import { useNavigate } from 'react-router-dom';

const ProductList = () => { 
  const navigate = useNavigate();
  const dispatch = useDispatch(); 
  const products = useSelector((state) => state.products.items); 

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  
  const handleAddToCart = (product) => {
    const userId = localStorage.getItem("userId");
    if (userId) {
        dispatch(addToCart({ productId: product._id, quantity: 1, userId }));
    } else {
      alert("Please Login");
      navigate("/login");
    }
  };

  return (
    <div className='product-grid'>
      {products.map((product) => (
        <div className='product-card' key={product._id}>
          <img src={product.image} alt={product.title} className='product-image' />
          <div className='product-info'>
            <h6>{product.title}</h6>
            <p>Rs {product.price}</p>
            <p>{product.description}</p>
            <p>Rating: {product.rating} ⭐</p>
            <button className='btn btn-primary add-to-cart' onClick={() => handleAddToCart(product)}>Add to Cart</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
