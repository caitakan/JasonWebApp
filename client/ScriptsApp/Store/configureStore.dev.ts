import { Action, applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";
import RootReducer from "../Reducers/RootReducer";
import { IStateStore } from "./IStateStore";

export default function configureStore() {
  return createStore<IStateStore, Action, {}, {}>(
    RootReducer,
    composeWithDevTools(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
