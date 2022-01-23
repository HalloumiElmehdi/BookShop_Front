import React from "react";

const SearchBox = ({ value, title, onChange }) => {
  return (
    <input
      type="text"
      className="form-control"
      value={value}
      placeholder={title}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default SearchBox;
