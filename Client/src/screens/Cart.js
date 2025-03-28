import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useGlobalState } from "../ContextAPI/GlobalStateContext";
import { useNavigate } from "react-router-dom";
export default function Cart() {
  const { state, dispatch } = useGlobalState();
  let data = state.cart;
  const navigate = useNavigate();
  const handleCheckOut = async () => {
    navigate("/Checkout");
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: "#2e2e35" }}>
      <div className="text-center">
        <h1 className="fs-1 font-weight-bold " style={{ color: "#f3ebe3" }}>
          Cart
        </h1>
      </div>

      {data.length > 0 ? (
        <div className="container m-auto mt-3 table-responsive table-responsive-sm table-responsive-md ">
          <table
            className="table text-center"
            style={{ backgroundColor: "#2e2e35" }}
          >
            {" "}
            {/* Center aligns table content */}
            <thead className="fs-4">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Quantity</th>
                <th scope="col">Option</th>
                <th scope="col">Amount</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody style={{ color: "#f3ebe3" }}>
              {data.map((food, index) => (
                <tr key={index} className="align-middle">
                  {" "}
                  {/* Ensures vertical alignment */}
                  <th scope="row">
                    <img
                      src={food.img}
                      alt={food.name}
                      className="cart-item-img"
                      style={{
                        width: "40px",
                        height: "40px",
                        borderRadius: "5px",
                        display: "block",
                        margin: "auto", // Centers image
                      }}
                    />
                  </th>
                  <td
                    className="text-truncate"
                    style={{ maxWidth: "150px" }}
                    title={food.name}
                  >
                    {food.name}
                  </td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        border: "1px solid #f3ebe3",
                        padding: "5px",
                        gap: "10px", // Ensures even spacing
                      }}
                    >
                      <button
                        style={{
                          color: "red",
                          border: "none",
                          background: "transparent",
                          padding: "5px",
                        }}
                        onClick={() =>
                          dispatch({
                            type: "DECREASE",
                            id: food.id,
                            price: food.price,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </button>
                      <span>{food.qty}</span>
                      <button
                        style={{
                          color: "green",
                          border: "none",
                          background: "transparent",
                          padding: "5px",
                        }}
                        onClick={() =>
                          dispatch({
                            type: "INCREASE",
                            id: food.id,
                            price: food.price,
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </button>
                    </div>
                  </td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button type="button" className="btn p-0">
                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() =>
                          dispatch({ type: "REMOVE", index: index })
                        }
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Total Price */}
          <div className="text-center mt-3">
            <h1 className="fs-2" style={{ color: "#f3ebe3" }}>
              Total Price: {totalPrice}/-
            </h1>
          </div>

          {/* Checkout Button */}
          <div className="text-center">
            <button
              className="btn mt-3"
              style={{ backgroundColor: "#f2b315" }}
              onClick={handleCheckOut}
            >
              Check Out
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center" style={{ color: "white" }}>
          <div className="text-center mt-5  fs-1" style={{ color: "#f2b315" }}>
            The Cart is Empty!
          </div>
        </div>
      )}
    </div>
  );
}
