import React from "react";
const ComboBox = ({
  name,
  label,
  error,
  options,
  isIdle = null,
  optionId,
  optionName,
  firstOption,
  selected,
  ...rest
}) => {
  let classes = "checkout__combo_input form-control ";
  if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
  return (
    <div className="form-group ">
      <select
        className={classes}
        name={name}
        id={name}
        {...rest}
        style={{ appearance: "none" }}
      >
        <option key="-1" value="-1">
          {firstOption}
        </option>

        {options.map((option) => (
          <option
            key={option[optionId]}
            value={option[optionId]}
            checked={option[optionId] === selected}
          >
            {option[optionName]}
          </option>
        ))}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
      {<div className="valid-feedback"></div>}
    </div>
  );
};
ComboBox.defaultProps = { optionId: "_id", optionName: "title" };
export default ComboBox;
