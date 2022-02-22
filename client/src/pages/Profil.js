import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  // signIn={false} signUp={true} fait référence à la page index pour afficher  le modal
  //Signup par défaut quand on appelle la page depuis le profil (une fois connecté)
  //Sinon si pas connecté, on mets par defaut le modal Signip ( s'inscrire)
  const uid = useContext(UidContext);
  //Permet de recuperer l'identifiant de connexion. Si oui , affiche update page
  //Si non l'autre page de signin ou signup
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="../img/icon.png" alt="icon" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
