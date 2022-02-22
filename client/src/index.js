import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/index.scss";

//Mise en place des fonctionnalités de redux afin de pouvoir stoker toutes les
//interactions(variables, input etc) et de pouvoir les utiliser sur tous les autres components
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { getUsers } from "./actions/users.actions";

//Outils de developpeur
import { composeWithDevTools } from "redux-devtools-extension";
// import logger from "redux-logger";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
