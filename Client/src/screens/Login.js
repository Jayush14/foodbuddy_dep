import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footr from "../components/Footer";
import { GoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./Signup.css";
import Cookies from "js-cookie";
export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();


  const fetchProtectedData = async () => {
    const response = await fetch("http://localhost:5000/api/getUserDetails", {
      method: "GET",
      credentials: "include",  // Ensure the session cookie is sent with the request
    });
    console.log("response",response)
    const data = await response.json();
    console.log(data);
  };
  const handleSubmit = async (abc) => {
    abc.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }
    if (json.success) {
      const myCookieValue = Cookies.get('connect.sid');
      console.log("Cookies bnsavgsj: ",myCookieValue);
      fetchProtectedData();
      // localStorage.setItem("userEmail", json.user.email);
      // localStorage.setItem("authToken", json.authToken);
      // console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  const [showPassword, setShowPassword] = useState(false);
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
        console.log("DATA:",data);
        const myCookieValue = Cookies.get('myCookieName');
        console.log("Cookies: ",myCookieValue);
       // console.log("data:",data);
        // if (data.success) {
        //   localStorage.setItem("userEmail", data.user.email);
        //   localStorage.setItem("authToken", data.authToken);
        //   console.log(localStorage.getItem("authToken"));
        //   navigate("/");
        // }
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
          className="w-50 m-auto mt-5 border-success rounded"
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "#f3ebe3",
            padding: "20px",
            borderRadius: "10px",
            border: "2px solid #f2b315",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <h2 className="text-center mb-4" style={{ color: "#2e2e35" }}>
            Sign In
          </h2>
          <div className="mb-3">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Email address
            </label>
            <input
              type="email"
              className="form-control bg-transparent border border-success"
              style={{ color: "#2e2e35" }}
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div className="password-input-container mb-3">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label"
              style={{ color: "#2e2e35" }}
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control bg-transparent border border-success"
              name="password"
              value={credentials.password}
              style={{ color: "#2e2e35" }}
              onChange={onChange}
              id="exampleInputPassword1"
              placeholder="Enter Password"
            />
            <button
              className="toggle-password-visibility"
              onClick={togglePasswordVisibility}
              type="button"
            >
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </button>
          </div>

          {/* Submit button takes full width */}
          <button
            type="submit"
            className="btn btn-success w-100"
            style={{ border: "none", color: "#2e2e35" }}
          >
            Submit
          </button>

          {/* <div className="text-center mt-4">
            <span style={{ color: "#2e2e35" }}>or continue with</span>
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
          </div> */}
          
        </form>
      </div>

      <div>
      <Footr />
      </div>
     
    </div>
  );
}
