import { useEffect } from "react";
import "../styles/CartPage.css";
import { useNavigate } from "react-router-dom";

function CartPage({ cartItems = [], setCartItems }) {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8085/displayProducts")
      .then(res => res.json())
      .then(data => {
        const itemsWithQty = data.map(item => ({
          ...item,
          quantity: item.quantity ?? 1
        }));
        setCartItems(itemsWithQty);
      });
  }, [setCartItems]);

  const updateQuantity = (id, newQty) => {
    fetch(`http://localhost:8085/updateQuantity/${id}?quantity=${newQty}`, {
      method: "PUT"
    })
      .then(res => res.json())
      .then(updatedItem => {
        setCartItems(prev =>
          prev.map(item =>
            item.id === id
              ? { ...item, quantity: updatedItem.quantity }
              : item
          )
        );
      });
  };

  const increaseQty = (item) => {
    updateQuantity(item.id, item.quantity + 1);
  };

  const decreaseQty = (item) => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const removeItem = (id) => {
    fetch(`http://localhost:8085/deleteProduct/${id}`, {
      method: "DELETE"
    }).then(() => {
      setCartItems(prev => prev.filter(item => item.id !== id));
    });
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h2 className="cart-title">My Cart</h2>

      {!cartItems.length ? (
        <p className="empty-cart">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-card">
                <img src={item.imageUrl} alt={item.name} />

                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="cart-price">₹{item.price}</p>

                  <div className="qty-control">
                    <button onClick={() => decreaseQty(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item)}>+</button>
                  </div>

                  <p className="item-total">
                    Item Total: ₹{item.price * item.quantity}
                  </p>

                  <button
                    className="delete-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <h3 className="cart-total">Total Amount: ₹{cartTotal}</h3>

          <button
            className="checkout-btn"
            onClick={() =>
              navigate("/checkout", {
                state: { cartTotal, cartItems }
              })
            }
          >
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
