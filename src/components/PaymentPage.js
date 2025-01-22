import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 40px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const FlexContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  gap: 30px;

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

const PaymentCard = styled.div`
  flex: 1;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const CartSummaryCard = styled(PaymentCard)`
  max-height: 80vh;
  overflow-y: auto;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin: 8px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const CartItem = styled.div`
  display: flex;
  gap: 20px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
  }

  .details {
    flex: 1;
  }
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, totalCost, paymentInfo, updatePaymentInfo, processPayment } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updatePaymentInfo({ [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      const success = processPayment();
      if (success) {
        alert('Payment successful!');
        navigate('/');
      }
    } catch (error) {
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <PageContainer>
        <h2>Your cart is empty</h2>
        <Button onClick={() => navigate('/')}>Return to Shopping</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <FlexContainer>
        <PaymentCard>
          <h2>Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Card Number</label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={paymentInfo.cardNumber}
                onChange={handleInputChange}
                maxLength="19"
                required
              />
            </div>
            <div>
              <label>Card Holder Name</label>
              <Input
                type="text"
                name="cardHolder"
                placeholder="John Doe"
                value={paymentInfo.cardHolder}
                onChange={handleInputChange}
                required
              />
            </div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>Expiry Date</label>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  maxLength="5"
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>CVV</label>
                <Input
                  type="password"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  maxLength="3"
                  required
                />
              </div>
            </div>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? 'Processing...' : `Pay $${totalCost.toFixed(2)}`}
            </Button>
          </form>
          <Button 
            onClick={() => navigate('/')} 
            style={{ backgroundColor: '#666' }}
          >
            Return to Shopping
          </Button>
        </PaymentCard>

        <CartSummaryCard>
          <h2>Order Summary</h2>
          {cart.map((item) => (
            <CartItem key={item.id}>
              <img src={item.image} alt={item.name} />
              <div className="details">
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </CartItem>
          ))}
          <div style={{ marginTop: '20px', borderTop: '2px solid #eee', paddingTop: '20px' }}>
            <h3>Total: ${totalCost.toFixed(2)}</h3>
          </div>
        </CartSummaryCard>
      </FlexContainer>
    </PageContainer>
  );
};

export default PaymentPage;