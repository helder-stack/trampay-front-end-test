import { combineReducers } from "redux";
import {
    FileReducer,
    AuthReducer
} from "./Reducers";

export default combineReducers({
    file: FileReducer,
    auth: AuthReducer
  })