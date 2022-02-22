import axios from "axios";

//posts
export const GET_POSTS = "GET_POSTS";
export const ADD_POST = "ADD_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";

//Comments
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

//Errors
export const GET_POSTS_ERRORS = "GET_POSTS_ERRORS";

export const getPosts = (num) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      .then((res) => {
        const array = res.data.slice(0, num);
        dispatch({ type: GET_POSTS, payload: array });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const addPost = (data) => {
  // for (var value of data.values()) {
  //   console.log(value);
  // }
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      data: data,
    }).then((res) => {
      if (res.data.errors) {
        return dispatch({ type: GET_POSTS_ERRORS, payload: res.data.errors });
      } else {
        dispatch({ type: GET_POSTS_ERRORS, payload: "" });
      }
    });
  };
};

export const likePost = (PostId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/like-post/` + PostId,
      data: { UserId: userId },
    })
      .then((res) => {
        dispatch({ type: LIKE_POST, payload: { ...res.data } });
      })
      .catch((err) => console.log(err));
  };
};

export const unlikePost = (PostId, userId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/unlike-post/` + PostId,
      data: { UserId: userId },
    })
      .then((res) => {
        dispatch({ type: UNLIKE_POST, payload: { PostId, userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (PostId, postText) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${PostId}`,
      data: { postText: postText },
    })
      .then(() => {
        dispatch({ type: UPDATE_POST, payload: { postText, PostId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (PostId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${PostId}`,
    })
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { PostId } });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (
  commentBody,
  UserId,
  lastName,
  firstName,
  PostId
) => {
  return (dispatch) => {
    console.log(PostId);
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/comment-post/${PostId}`,
      data: { commentBody, UserId, firstName, lastName },
    })
      .then(() => {
        dispatch({ type: ADD_COMMENT, payload: { PostId } });
      })
      .catch((err) => console.log(err));
  };
};
//les 3 arguments passent bien correctement a voir le reducer
export const editComment = (PostId, commentId, commentBody, UserId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/${PostId}/edit-comment-post/${commentId}`,
      data: { PostId, commentBody, commentId, UserId },
    })
      .then(() => {
        dispatch({
          type: EDIT_COMMENT,
          payload: { PostId, commentId, commentBody, UserId },
        });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (PostId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/post/${PostId}/delete-comment-post/${commentId}`,
      data: { commentId, PostId },
    })
      .then(() => {
        dispatch({
          type: DELETE_COMMENT,
          payload: { PostId, commentId },
        });
      })
      .catch((err) => console.log(err));
  };
};
