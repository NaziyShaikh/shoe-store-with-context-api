import React from 'react';

const Navbar = () => {
  return (
    <nav style={{
      backgroundColor: '#333',
      padding: '1rem',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Shoe Store
      </div>
      <div>
        <a href="/" style={{ color: 'white', textDecoration: 'none', marginRight: '1rem' }}>Home</a>
        <a href="/cart" style={{ color: 'white', textDecoration: 'none' }}>Cart</a>
      </div>
    </nav>
  );
};

export default Navbar;