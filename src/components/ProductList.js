import React from 'react';
import { useCart } from '../context/CartContext';

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    price: 129.99,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 2,
    name: "Adidas Ultraboost",
    price: 159.99,
    image: "https://via.placeholder.com/150"
  },
  {
    id: 3,
    name: "Puma RS-X",
    price: 89.99,
    image: "https://via.placeholder.com/150"
  }
];

const ProductList = () => {
  const { addToCart } = useCart();

  return (
    <div className="product-list">
      <h2>Our Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;