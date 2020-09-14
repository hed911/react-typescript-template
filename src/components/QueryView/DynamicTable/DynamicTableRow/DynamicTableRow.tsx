import React from "react";

import { RowDescriptor, RowAction } from "../DynamicTable";
import { DropdownButton, Dropdown, ButtonGroup } from "react-bootstrap";

type Props = {
  data: RowDescriptor;
  actions: RowAction;
  actionTriggered(id: number, action: string): any;
};

const DynamicTableRow = ({ data, actions, actionTriggered }: Props) => {
  const labelItems = data.contents.map((content) => <td>{content}</td>);
  const actionItems = data.actions.map((action) => {
    return (
      <Dropdown.Item
        eventKey="{action}"
        onClick={(e) => actionTriggered(data.id, action)}
      >
        {actions[action].label}
      </Dropdown.Item>
    );
  });

  let dropdown = (
    <DropdownButton
      as={ButtonGroup}
      key="primary"
      variant="primary"
      title="Opciones"
    >
      {actionItems}
    </DropdownButton>
  );

  return (
    <tr>
      {labelItems}
      {dropdown}
    </tr>
  );
};

export default DynamicTableRow;
