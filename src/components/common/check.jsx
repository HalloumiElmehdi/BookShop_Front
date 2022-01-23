import React from "react";

export default function Check({ label, id, name, checked, ...rest }) {
  return (
    <div className="checkout__input__checkbox">
      <input
        type="checkbox"
        id={id}
        name={name}
        value={label}
        checked={checked}
        {...rest}
      />
      <label className="form-check-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
