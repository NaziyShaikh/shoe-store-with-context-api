import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const addToCart = (shoe) => {
    const existingItem = cart.find((item) => item.id === shoe.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === shoe.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...shoe, quantity: 1 }]);
    }
  };

  const removeFromCart = (shoeId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === shoeId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const increaseQuantity = (shoeId) => {
    setCart(
      cart.map((item) =>
        item.id === shoeId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (shoeId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === shoeId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const updatePaymentInfo = (info) => {
    setPaymentInfo({ ...paymentInfo, ...info });
  };

  const processPayment = () => {
    // In a real application, this would connect to a payment gateway
    console.log('Processing payment...', { paymentInfo, totalCost });
    // Clear cart after successful payment
    setCart([]);
    setPaymentInfo({
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: ''
    });
    return true;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalCost,
        paymentInfo,
        updatePaymentInfo,
        processPayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);