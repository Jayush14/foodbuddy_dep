import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Badge from "react-bootstrap/Badge";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import { useCart } from "./ContextReducer";
import "./Navbar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart ,faBars} from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const [cartView, setCartView] = useState(false);
  const [hamburger, setHamburger] = useState(false);

  let data = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const handleHamburger = () => {
    setHamburger(!hamburger);
  };
  const hamburgerMenuStyle = {
    backgroundColor: "#f3ebe3",
    position: "absolute",
    top: "60px",
    right: "10px",
    width: "200px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
    padding: "10px",
    borderRadius: "8px",
  };
  
  const menuItemStyle = {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #ccc",
    color: "#2e2e35",
    textAlign: "left",
  };

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          backgroundColor: "#2e2e35",
          borderBottom: "3px solid #f2b315",
        }}
      >
        <div className="container-fluid">
          <Link
            className="navbar-brand fs-1 fst-italic"
            style={{ color: "#f2b315" }}
            to="/"
          >
            CraveCart
          </Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item"></li>
            </ul>

            {localStorage.getItem("authToken") ? (
              <div>
                <div
                  className="btn"
                  style={{
                    backgroundColor: "#f3ebe3",
                    color: "#2e2e35",
                    marginRight: "10px",
                  }}
                  onClick={() => setCartView(true)}
                >
                  <FontAwesomeIcon icon={faShoppingCart} />{" "}
                  <Badge pill bg="danger">
                    {data.length}
                  </Badge>
                </div>
                <div
                  className="btn"                   style={{
                    backgroundColor: "#f3ebe3",
                    color: "#2e2e35",
                    marginRight: "10px",
                  }}
                  onClick={handleHamburger}>
                    <FontAwesomeIcon icon={faBars} />
                  </div>
                  {hamburger && (
                  <div className="hamburger-menu" style={hamburgerMenuStyle}>
                    <ul style={{ listStyleType: "none",fontSize:"0.8rem", padding: 0 }}>
                      <li
                        className="hamburger-item"
                        onClick={() => navigate("/profile")}
                        style={menuItemStyle}
                      >
                        Profile 
                        <img></img><p style={{ color: "bule"  ,fontSize:"1rem" }}>Hi, UserName</p>
                      </li>
                      <li
                        className="hamburger-item"
                        onClick={() => navigate("/")}
                        style={menuItemStyle}
                      >
                        My Orders
                      </li>
                      <li
                        className="hamburger-item"
                        onClick={() => navigate("/")}
                        style={menuItemStyle}
                      >
                        Settings
                      </li>
                      <li
                        className="hamburger-item"
                        onClick={handleLogout}
                        style={menuItemStyle}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
                {cartView ? (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                ) : null}
              </div>
            ) : (
              <>
                {location.pathname === "/login" && (
                  <a
                    href="/Createuser"
                    style={{
                      color: "#f4b400",
                      fontSize: "1.2rem",
                      marginRight: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    Signup
                  </a>
                )}
                {location.pathname === "/Createuser" && (
                  <a
                    href="/login"
                    style={{
                      color: "#f4b400",
                      fontSize: "1.2rem",
                      marginRight: "1rem",
                      textDecoration: "none",
                    }}
                  >
                    Login
                  </a>
                )}
                {location.pathname === "/" && (
                  <>
                    <a
                      href="/Createuser"
                      style={{
                        color: "#f4b400",
                        fontSize: "1.2rem",
                        marginRight: "1rem",
                        textDecoration: "none",
                      }}
                    >
                      Register
                    </a>
                    <a
                      href="/login"
                      style={{
                        color: "#f4b400",
                        fontSize: "1.2rem",
                        marginRight: "1rem",
                        textDecoration: "none",
                      }}
                    >
                      Login
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
