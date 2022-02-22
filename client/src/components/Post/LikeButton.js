import React, { useState, useEffect, useContext } from "react";
import { UidContext } from "../AppContext";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useDispatch } from "react-redux";
import { getPosts, likePost, unlikePost } from "../../actions/post.actions";

const LikeButton = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const like = () => {
    dispatch(likePost(post.id, uid)).then(() => dispatch(getPosts()));
    setLiked(true);
  };
  // console.log(post.Likes.filter((id) => id.UserId !== post.id));
  const unlike = () => {
    dispatch(unlikePost(post.id, uid)).then(() => dispatch(getPosts()));
    setLiked(false);
  };

  //Pour aller chercher l'userId dans le tableau des Likes afin de le comparer a l'uid
  const likers = post.Likes.map((userId) => {
    return userId.UserId;
  });

  const postLiked = post.Likes;
  // console.log(postLiked.filter((id) => id.UserId === uid));

  useEffect(() => {
    if (likers.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, postLiked, liked, likers]); //Relance use effet quand il a l'uid, le post.Likes, et si liked change d'etat

  return (
    <div className="like-container">
      {uid === null && (
        <Popup
          trigger={<img src="./img/icons/heart.svg" alt="like" />}
          position={["bottom center", "bottom right", "bottom left"]}
          closeOnDocumentClick
        >
          <div>Connectez-vous pour aimer un post !</div>
        </Popup>
      )}
      {uid && liked === false && (
        <img src="./img/icons/heart.svg" onClick={like} alt="like" />
      )}
      {uid && liked && (
        <img src="./img/icons/heart-filled.svg" onClick={unlike} alt="unlike" />
      )}
      <span>{post.Likes.length}</span>
    </div>
  );
};

export default LikeButton;
