import React from "react";

import FilterField from "./FilterField/FilterField";

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
};

const TableFilters: React.FC<Props> = ({ elements }) => {
  const items = elements.map((element) => <FilterField descriptor={element} />);
  return (
    <form>
      <div className="">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3 className="panel-title">Filtros</h3>
          </div>
          <div className="panel-body">{items}</div>
        </div>
      </div>
    </form>
  );
};

export default TableFilters;
