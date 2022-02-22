import { GET_POSTS_ERRORS } from "../actions/post.actions";
import { GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { postErrors: [], userErrors: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS_ERRORS:
      return {
        postErrors: action.payload,
        userErrors: [],
      };

    case GET_USER_ERRORS:
      return {
        postErrors: [],
        userErrors: action.payload,
      };
    default:
      return state;
  }
}
