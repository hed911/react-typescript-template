import React from "react";

import styles from "./FilterField.module.css";
import { InputDescriptor } from "../TableFilters";

type Props = {
  descriptor: InputDescriptor;
};

const FilterField: React.FC<Props> = ({ descriptor }) => {
  let classes = ["form-control"];
  if (descriptor.upCase === true) {
    classes.push(styles.upcase);
  }
  if (descriptor.classes) {
    classes = classes.concat(descriptor.classes);
  }
  let clicked = () => {};
  let input = (
    <input
      name={descriptor.name}
      type={descriptor.type}
      value={descriptor.value}
      min={descriptor.min}
      max={descriptor.max}
      placeholder={descriptor.placeholder}
      className={classes.join(" ")}
      onClick={clicked}
    />
  );
  if (descriptor.type === "select") {
    let options = null;
    if (descriptor.items) {
      options = descriptor.items.map((item) => (
        <option
          selected={descriptor.selectedItemKey === item.key}
          value={item.key}
        >
          {item.value}
        </option>
      ));
    }
    input = (
      <select className="form-control" name={descriptor.name}>
        <option selected={descriptor.selectedItemKey === ""}>
          {descriptor.placeholder}
        </option>
        {options}
      </select>
    );
  }

  return <div className={styles.option}>{input}</div>;
};

export default FilterField;
