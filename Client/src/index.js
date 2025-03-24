import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GlobalStateProvider } from "./ContextAPI/GlobalStateContext";
const ClientID = "663066859481-qavvosnu9ugdeqgp235vons10t3u4mlf.apps.googleusercontent.com"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={ClientID}>
    <React.StrictMode>
      <GlobalStateProvider>
        <App />
      </GlobalStateProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
