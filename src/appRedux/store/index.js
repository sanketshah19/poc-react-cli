import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "react-router-redux";
import thunk from "redux-thunk";

import history from "./history";
import reducers from "../reducers/rootReducer";

const routeMiddleware = routerMiddleware(history);

const middlewares = [thunk, routeMiddleware];
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const composeEnhancers = compose;

export default function configureStore(initialState) {
  const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers/rootReducer", () => {
      const nextRootReducer = require("../reducers/rootReducer");
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
}
