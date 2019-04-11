import { Action, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import RootReducer from "../Reducers/RootReducer";
import { IStateStore } from "./IStateStore";

export default function configureStore() {
  return createStore<IStateStore, Action, {}, {}>(RootReducer, applyMiddleware(thunk));
}
