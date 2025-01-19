import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { addToCart, increaseQuantity, decreaseQuantity } from '../redux/cartSlice';

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

const CartContainer = styled.div`
  flex: 1;
  margin-left: 20px;
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #eee;
`;

const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
`;

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, totalAmount } = useSelector(state => state.cart);

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
        {shoes.map((shoe) => (
          <ProductCard key={shoe.id}>
            <ProductImage src={shoe.image} alt={shoe.name} />
            <h3>{shoe.name}</h3>
            <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>₹{shoe.price}</p>
            <Button primary onClick={() => dispatch(addToCart(shoe))}>
              Add to Cart
            </Button>
          </ProductCard>
        ))}
      </ProductGrid>

      <CartContainer>
        <h2>Shopping Cart</h2>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {items.map((item) => (
              <CartItem key={item.id}>
                <CartItemImage src={item.image} alt={item.name} />
                <div style={{ flex: 1 }}>
                  <h4>{item.name}</h4>
                  <p>₹{item.price} x {item.quantity}</p>
                </div>
                <div>
                  <Button onClick={() => dispatch(decreaseQuantity(item.id))}>-</Button>
                  <span style={{ margin: '0 10px' }}>{item.quantity}</span>
                  <Button onClick={() => dispatch(increaseQuantity(item.id))}>+</Button>
                </div>
              </CartItem>
            ))}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <h3>Total: ₹{totalAmount}</h3>
              <Button primary onClick={() => navigate('/payment')}>
                Proceed to Payment
              </Button>
            </div>
          </>
        )}
      </CartContainer>
    </Container>
  );
};

export default HomePage;