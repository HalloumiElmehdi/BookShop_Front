import React from "react";

const ListGroup = ({
  items,
  onItemSelect,
  selectedItem,
  textProperty,
  valueProperty,
}) => {
  return (
    <ul className="list-group mt-2">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            selectedItem === item
              ? "list-group-item active cursor_pointer"
              : "list-group-item cursor_pointer"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
