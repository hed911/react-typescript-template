// Convert this to an ES6 arrow function component
// Experiment with useSelectore & useDispatch
// Or maybe wait until we find this in the tutorial ...

import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";

import * as actionCreators from "../../store/actions/counterActions";
import { IRootReducer } from "../../store/reducers/root";
import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

type Props = {};

const Counter: React.FC<Props> = ({}) => {
  const internalCounter = useSelector(
    (state: IRootReducer) => state.ctr.counter
  );
  const dispatch = useDispatch();

  const incrementCounter = () => {
    dispatch(actionCreators.increment());
  };

  const decrementCounter = () => {
    dispatch(actionCreators.decrement());
  };

  const addCounter = () => {
    dispatch(actionCreators.add(10));
  };

  const subtractCounter = () => {
    dispatch(actionCreators.subtract(15));
  };

  return (
    <div>
      <CounterOutput value={internalCounter} />
      <CounterControl label="Increment" clicked={incrementCounter} />
      <CounterControl label="Decrement" clicked={decrementCounter} />
      <CounterControl label="Add 10" clicked={addCounter} />
      <CounterControl label="Subtract 15" clicked={subtractCounter} />
      <hr />
      <p>val:{internalCounter}</p>
    </div>
  );
};

export default Counter;
