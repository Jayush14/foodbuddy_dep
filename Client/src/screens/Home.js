import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import './Home.css';
import Cookies from 'js-cookie';

export default function Home() {
  const [search, setSearch] = useState("");
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);
  const [isLoading, setIsLoading] = useState(true);  // For loading state
  const [isConnecting, setIsConnecting] = useState(true);  // For connection state
  const [isError, setIsError] = useState(false);  // For error state

  const loadData = async () => {
    setIsLoading(true);
    setIsConnecting(true);
    setIsError(false);

    // const myCookieValue = Cookies.get('myCookieName');
    // console.log("Cookies: ",myCookieValue);
    try {
      let response = await fetch("http://localhost:5000/api/foodData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the server");
      }

      let data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
      setIsLoading(false);
      setIsConnecting(false);  // Connection successful
    } catch (err) {
      console.error("Error fetching data:", err);
      setIsError(true);  // Error while connecting
      setIsConnecting(false);  // Failed connection, so stop trying
    }
  };

  useEffect(() => {
    loadData();  // Retry fetching the data until success
  }, []);

  if (isConnecting) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Connecting to the server...</h2>
        <p>Trying to establish a connection to retrieve the latest food items!</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="loading-container">
        <h2>Connection Failed</h2>
        <p>We're having trouble connecting to the server. Please try again later.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <h2>Cooking up something delicious...</h2>
        <p>Your favorite food is just a moment away!</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#2e2e35" }}>
      <Navbar />
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: "contain !important", borderBottom: "3px solid #f2b315" }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: "10" }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://plus.unsplash.com/premium_photo-1673580742890-4af144293960?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://plus.unsplash.com/premium_photo-1673108852141-e8c3c22a4a22?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Zm9vZHxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100"
              style={{ filter: "brightness(40%)" }}
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {FoodCat.length > 0 ? (
          FoodCat.map((data) => {
            const filteredItems =
              FoodItem.length > 0
                ? FoodItem.filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                : [];

            return (
              <div key={data._id}>
                <div
                  className="fs-3 m-3"
                  style={{
                    color: "#f2b315",
                    fontFamily: "Arial, sans-serif",
                    fontSize: "100px",
                  }}
                >
                  {data.CategoryName}
                </div>
                <hr style={{ color: "#f2b315" }} />
                <div className="row row-cols-1 row-cols-md-3 g-4">
                  {filteredItems.map((filterItems) => (
                    <div key={filterItems._id} className="col">
                      <Card foodItem={filterItems} options={filterItems.options[0]} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div>No data available</div>
        )}
      </div>

      <Footer />
    </div>
  );
}
