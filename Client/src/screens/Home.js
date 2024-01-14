import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footr from "../components/Footr";
import Card from "../components/Card";

export default function Home() {
  const [search, setSearch] = useState("");
  const [FoodCat, setFoodCat] = useState([]);
  const [FoodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ backgroundColor: "#F5F5DC" }}>
      <div>
        <Navbar />
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
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
                src="https://source.unsplash.com/random/900x700/?burger"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?pastry"
                className="d-block w-100"
                style={{ filter: "brightness(40%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://source.unsplash.com/random/900x700/?barbeque"
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
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleFade"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="container">
        {FoodCat != []
          ? FoodCat.map((data) => {
              const filteredItems =
                FoodItem != []
                  ? FoodItem.filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                  : [];

              return (
                <div key={data._id}>
                  <div className="fs-3 m-3" style={{ color: "black", fontFamily: "Arial, sans-serif" , fontSize: "100px" }}>
                    {data.CategoryName}
                  </div>
                  <hr />
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
          : ""}
      </div>
      <div>
        <Footr />
      </div>
    </div>
  );
}
