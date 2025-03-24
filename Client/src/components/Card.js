import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "../ContextAPI/GlobalStateContext";

export default function Card(props) {
  const navigate = useNavigate();
  const priceRef = useRef();
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [favorite, setFavorite] = useState(false);
  
  const { state, dispatch } = useGlobalState(); // ✅ Single Hook
  const cart = state.cart; // ✅ Use cart from global state

  let options = props.options;
  let priceoptions = Object.keys(options);

  let finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    // If user is not logged in, redirect to login page
    if (!state.isLoggedIn) {
      alert("Login to continue");
      navigate("/login");
      return;
    }

    let existingFood = cart.find((item) => item.id === props.foodItem._id && item.size === size);

    if (existingFood) {
      // ✅ Update quantity if same item & size already exists
      await dispatch({
        type: "UPDATE",
        id: props.foodItem._id,
        price: finalPrice,
        qty: qty,
      });
    } else {
      // ✅ Add new item to cart
      await dispatch({
        type: "ADD",
        id: props.foodItem._id,
        name: props.foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size,
        img: props.foodItem.img,
      });
    }


    console.log("state from cart",state)
  };

  return (
    <div className="my-3">
      <div
        className="card mt-3"
        style={{
          width: "18rem",
          maxHeight: "360px",
          backgroundColor: "#f3ebe3",
          color: "#2e2e35",
          border: "solid 2px #f2b315",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "8px",
        }}
      >
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt={props.foodItem.name}
          style={{
            height: "120px",
            objectFit: "cover",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
          }}
        />
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <h5 className="card-title">{props.foodItem.name}</h5>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => setFavorite(!favorite)}
              style={{ color: favorite ? "#f2b315" : "#efd798d7" }}
            />
          </div>

          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <select
                className="m-2 h-100"
                style={{
                  backgroundColor: "#f2b315",
                  color: "#2e2e35",
                  border: "none",
                  borderRadius: "5px",
                }}
                onChange={(e) => setQty(Number(e.target.value))}
              >
                {Array.from({ length: 6 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>

              <select
                className="m-2 h-100"
                style={{
                  backgroundColor: "#f2b315",
                  color: "#2e2e35",
                  border: "none",
                  borderRadius: "5px",
                }}
                ref={priceRef}
                onChange={(e) => setSize(e.target.value)}
              >
                {priceoptions.map((data) => (
                  <option key={data} value={data}>
                    {data}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-inline h-100 fs-5">
              <span style={{ color: "#f2b315" }}>Rs {finalPrice}/-</span>
            </div>
          </div>
          <hr style={{ borderColor: "#f3ebe3" }} />
          <button
            className="btn btn-warning w-100"
            style={{
              backgroundColor: "#f2b315",
              color: "#2e2e35",
              border: "none",
            }}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
