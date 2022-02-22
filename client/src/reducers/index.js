import { combineReducers } from "redux"; //Pour recuperer tous les states de tous les components puis les regroupent et sont exportés
import postReducer from "./post.reducer"; //Contient tout le store concernant les posts
import userReducer from "./user.reducer"; //Contient tout le store concernant les users
import usersReducer from "./users.reducer"; //Contient tout le store concernant les users
import errorReducer from "./error.reducer"; //Contient tout le store concernant les users

export default combineReducers({
  userReducer,
  postReducer,
  usersReducer,
  errorReducer,
});
