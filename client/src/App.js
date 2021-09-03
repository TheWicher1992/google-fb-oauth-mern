import "./App.css";
import React from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { GOOGLE_CLIENT_ID, FACEBOOK_CLIENT_ID } from "./env.json";
import axios from "axios";

function App() {
  const loginWithGoogle = async (googleData) => {
    console.log(googleData);

    await axios.post("http://localhost:5000/api/auth/google", googleData, {
      headers: { "Content-Type": "application/json" },
    });
  };

  const loginWithFacebook = async (facebookData) => {
    await axios.post("http://localhost:5000/api/auth/facebook", facebookData, {
      headers: { "Content-Type": "application/json" },
    });
  };
  return (
    <div>
      <div
        className="container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: 200,
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <GoogleLogin
          clientId={GOOGLE_CLIENT_ID}
          buttonText="Login"
          onSuccess={loginWithGoogle}
          onFailure={loginWithGoogle}
          cookiePolicy={"single_host_origin"}
        />

        <FacebookLogin
          buttonStyle={{
            width: "100%",
            marginTop: "50px",
          }}
          appId={FACEBOOK_CLIENT_ID}
          // autoLoad={true}
          callback={loginWithFacebook}
        />
      </div>
    </div>
  );
}

export default App;
