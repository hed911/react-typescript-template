import React from "react";

import "./CounterOutput.css";

type Props = {
  value: number;
};

const counterOutput = ({ value }: Props) => (
  <div className="CounterOutput">Current Counter: {value}</div>
);

export default counterOutput;
