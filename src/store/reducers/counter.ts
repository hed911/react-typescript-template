import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState: actionTypes.CounterState = {
  counter: 0,
};

const reducer = (
  state: actionTypes.CounterState = initialState,
  action: actionTypes.CounterActionTypes
): actionTypes.CounterState => {
  switch (action.type) {
    case actionTypes.INCREMENT:
      return updateObject(state, { counter: state.counter + 1 });
    case actionTypes.DECREMENT:
      return updateObject(state, { counter: state.counter - 1 });
    case actionTypes.ADD:
      return updateObject(state, {
        counter: state.counter + (action as actionTypes.AddAction).val,
      });
    case actionTypes.SUBTRACT:
      return updateObject(state, {
        counter: state.counter - (action as actionTypes.SubstractAction).val,
      });
  }
  return state;
};

export default reducer;
