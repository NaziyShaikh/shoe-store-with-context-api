import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, totalCost } = useCart();

  const shoes = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 12000,
      image: "/images/AIR+MAX+90.png", // Update path
    },
    {
      id: 2,
      name: "Adidas Ultraboost",
      price: 15000,
      image: "/images/KD17+EP (1).png", // Update path
    },
    {
      id: 3,
      name: "Puma RS-X",
      price: 10000,
      image: "/images/ULTRABOOST_1.0_SHOES_Black_HQ4201_HM1.avif", // Update path
    },
    {
      id: 4,
      name: "Nike Air Force",
      price: 18000,
      image: "/images/NIKE+AIR+ZOOM+RIVAL+FLY+4.png", // Update path
    },
    {
      id: 5,
      name: "Adidas Superstar",
      price: 20000,
      image: "/images/NIKE+ATTACK.png", // Update path
    },
    {
      id: 6,
      name: "Puma Suede",
      price: 15000,
      image: "/images/VAPOR+16+CLUB+FG_MG.png", // Update path
    },
    {
      id: 7,
      name: "Nike Cortez",
      price: 12000,
      image: "/images/AIR+JORDAN+1+LOW.png", // Update path
    },
    {
      id: 8,
      name: "Adidas Gazelle",
      price: 18000,
      image: "/images/AIR+JORDAN+XXXIX+RNWY+PF.png", // Update path
    },
  ];

  return (
    <div>
      <div style={{ display: "flex", padding: "20px" }}>
        <div style={{ flex: 2 }}>
          <h2>Shoe Collection</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px" }}>
            {shoes.map((shoe) => (
              <div
                key={shoe.id}
                style={{
                  border: "1px solid #ccc",
                  padding: "10px",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={shoe.image}
                  alt={shoe.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: "10px",
                  }}
                />
                <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                  {shoe.name}
                </h3>
                <p style={{ fontSize: "16px" }}>₹{shoe.price}</p>
                <button
                  style={{
                    backgroundColor: "#007bff",
                    color: "#fff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                  onClick={() => addToCart(shoe)}
                >
                  Add to Cart
                </button>
                <button
                  style={{
                    backgroundColor: "#dc3545",
                    color: "#fff",
                    padding: "5px 10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                  onClick={() => removeFromCart(shoe.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shopping Cart */}
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    margin: "10px",
                    borderRadius: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                      borderRadius: "5px",
                      marginRight: "10px",
                    }}
                  />
                  <h3 style={{ margin: "0", flex: 1 }}>{item.name}</h3>
                  <p style={{ margin: "0" }}>₹{item.price} x {item.quantity}</p>
                  <button
                    style={{
                      backgroundColor: "#dc3545",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <button
                    style={{
                      backgroundColor: "#28a745",
                      color: "#fff",
                      padding: "5px 10px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      marginLeft: "10px",
                    }}
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
              ))}
              <h3 style={{ textAlign: "center" }}>Total: ₹{totalCost}</h3>
              <button
                style={{
                  backgroundColor: "#28a745",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  width: "100%",
                  marginTop: "10px"
                }}
                onClick={() => navigate('/payment')}
              >
                Proceed to Payment
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;