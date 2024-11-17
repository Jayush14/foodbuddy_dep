import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart, useDispatchCart } from "../components/ContextReducer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();



  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    console.log("User Email:", userEmail);
    let response = await fetch("http://localhost:5000/api/OrderData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString(),
      }),
    });
    console.log(data);
    console.log("Order Response:", response);

    if (response.status === 200) {
      dispatch({ type: "DROP" });
    }
  };

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: "#2e2e35" }}>
      <div className="text-center">
        <h1 className="fs-1 font-weight-bold " style={{ color: "#f3ebe3" }}>Cart</h1>
      </div>

      {data.length > 0?(
      <div className="container m-auto mt-3 table-responsive table-responsive-sm table-responsive-md">
        <table className="table">
          <thead className=" fs-4" style={{ color: "#f2b315" }}>
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
            {
              data.map((food, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{food.name}</td>
                  <td>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        marginRight: "70%",
                        border: "1px solid #f3ebe3",
                        padding: "0%",
                      }}
                    >
                      <div
                        type="button"
                        style={{
                          color: "red",
                          border: "1px solid white",
                          padding: "3px",
                        }}
                        onClick={() =>
                          dispatch({ type: "DECREASE", id: food.id, price: food.price })
                        }
                      >
                        <FontAwesomeIcon icon={faMinus} />
                      </div>
                      <span style={{ margin: "0 10px" }}>{food.qty}</span>
                      <div
                        type="button"
                        style={{
                          color: "green",
                          border: "1px solid white",
                          padding: "3px",
                        }}
                        onClick={() =>
                          dispatch({ type: "INCREASE", id: food.id, price: food.price })
                        }
                      >
                        <FontAwesomeIcon icon={faPlus} />
                      </div>
                    </div>
                  </td>
                  <td>{food.size}</td>
                  <td>{food.price}</td>
                  <td>
                    <button type="button" className="btn p-0">
                      <DeleteIcon
                        style={{ color: "red" }}
                        onClick={() => dispatch({ type: "REMOVE", index: index })}
                      />
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        <div>
          <h1 className="fs-2 " style={{ color: "#f3ebe3" }}>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className="btn  mt-3" style={{ backgroundColor: "#f2b315" }} onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>):
      (
      <div className="text-center" style={{ color: "white" }}>
        <div className="text-center mt-5  fs-1" style={{ color: "#f2b315" }}>The Cart is Empty!</div>
      </div>
    )}
    </div>
  );
  
}
