import React from "react";

import useHttp from "../../../hooks/http";
import FormField from "./FormField/FormField";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

export type SelectItem = {
  key: string;
  value: string;
};

export type InputDescriptor = {
  displayName: string;
  name: string;
  type: "text" | "select" | "number" | "textarea" | "date";
  value?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  upCase?: boolean;
  isDate?: boolean;
  classes?: Array<string>;
  items?: Array<SelectItem>;
  selectedItemKey?: string;
  required: boolean;
};

interface UrlItem {
  key: string;
  value: string;
}

type Props = {
  elements: Array<InputDescriptor>;
  title: string;
  submitText: string;
  show: boolean;
  size: "sm" | "lg" | "xl" | undefined;
  submitEnabled: boolean;
  submitted(data: any): any;
  handleClose(): any;
  valueChanged(name: string, value: string): any;
};

const DynamicForm: React.FC<Props> = ({
  elements,
  title,
  submitText,
  show,
  size,
  submitEnabled,
  submitted,
  handleClose,
  valueChanged,
}) => {
  const parsedParams = (): Array<UrlItem> => {
    const result: Array<UrlItem> = [];
    elements.forEach(function (item: InputDescriptor) {
      if (item.type == "text" || item.type == "date" || item.type == "number") {
        result.push({ key: item.name, value: item.value! });
      } else {
        if (item.type == "select") {
          result.push({ key: item.name, value: item.selectedItemKey! });
        }
      }
    });
    return result;
  };

  const submitHandler = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    submitted(parsedParams());
  };

  const items = elements.map((element) => (
    <div key={element.name} className="col-sm-6">
      <label>{element.displayName}</label>
      <FormField
        descriptor={element}
        valueChanged={(name: string, value: string) =>
          valueChanged(name, value)
        }
      />
    </div>
  ));

  return (
    <Modal
      cssModule={{ "modal-title": "w-100 text-center" }}
      size={size}
      show={show}
      onHide={() => handleClose()}
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={(e: React.MouseEvent<HTMLFormElement>) => submitHandler(e)}
        >
          <div className="form-group row">{items}</div>
          <div className="row">
            <div className="col-md-12">
              <div className="text-center">
                <input
                  type="submit"
                  value={submitText}
                  disabled={submitEnabled}
                  className="btn btn-success btn-lg"
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DynamicForm;
