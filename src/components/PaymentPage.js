import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
  background-color: ${props => props.primary ? '#4CAF50' : '#666'};
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin: 10px;
  transition: opacity 0.2s;
  width: ${props => props.fullWidth ? '100%' : 'auto'};

  &:hover {
    opacity: 0.9;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
  gap: 15px;
`;

const CartItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const CartItemDetails = styled.div`
  flex: 1;
`;

const TotalAmount = styled.div`
  font-size: 1.2em;
  font-weight: bold;
  text-align: right;
  padding: 20px;
  border-top: 2px solid #eee;
  margin-top: 20px;
`;

const PaymentPage = () => {
  const navigate = useNavigate();
  const { items, totalAmount } = useSelector(state => state.cart);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Payment Successful!');
    navigate('/');
  };

  return (
    <PageContainer>
      <FlexContainer>
        {/* Payment Details Section */}
        <PaymentCard>
          <h2>Payment Details</h2>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label>Card Number</label>
              <Input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={paymentDetails.cardNumber}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardNumber: e.target.value})}
                maxLength="16"
              />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label>Card Holder Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={paymentDetails.cardHolder}
                onChange={(e) => setPaymentDetails({...paymentDetails, cardHolder: e.target.value})}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>Expiry Date</label>
                <Input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.expiryDate}
                  onChange={(e) => setPaymentDetails({...paymentDetails, expiryDate: e.target.value})}
                  maxLength="5"
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>CVV</label>
                <Input
                  type="password"
                  placeholder="123"
                  maxLength="3"
                  value={paymentDetails.cvv}
                  onChange={(e) => setPaymentDetails({...paymentDetails, cvv: e.target.value})}
                />
              </div>
            </div>

            <Button primary fullWidth type="submit">
              Pay ₹{totalAmount}
            </Button>
          </form>
        </PaymentCard>

        {/* Cart Summary Section */}
        <CartSummaryCard>
          <h2>Order Summary</h2>
          {items.map(item => (
            <CartItem key={item.id}>
              <CartItemImage src={item.image} alt={item.name} />
              <CartItemDetails>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p style={{ color: '#4CAF50', fontWeight: 'bold' }}>
                  ₹{item.price * item.quantity}
                </p>
              </CartItemDetails>
            </CartItem>
          ))}
          
          <TotalAmount>
            Total Amount: ₹{totalAmount}
          </TotalAmount>

          <Button 
            onClick={() => navigate('/')}
            fullWidth
            style={{ backgroundColor: '#007bff' }}
          >
            Back to Shopping
          </Button>
        </CartSummaryCard>
      </FlexContainer>
    </PageContainer>
  );
};

export default PaymentPage;