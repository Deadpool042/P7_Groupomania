import axios from "axios";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const GET_USER_ERRORS = "GET_USER_ERRORS";
export const DELETE_USER = "DELETE_USER";

export const getUser = (uid) => {
  //dispatch est le contenu qui est evnoyé au reducer
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    return axios
      .post(`${process.env.REACT_APP_API_URL}api/user/upload`, data)
      .then((res) => {
        if (res.data.errors) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.errors });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          return axios
            .get(`${process.env.REACT_APP_API_URL}api/user/${id}`)
            .then((res) => {
              dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const deleteUser = (UserId) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/user/${UserId}`,
    })
      .then(() => {
        dispatch({ type: DELETE_USER, payload: { UserId } });
      })
      .catch((err) => console.log(err));
  };
};
