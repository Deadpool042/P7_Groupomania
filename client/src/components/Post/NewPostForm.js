import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { addPost, getPosts } from "../../actions/post.actions";
import { isEmpty, timestampParser } from "../Utils";

const NewPostForm = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [postPicture, setPostPicture] = useState(null); //Pour l'affichage sur le front
  const [video, setVideo] = useState("");

  const [file, setFile] = useState(""); //Pour la bdd
  const userData = useSelector((state) => state.userReducer);
  const error = useSelector((state) => state.errorReducer.postErrors);
  const dispatch = useDispatch();

  const handlePost = async (e) => {
    if (message || postPicture || video) {
      const data = new FormData();
      data.append("UserId", userData.id); //Vient de req.bodyd
      data.append("postText", message); //vient de req.body
      if (file) data.append("file", file); //vient de req.file
      data.append("video", video); //vient de req.file
      data.append("firstName", userData.firstName); //vient de req.body
      data.append("lastName", userData.lastName); //vient de req.body

      // console.log(data);
      // console.log(message);
      dispatch(addPost(data)); // Dispatch vers la bdd

      dispatch(getPosts()); //Recupere depuis la bdd pour l'affichage dynamique
      cancelPost(); //Une fois le traitement fait, remets tous les champs à zéro
    } else {
      alert("Veuillez entrer un message");
    }
  };

  const handlePicture = (e) => {
    setPostPicture(URL.createObjectURL(e.target.files[0]));
    //Permet de passer l'url sans le state setPostPicture
    setFile(e.target.files[0]);
    setVideo("");
  };
  const cancelPost = () => {
    setMessage("");
    setPostPicture("");
    setVideo("");
    setFile("");
  };

  useEffect(() => {
    if (!isEmpty(userData)) setIsLoading(false);
    //Traitement de l'import d'une video lors de la création d'un post
    const handleVideo = () => {
      //Split les mots dans le lien dans lors de la saisie du post
      let findLink = message.split(" ");
      //parcours le tableau crée
      for (let i = 0; i < findLink.length; i++) {
        //verifie les valeurs puis les remplacent afin de convertir le lien
        //pour qu'il soit reconnu
        if (
          findLink[i].includes("https://www.yout") ||
          findLink[i].includes("https://yout")
        ) {
          let embed = findLink[i].replace("watch?v=", "embed/");
          //une fois le paramètre du lien changé, l'ajoute dans le state setVideo
          setVideo(embed.split("&")[0]);
          //permet d'indexer le state setMessage vide
          findLink.splice(i, 1);
          setMessage(findLink.join(" "));
          //Si une photo avait été postée avant, vide le state setPostPicture
          //Car il ne peut pas y avoir une video et une photo sur un post
          setPostPicture("");
        }
      }
    };

    handleVideo();
  }, [userData, message, video]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <div className="data"></div>
          <NavLink exact="true" to="/profil">
            <div className="user-info">
              <img src={userData.picture} alt="user-img" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="message"
              id="message"
              placeholder="Quoi de neuf ?"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            {message || postPicture || video.length > 20 ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={userData.picture} alt="user-pic" />
                </div>
                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{userData.firstName + " " + userData.lastName} </h3>
                    </div>
                    <span>{timestampParser(Date.now())}</span>
                  </div>
                  <div className="content">
                    <p>{message}</p>
                    <img src={postPicture} alt="" />
                    {video && (
                      <iframe
                        src={video}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={video}
                      ></iframe>
                    )}
                  </div>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(video) && (
                  <>
                    <img src="./img/icons/picture.svg" alt="img" />
                    <input
                      type="file"
                      name="file"
                      id="file-upload"
                      accept=".jpg, .png, .jpeg"
                      onChange={(e) => handlePicture(e)}
                    />
                  </>
                )}
                {video && (
                  <button onClick={() => setVideo("")}>Supprimer video</button>
                )}
              </div>
              {!isEmpty(error.format) && <p>{error.format}</p>}
              {!isEmpty(error.maxSize) && <p>{error.maxSize}</p>}
              <div className="btn-send">
                {message || postPicture || video.length > 20 ? (
                  <button className="cancel" onClick={cancelPost}>
                    Annuler le message
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyer
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewPostForm;
