

import axios from 'axios';
const base_url = "http://localhost:3000";

class CartService {
  async addToCart(productId, quantity, userId) {
    try {
       
      const response = await axios.post(`${base_url}/api/cart`, { productId, quantity, userId}); // Include userId in the request
     console.log(response.data)
      return response.data;
    } catch (error) {
      throw error.response.data || "Error adding product to cart";
    }
  }

  async removeFromCart(productId) {
    try {
      const response = await axios.delete(`${base_url}/api/cart/${productId}`);
      return response.data;
    } catch (error) {
      throw error.response.data || "Error removing product from cart";
    }
  }

//   async getCart(userId) {
//     try {
//       const response = await axios.get('/api/cart', { params: { userId } }); // Include userId in the request
//       return response.data;
//     } catch (error) {
//       throw error.response.data || "Error fetching cart";
//     }
//   }
async getCart(userId) {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log('Get Cart Response:', data); // Log the response data
    return data; // Make sure you're returning the parsed response
}


  async updateQuantity(productId, quantity) {
    try {
      const response = await axios.put(`/api/cart/${productId}`, { quantity });
      return response.data;
    } catch (error) {
      throw error.response.data || "Error updating product quantity in cart";
    }
  }
}

export const cartService = new CartService();
