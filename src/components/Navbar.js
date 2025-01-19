import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #333;
  padding: 1rem;
  color: white;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const CartInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Navbar = () => {
  const { items, totalAmount } = useSelector(state => state.cart);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <Nav>
      <NavContainer>
        <Logo to="/">Shoe Store</Logo>
        <CartInfo>
          <span>Items: {totalItems}</span>
          <span>Total: ₹{totalAmount}</span>
        </CartInfo>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;