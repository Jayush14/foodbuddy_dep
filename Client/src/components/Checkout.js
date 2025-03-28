import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useGlobalState } from "../ContextAPI/GlobalStateContext";
const Checkout = () => {
  const { state, dispatch } = useGlobalState();
  const cartItems = state.cart;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    address: "",
    address2: "",
    country: "",
    state: "",
    zip: "",
    paymentMethod: "",
    cardName: "",
    cardNumber: "",
    cardExpiration: "",
    cardCVV: "",
  });

  console.log("stateCart", state.cart);
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    alert("Checkout successful!");
  };

  return (
    <div
      className="container text-dark bg-light "
      style={{ marginTop: "100px", marginBottom: "10px" }}
    >
      <div className="text-center mb-4">
        <img
          className="d-block mx-auto mb-3"
          src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
          alt="Bootstrap"
          width="72"
        />
        <h2>Checkout form</h2>
        <p className="lead">
          Below is an example form built entirely with Bootstrap’s form
          controls.
        </p>
      </div>
      <div className="row">
        <div className="col-md-7">
          <h4 className="mb-3">Billing address</h4>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-sm-6">
                <label className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-sm-6">
                <label className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-12">
                <label className="form-label">Username</label>
                <div className="input-group">
                  <span className="input-group-text">@</span>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="col-12">
                <label className="form-label">Email (Optional)</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  className="form-control"
                  id="address"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-5">
                <label className="form-label">State</label>
                <input
                  type="text"
                  className="form-control"
                  id="State"
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="col-md-4">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="City"
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="col-md-3">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  className="form-control"
                  id="pincode"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <hr />
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="sameAsBilling"
                onChange={handleChange}
              />
              <label className="form-check-label">
                Shipping address is the same as my billing address
              </label>
            </div>
            <div className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="saveInfo"
                onChange={handleChange}
              />
              <label className="form-check-label">
                Save this information for next time
              </label>
            </div>
            <hr />
            <h4 className="mb-3">Payment</h4>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="paymentMethod"
                value="Credit card"
                id="paymentMethod"
                checked={formData.paymentMethod === "Credit card"}
                onChange={handleChange}
              />
              <label className="form-check-label">Credit card</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="paymentMethod"
                value="Debit card"
                id="paymentMethod"
                checked={formData.paymentMethod === "Debit card"}
                onChange={handleChange}
              />
              <label className="form-check-label">Debit card</label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                className="form-check-input"
                name="paymentMethod"
                value="PayPal"
                id="paymentMethod"
                checked={formData.paymentMethod === "PayPal"}
                onChange={handleChange}
              />
              <label className="form-check-label">UPI</label>
            </div>
            <hr />
            <button className="w-100 btn btn-primary" type="submit">
              Continue to checkout
            </button>
          </form>
        </div>
        <div className="col-md-5">
          <h4 className="mb-3">Your cart</h4>
          {cartItems.length > 0 ? (
            <ul className="list-group mb-3">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex align-items-center justify-content-between"
                >
                  {/* Name & Image */}
                  <div className="d-flex align-items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="cart-item-img"
                      style={{
                        width: "40px",
                        height: "40px",
                        marginRight: "10px",
                        borderRadius: "5px",
                      }}
                      title={item.name} // Tooltip on hover
                    />
                    {/* <span
                    className="text-truncate"
                    style={{
                      maxWidth: "120px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                    title={item.name} // Tooltip on hover
                  >
                    {item.name}
                  </span> */}
                  </div>

                  {/* Quantity (Fixed Position) */}
                  <div className="text-center" style={{ minWidth: "80px" }}>
                    {item.qty}
                  </div>

                  {/* Price (Fixed Position) */}
                  <div className="text-end" style={{ minWidth: "80px" }}>
                    ${item.price}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div
              className="card text-center p-5 mb-3"
              style={{ minWidth: "80px" }}
            >
              Your cart is empty
            </div>
          )}
          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
              />
              <button type="submit" className="btn btn-secondary">
                Redeem
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
