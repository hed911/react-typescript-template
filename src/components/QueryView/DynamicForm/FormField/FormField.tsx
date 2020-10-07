import React, { MouseEvent } from "react";

import styles from "./FormField.module.css";
import { InputDescriptor } from "../DynamicForm";

type Props = {
  descriptor: InputDescriptor;
  valueChanged(name: string, value: string): any;
};

const FormField: React.FC<Props> = ({ descriptor, valueChanged }) => {
  let classes = ["form-control"];
  if (descriptor.upCase === true) {
    classes.push(styles.upcase);
  }
  if (descriptor.classes) {
    classes = classes.concat(descriptor.classes);
  }
  let input = (
    <input
      name={descriptor.name}
      type={descriptor.type}
      value={descriptor.value}
      min={descriptor.min}
      max={descriptor.max}
      placeholder={descriptor.placeholder}
      className={classes.join(" ")}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        valueChanged(e.target.name, e.target.value)
      }
      required={descriptor.required}
    />
  );
  if (descriptor.type === "textarea") {
    input = (
      <textarea
        name={descriptor.name}
        placeholder={descriptor.placeholder}
        rows={4}
        cols={30}
        className={classes.join(" ")}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          valueChanged(e.target.name, e.target.value)
        }
      >
        {descriptor.value}
      </textarea>
    );
  }
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
      <select
        className="form-control"
        name={descriptor.name}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          valueChanged(e.target.name, e.target.value)
        }
      >
        <option selected={descriptor.selectedItemKey === ""}>
          {descriptor.placeholder}
        </option>
        {options}
      </select>
    );
  }

  return input;
};

export default FormField;
