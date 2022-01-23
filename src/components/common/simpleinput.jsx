import React from "react";

export default function checkoutInput({
  name,
  label,
  type = "text",
  error,
  isIdle = null,
  ...rest
}) {
  let classes = "form-control ";
  if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
  return (
    <div className="checkout__input">
      <p>
        {label}
        <span>*</span>
      </p>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={label}
        className={classes}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {<div className="valid-feedback"></div>}
    </div>
  );
}
