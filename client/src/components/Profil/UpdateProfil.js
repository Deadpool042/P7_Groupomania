import React from "react";
import LeftNav from "../LeftNav";
import { useSelector } from "react-redux";
import UploadImg from "./UploadImg";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const userData = useSelector((state) => state.userReducer); //Recuperer les données issues de userReducer (depuis le store)
  const fullName = userData.firstName + " " + userData.lastName;
  const error = useSelector((state) => state.errorReducer.userErrors);

  return (
    <div className="profil-container">
      <LeftNav />
      <h1>Profil de {fullName}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          <img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
          <p>{error.format}</p>
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Profil</h3>

            <p>{userData.firstName}</p>

            <br />

            <p>{userData.lastName}</p>
            <br />

            <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
