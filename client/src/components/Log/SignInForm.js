//Se Connecter
import React, { useState } from "react";

import axios from "axios";
// axios.defaults.baseURL = `process.env.REACT_APP_API_URL`;
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.defaults.withCredentials = true;

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}api/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.error === "Email inconnu") {
          emailError.innerHTML = res.data.error;
        } else if (res.data.error === "Mot de passe incorrect") {
          emailError.innerHTML = "";
          passwordError.innerHTML = res.data.error;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

export default SignInForm;
