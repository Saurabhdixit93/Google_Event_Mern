import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { Store } from "./redux/Store";
const root = ReactDOM.createRoot(document.getElementById("root"));

const googleClientId =
  "291370688634-t4hdji0ct4grbpvk0cso28qpq3usbe87.apps.googleusercontent.com" ||
  process.env.REACT_APP_GOOGLE_CLIENT_ID;

root.render(
  <Provider store={Store}>
    <GoogleOAuthProvider clientId={googleClientId}>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
);
