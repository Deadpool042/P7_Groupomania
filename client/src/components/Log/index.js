import React, { useState } from "react";
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

const Log = (props) => {
  //Props permets de faire reference a la page index de log depuis les autres pages liées
  const [signUpModal, setSignUpModal] = useState(props.signup);
  const [signInModal, setSignInModal] = useState(props.signin);

  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignInModal(true);
      setSignUpModal(false);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            id="register"
            className={signUpModal ? "active-btn" : null}
            onClick={handleModals}
          >
            S'inscrire
          </li>
          <li
            id="login"
            className={signInModal ? "active-btn" : null}
            onClick={handleModals}
          >
            Se Connecter
          </li>
        </ul>

        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

export default Log;
