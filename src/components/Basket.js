import React, { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Basket(props) {
  const history = useHistory();
  const [to, setTo] = useState("");
  const { cartItems, setCartItems, onAdd, onRemove } = props;
  const itemsPrice = cartItems.reduce((a, c) => a + c.qty * c.price, 0);
  const taxPrice = itemsPrice * 0.14;
  const shippingPrice = itemsPrice > 2000 ? 0 : 20;

  // const totalPrice = () => {
  //   console.log("I am getting called");
  //   return itemsPrice + taxPrice + shippingPrice;
  // }

  // no re-rendering of the function will happen on action of other events.
  const totalPrice = useMemo(() => {
    console.log("useMEMO");
    return itemsPrice + taxPrice + shippingPrice;
  }, [itemsPrice, taxPrice, shippingPrice]);

  const enterPhn = (e) => {
    console.log(e.target.value);
    setTo(e.target.value);
  };
  useEffect(() => {
    const savedItems = localStorage.getItem("cart");
    if (savedItems) {
      setCartItems(JSON.parse(savedItems));
    }
  }, [setCartItems]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };
  const handleClick = (e) => {
    e.preventDefault();
    let confirmOrder = window.confirm(
      "Are you sure you want to place the order?"
    );
    if (confirmOrder && to !== "") {
      fetch(
        "https://api.twilio.com/2010-04-01/Accounts/" +
          process.env.REACT_APP_TWILIO_ACCOUNT_SID +
          "/Messages.json",
        {
          method: "POST",
          headers: {
            Authorization:
              "Basic " +
              btoa(
                process.env.REACT_APP_TWILIO_ACCOUNT_SID +
                  ":" +
                  process.env.REACT_APP_TWILIO_AUTH_TOKEN
              ),
          },
          body: new URLSearchParams({
            To: to,
            Body: "Item has been dispatched. It will be at your door soon from Shopping Cart.",
            From: process.env.REACT_APP_TWILIO_PHONE_NUMBER,
          }),
        }
      );
      history.push("/ordered");
    }
  };

  return (
    <aside className="block col-1">
      <h2>Cart Items</h2>
      <div>
        {cartItems.length === 0 && <div>Cart is empty</div>}
        {cartItems.map((item) => (
          <div key={item.id} className="row">
            <div className="col-2">{item.title}</div>
            <div className="col-2">
              <button onClick={() => onRemove(item)} className="remove">
                -
              </button>{" "}
              <button onClick={() => onAdd(item)} className="add">
                +
              </button>
            </div>

            <div className="col-2 text-right">
              {item.qty} x ₹{item.price.toFixed(2)}
            </div>
          </div>
        ))}

        {cartItems.length !== 0 && (
          <>
            <hr></hr>
            <button onClick={clearCart}>Clear cart</button>
            <div className="row">
              <div className="col-2">Items Price</div>
              <div className="col-1 text-right">₹{itemsPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Tax Price</div>
              <div className="col-1 text-right">₹{taxPrice.toFixed(2)}</div>
            </div>
            <div className="row">
              <div className="col-2">Shipping Price</div>
              <div className="col-1 text-right">
                ₹{shippingPrice.toFixed(2)}
              </div>
            </div>

            <div className="row">
              <div className="col-2">
                <strong>Total Price</strong>
              </div>
              <div className="col-1 text-right">
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>
            </div>
            <hr />
            <div style={{ paddingBottom: "15px" }}>
              <label htmlFor="phone">Enter Mobile Number:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                placeholder="Please type your number with country code"
                onChange={(e) => enterPhn(e)}
              ></input>
              <br />
            </div>
            <div className="row">
              <button onClick={(e) => handleClick(e)}>Place Order</button>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
