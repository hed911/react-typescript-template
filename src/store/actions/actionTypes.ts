// BEGIN COUNTER TYPES
export const INCREMENT: string = "INCREMENT";
export const DECREMENT: string = "DECREMENT";
export const ADD: string = "ADD";
export const SUBTRACT: string = "SUBTRACT";

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

export interface AddAction {
  type: typeof ADD;
  val: number;
}

export interface SubstractAction {
  type: typeof SUBTRACT;
  val: number;
}

export interface RootState {
  ctr: CounterState;
}

export interface CounterState {
  counter: number;
}

export type CounterActionTypes =
  | IncrementAction
  | DecrementAction
  | AddAction
  | SubstractAction;

// END COUNTER TYPES

// BEGIN OTHER TYPES
// ...
// END OTHER TYPES
