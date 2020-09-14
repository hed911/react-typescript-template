import React from "react";

import "./CounterControl.css";

type Props = {
  label: string;
  clicked: React.MouseEventHandler;
};
// OK
const counterControl = ({ label, clicked }: Props) => (
  <div className="CounterControl" onClick={(e) => clicked(e)}>
    {label}
  </div>
);

export default counterControl;
