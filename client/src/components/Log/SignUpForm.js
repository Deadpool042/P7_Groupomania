//Inscription

import React, { useState } from "react";
import SignInForm from "./SignInForm";
import axios from "axios";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [controlPassword, setControlPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );

    emailError.innerHTML = "";
    firstNameError.innerHTML = "";
    lastNameError.innerHTML = "";
    passwordError.innerHTML = "";
    passwordConfirmError.innerHTML = "";

    // Comparaison des mots de passe
    if (password !== controlPassword) {
      passwordConfirmError.innerHTML = "Les mots de passe ne correspondent pas";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          lastName,
          firstName,
          email,
          password,
        },
      }).then((res) => {
        if (res.data) {
          emailError.innerHTML = res.data.email;
          firstNameError.innerHTML = res.data.firstName;
          lastNameError.innerHTML = res.data.lastName;
          passwordError.innerHTML = res.data.password;
        }
        if (res.status === 201) {
          setFormSubmit(true);
        }
      });
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="firstName">Prénom</label>
          <br />
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <div className="firstName error"></div>
          <br />
          <label htmlFor="lastName">Nom</label>
          <br />
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
          <div className="lastName error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="email"
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
          <label htmlFor="password-conf">Confirmer le mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password-conf"
            onChange={(e) => setControlPassword(e.target.value)}
            value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;
