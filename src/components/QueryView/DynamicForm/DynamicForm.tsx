import React from "react";

export type SelectItem = {
  key: string;
  value: string;
};

export type InputDescriptor = {
  name: string;
  type: string;
  value?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  upCase?: boolean;
  isDate?: boolean;
  classes?: Array<string>;
  items?: Array<SelectItem>;
  selectedItemKey?: string;
};

type Props = {
  elements: Array<InputDescriptor>;
  actionTriggered(action: string): any;
  valueChanged(name: string, value: string): any;
};

const DynamicForm: React.FC<Props> = ({
  elements,
  actionTriggered,
  valueChanged,
}) => {
  const items = elements.map((element) => (
    <FilterField
      descriptor={element}
      actionTriggered={actionTriggered}
      valueChanged={valueChanged}
    />
  ));
  return (
    <div
      className="modal"
      role="dialog"
      aria-labelledby="add-edit-Label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title text-center" id="add-table-Label">
              Respuesta de glosa
            </h4>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label for="taltal">Campo x</label>
                <input type="text"></input>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="text-center">
                    <input
                      type="submit"
                      value="Guardar cambios"
                      className="btn btn-success"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicForm;
