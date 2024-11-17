import React, { useEffect,useRef, useState } from 'react'
import { useDispatchCart,useCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart} from "@fortawesome/free-solid-svg-icons";

export default function Card(props) {
  let dispatch=useDispatchCart();
  let data=useCart();
  const priceRef=useRef();
  const navigate=useNavigate();
  let options=props.options;
  let priceoptions=Object.keys(options)
  const[qty,setQty]=useState(1);
  const[size,setSize]=useState("");
  const [favorite, setFavorite] = useState(false);

  const handleAddToCart= async ()=>{
      if(!localStorage.getItem('authToken')){
        alert("Login to continue")
        navigate("/login")
        return
      }
    let food=[]
    for(const item of data)
    {
      if(item.id===props.foodItem._id){
         food=item;
         break;
      }
    }
    if(food !=[])
    {
      if(food.size===size)
      {
        await dispatch({type:"UPDATE",id:props.foodItem._id,price:finalPrice,qty:qty})
        return;
      }
    
     else if(food.size!==size){

        await dispatch({type:"ADD",id:props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty:qty, size:size})
        return;
      }
      return;
    }
      await dispatch({type:"ADD",id:props.foodItem._id, name: props.foodItem.name, price:finalPrice, qty:qty, size:size})
  }
  
  let finalPrice=qty*parseInt(options[size]);
  useEffect(()=>{
  setSize(priceRef.current.value)
  },[])
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
          {favorite ? <FontAwesomeIcon icon={faHeart} onClick={() => setFavorite(!favorite)} style={{color: "#f2b315" }} /> : <FontAwesomeIcon icon={faHeart} onClick={() => setFavorite(!favorite)} style={{color: "#efd798d7" }} />}
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
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
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