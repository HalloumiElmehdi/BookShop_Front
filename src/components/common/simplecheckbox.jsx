import React from "react";

export default function simplecheckbox({
  label,
  name,
  checked,
  value,
  onChange,
  ...Rest
}) {
  return (
    <div className="checkout__input__checkbox">
      <label htmlFor="check">
        {label}
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          value={value}
          onChange={onChange}
          {...Rest}
        />
      </label>
      <span className="checkmark"></span>
    </div>
  );
}
