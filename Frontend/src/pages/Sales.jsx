import React from 'react';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom

const Sales = ({ cart, removeFromCart, updateQuantity }) => {
  // Calculate total amount with quantity
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleQuantityChange = (id, quantity) => {
    updateQuantity(id, quantity);  // Update the quantity in the cart
  };

  return (
    <div>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p>No items in the cart.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                {/* Display multiple images in the cart */}
                <div>
                  {item.photos.map((photo, index) => (
                    <img key={index} src={photo} alt={`${item.name} Image ${index + 1}`} style={{ width: '50px', marginRight: '5px' }} />
                  ))}
                </div>
                {item.name} - ${item.price} x {item.quantity}
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                <div>
                  <button
                    disabled={item.quantity <= 1}
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    - Quantity
                  </button>
                  <span> {item.quantity} </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    + Quantity
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h2>Total: ${totalAmount.toFixed(2)}</h2>
        </div>
      )}

      {/* Go to Home Button */}
      <Link to="/home">
        <button className="button">
          <span className="text_button">Back Home</span>
        </button>
      </Link>
    </div>
  );
};

export default Sales;
