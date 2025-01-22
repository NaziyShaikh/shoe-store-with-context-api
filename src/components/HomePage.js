import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  padding: 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  flex: 2;
  padding: 20px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
`;

const Button = styled.button`
  background-color: ${props => props.primary ? '#4CAF50' : '#ff4444'};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const CartSection = styled.div`
  flex: 1;
  background: white;
  padding: 20px;
  border-radius: 10px;
  margin-left: 20px;
  height: fit-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;

  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 5px;
    margin-right: 10px;
  }
`;

const QuantityControl = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;

  button {
    background: #eee;
    border: none;
    padding: 5px 10px;
    border-radius: 3px;
    cursor: pointer;

    &:hover {
      background: #ddd;
    }
  }
`;

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, increaseQuantity, decreaseQuantity, totalCost } = useCart();

  const shoes = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 12000,
      image: "/images/AIR+MAX+90.png",
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 15000,
      image: "/images/KD17+EP (1).png",
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: 10000,
      image: "/images/ULTRABOOST_1.0_SHOES_Black_HQ4201_HM1.avif",
    },
    {
      id: 4,
      name: "Nike Air Force",
      price: 18000,
      image: "/images/NIKE+AIR+ZOOM+RIVAL+FLY+4.png",
    },
    {
      id: 5,
      name: "Adidas Superstar",
      price: 20000,
      image: "/images/NIKE+ATTACK.png",
    },
    {
      id: 6,
      name: "Puma Suede",
      price: 15000,
      image: "/images/VAPOR+16+CLUB+FG_MG.png",
    },
    {
      id: 7,
      name: "Nike Jordan",
      price: 22000,
      image: "/images/AIR+JORDAN+1+LOW.png",
    },
    {
      id: 8,
      name: "Adidas NMD",
      price: 16000,
      image: "/images/AIR+JORDAN+XXXIX+RNWY+PF.png",
    }
  ];

  return (
    <Container>
      <ProductGrid>
        {shoes.map(shoe => (
          <ProductCard key={shoe.id}>
            <ProductImage src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>₹{shoe.price}</p>
            <Button primary onClick={() => addToCart(shoe)}>
              Add to Cart
            </Button>
          </ProductCard>
        ))}
      </ProductGrid>

      <CartSection>
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            {cart.map(item => (
              <CartItem key={item.id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h4>{item.name}</h4>
                  <p>₹{item.price} x {item.quantity}</p>
                </div>
                <QuantityControl>
                  <button onClick={() => decreaseQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQuantity(item.id)}>+</button>
                </QuantityControl>
              </CartItem>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h3>Total: ₹{totalCost.toFixed(2)}</h3>
              <Button primary onClick={() => navigate('/payment')}>
                Proceed to Payment
              </Button>
            </div>
          </>
        )}
      </CartSection>
    </Container>
  );
};

export default HomePage;