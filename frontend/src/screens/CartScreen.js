import "./CartScreen.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

// Components
import CartItem from "../components/CartItem";

// Actions
import {
  addToCart,
  removeFromCart,
  clearCart,
} from "../redux/actions/cartActions";

const CartScreen = () => {
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {}, []);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    return cartItems.reduce((qty, item) => Number(item.qty) + qty, 0);
  };

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        icon: "info",
        title: "Your cart is empty",
        text: "Please add items to your cart before proceeding to checkout.",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Proceeding to checkout...",
        text: "You order has been successfully placed.",
        showLoaderOnConfirm: true,
        showConfirmButton: true,
      }).then(() => {
        dispatch(clearCart());
        window.location.href = "/";
      });
    }
  };

  const handleAddMoreItems = () => {
    window.location.href = "/";
  };
  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h2>Shopping Cart</h2>

          {cartItems.length === 0 ? (
            <div>
              Your Cart Is Empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeFromCartHandler}
              />
            ))
          )}
          <div className="button_left">
          {cartItems.length > 0 && (
            <button onClick={handleAddMoreItems}>Add More Item</button>
          )}
          </div>
        </div>

        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({getCartCount()}) items</p>
            <p>Rs.{getCartSubTotal()}</p>
          </div>
          <div>
            <button onClick={handleCheckout}>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartScreen;
