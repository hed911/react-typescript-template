import { combineReducers } from "redux";

import counterReducer from "./counter";
import * as actionTypes from "../actions/actionTypes";

const rootReducer = combineReducers({
  ctr: counterReducer,
});

export interface IRootReducer {
  ctr: actionTypes.CounterState;
}

export default rootReducer;
