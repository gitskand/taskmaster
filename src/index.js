import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";



ReactDOM.render(
  <Auth0Provider
  domain="dev-202pm8o5ynf5zi3g.us.auth0.com"
  clientId="1ZzatEGRfDTTQfaJ7memNhVCqYDhcmQh"
    authorizationParams={{
      redirect_uri:  window.location.origin
    }}
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);