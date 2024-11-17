import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import Footr from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";
export default function Signup() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    ConfirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passregex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (passregex.test(credentials.password) === false) {
      alert(
        "Password must be between 8 and 15 characters and contain at least one number, one uppercase letter, one lowercase letter and one special character"
      );
      setCredentials({ ...credentials, password: "", ConfirmPassword: "" });
      return;
    }

    if (credentials.password !== credentials.ConfirmPassword) {
      alert("Passwords do not match");
      setCredentials({ ...credentials, password: "", ConfirmPassword: "" });
      return;
    }

    const response = await fetch("http://localhost:5000/api/Createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    } else {
      alert("Account created successfully");
      navigate("/login");
    }

    setCredentials({ name: "", email: "", password: "", ConfirmPassword: "" });
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  function onGoogleLoginSuccess(res) {
    // console.log("Login Success: currentUser:", res);

    fetch("http://localhost:5000/api/continueWithGoogle", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: res.credential,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem("userEmail", data.email);
          localStorage.setItem("authToken", data.authToken);
          console.log(localStorage.getItem("authToken"));
          navigate("/");
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    <div
      style={{
        backgroundColor: "#2e2e35",
        minHeight: "100vh",
        overflowY: "auto",
      }}
    >
      <div>
        <Navbar />
      </div>

      <div className="containers d-flex justify-content-center align-items-center">
        <form
          className="w-100 p-4 rounded shadow"
          style={{
            maxWidth: "500px",
            backgroundColor: "#f3ebe3",
            borderRadius: "10px",
            padding: "40px",
            marginTop: "5vh", // For some breathing room at the top
            marginBottom: "5vh", // Ensures space at the bottom for scrolling
          }}
          onSubmit={handleSubmit}
        >
          <h2 className="text-center mb-4" style={{ color: "#2e2e35" }}>
            Signup
          </h2>
          <div className="mb-3">
            <label
              htmlFor="name"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Name
            </label>
            <input
              type="text"
              className="form-control bg-transparent border border-success"
              style={{ color: "#2e2e35" }}
              name="name"
              value={credentials.name}
              onChange={onChange}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-transparent border border-success"
              name="email"
              style={{ color: "#2e2e35" }}
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your email"
            />
            {/* <div id="emailHelp" className="form-text text-danger">
              We'll never share your email with anyone else.
            </div> */}
          </div>
          <div className="password-input-container mb-3">
            <label
              htmlFor="password"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control bg-transparent border border-success"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              placeholder="Enter your password"
              style={{ color: "#2e2e35" }}
            />
            <button
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
              type="button"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="password-input-container mb-3">
            <label
              htmlFor="Confirm password"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Confirm password
            </label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control bg-transparent border border-success"
              name="ConfirmPassword"
              value={credentials.ConfirmPassword}
              onChange={onChange}
              id="exampleInputPassword1"
              placeholder="Confirm password "
              style={{ color: "#2e2e35" }}
            />
            <button
              className="toggle-password-visibility-b"
              onClick={toggleConfirmPasswordVisibility}
              type="button"
            >
              <FontAwesomeIcon icon={showConfirmPassword ? faEyeSlash : faEye} />
            </button>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-success w-100 mt-3">
              Signup
            </button>
          </div>
          <div className="text-center mt-4">
            <span>or continue with</span>
            <div className="my-3 d-flex justify-content-center">
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  onGoogleLoginSuccess(credentialResponse);
                }}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            </div>
          </div>
        </form>
      </div>

      <div>
        <Footr />
      </div>
      
    </div>
  );
}
