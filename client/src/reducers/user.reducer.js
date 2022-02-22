//Etat initial du store de redux

import { GET_USER, UPLOAD_PICTURE } from "../actions/user.actions";

const initalState = {};

export default function userReducer(state = initalState, action) {
  switch (action.type) {
    case GET_USER:
      return action.payload;
    case UPLOAD_PICTURE:
      return {
        ...state,
        picture: action.payload,
      };

    default:
      return state;
  }
}
