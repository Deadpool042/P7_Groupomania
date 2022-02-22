import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteComment,
  editComment,
  getPosts,
} from "../../actions/post.actions";
import { UidContext } from "../AppContext";
const EditDeleteComment = (comment, postId) => {
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [text, setText] = useState("");
  const uid = useContext(UidContext);
  const dispatch = useDispatch();
  const PostId = comment.comment.PostId;
  const comments = comment.comment;

  const handleEdit = (e) => {
    e.preventDefault();

    if (text) {
      dispatch(editComment(PostId, comments.id, text, comments.UserId)).then(
        () => {
          dispatch(getPosts()); //recharge les posts une fois la modification effectuée
          //pour avoir l'affichage dynamique
        }
      );
      setText("");
      setEdit(false);
    }
  };

  const handleDelete = () =>
    dispatch(deleteComment(PostId, comments.id)).then(() => {
      dispatch(getPosts()); //recharge les posts une fois la modification effectuée
      //pour avoir l'affichage dynamique
    });

  useEffect(() => {
    const checkAuthor = () => {
      if (uid === comments.UserId) {
        setIsAuthor(true);
      }
    };
    checkAuthor();
  }, [uid, comments.UserId]);

  return (
    <div className="edit-comment">
      {isAuthor && edit === false && (
        <span onClick={() => setEdit(!edit)}>
          <img src="./img/icons/edit.svg" alt="edit-comment" />
        </span>
      )}
      {isAuthor && edit && (
        <form action="" onSubmit={handleEdit} className="edit-comment-form">
          <label htmlFor="text" onClick={() => setEdit(!edit)}>
            Editer
          </label>
          <br />
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            defaultValue={comments.commentBody}
          />
          <br />
          <div className="btn">
            <span
              onClick={() => {
                if (window.confirm("Voulez-vous supprimer ce commentaire?")) {
                  handleDelete();
                }
              }}
            >
              <img src="./img/icons/trash.svg" alt="" />
            </span>
            <input type="submit" value="Valider modification" />
          </div>
        </form>
      )}
    </div>
  );
};

export default EditDeleteComment;
