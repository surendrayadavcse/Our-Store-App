import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCart } from '../components/reduxtoolkit/cartSlice'; // Import the action

const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice, status, error } = useSelector(state => state.cart); // Access cart state from Redux store

  useEffect(() => {
    // Fetch the cart when the component loads
    const token=localStorage.getItem("token")
    console.log(token)
    dispatch(getCart());
  }, [dispatch]);
  
  if (status === 'loading') {
    return <div>Loading cart...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id}>
              <p>{item.productId.title} - Quantity: {item.quantity}</p>
              <p>Price: ${item.productId.price.toFixed(2)}</p>
            </div>
          ))}
          <p>Total Quantity: {totalQuantity}</p>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
