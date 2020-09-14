import * as actionTypes from "./actionTypes";

export const increment = (): actionTypes.CounterActionTypes => {
  return {
    type: actionTypes.INCREMENT,
  };
};

export const decrement = (): actionTypes.CounterActionTypes => {
  return {
    type: actionTypes.DECREMENT,
  };
};

export const add = (value: number): actionTypes.CounterActionTypes => {
  return {
    type: actionTypes.ADD,
    val: value,
  };
};

export const subtract = (value: number): actionTypes.CounterActionTypes => {
  return {
    type: actionTypes.SUBTRACT,
    val: value,
  };
};
