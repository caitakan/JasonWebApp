import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { IStateStore } from "../Store/IStateStore";

const RootReducer = combineReducers<IStateStore>({
  form: formReducer
});

export default RootReducer;
