import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getPosts } from "../../actions/post.actions";
import { dateParser, isEmpty } from "../Utils";
import EditDeleteComment from "./EditDeleteComment";

const CardComments = (post) => {
  //Récupère les données des utilisateurs depuis le store
  const usersData = useSelector((state) => state.usersReducer);
  const userData = useSelector((state) => state.userReducer);

  //Pour dispatcher les données issues du store
  const dispatch = useDispatch();

  //Pour stocker les commentaires (uniquement le texte)
  const [text, setText] = useState("");

  //Fonction pour faire "partir tous les commentaires"
  const handleComment = (e) => {
    const PostId = post.post.id; //Stocke l'id du post
    console.log(PostId);
    e.preventDefault();

    if (text) {
      dispatch(
        addComment(
          text,
          userData.id,
          userData.lastName,
          userData.firstName,
          PostId
        )
      )
        .then(() => {
          dispatch(getPosts());
        })
        .then(() => setText(""));
    }
  };
  // console.log(post.post.id);
  return (
    <div className="comments-container">
      {post.post.Comments.map((comment) => {
        return (
          <div
            className={
              comment.UserId === userData.id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment.id}
          >
            <div className="left-part">
              <img
                src={
                  !isEmpty(usersData[0]) &&
                  usersData
                    .map((user) => {
                      if (user.id === comment.UserId) return user.picture;
                      else return null;
                    })
                    .join("")
                }
                alt="commenter-pic"
              />
            </div>
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>{comment.firstName + " " + comment.lastName}</h3>
                </div>
                <span>{dateParser(comment.createdAt)}</span>
              </div>
              <p>{comment.commentBody}</p>
              <EditDeleteComment comment={comment} postId={post.post.id} />
            </div>
          </div>
        );
      })}
      {userData.id && (
        <form action="" onSubmit={handleComment} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer" />
        </form>
      )}
    </div>
  );
};

export default CardComments;
