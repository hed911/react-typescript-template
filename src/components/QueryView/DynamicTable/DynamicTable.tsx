import React from "react";

import DynamicTableRow from "./DynamicTableRow/DynamicTableRow";

export type RowDescriptor = {
  id: number;
  contents: Array<string>;
  actions: Array<string>;
};

export type RowAction = {
  [key: string]: RowActionInnerItem;
};

export type RowActionInnerItem = {
  theClass: string;
  label: string;
};

type Props = {
  headers: Array<string>;
  data: Array<RowDescriptor>;
  actions: RowAction;
  actionTriggered(id: number, action: string): any;
};

const DynamicTable: React.FC<Props> = ({
  headers,
  data,
  actions,
  actionTriggered,
}) => {
  const headersItems = headers.map((header) => (
    <th data-sort="string">{header}</th>
  ));
  let actionsHeader = null;
  if (Object.keys(actions).length > 0) {
    actionsHeader = <th data-sort="int">Acciones</th>;
  }
  const rows = data.map((item) => {
    return (
      <DynamicTableRow
        data={item}
        actions={actions}
        actionTriggered={(id, action) => actionTriggered(id, action)}
      />
    );
  });
  return (
    <table className="table table-hover tablesorter">
      <thead>
        <tr>
          {headersItems}
          {actionsHeader}
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default DynamicTable;
