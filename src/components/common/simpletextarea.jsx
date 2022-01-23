import React, { Fragment } from "react";

export default function TextArea({
  name,
  type = "text",
  error,
  isIdle = null,
  placeholder,
  ...rest
}) {
  let classes = "form-control ";
  if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
  return (
    <div className="checkout__input">
      <textarea
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        className={classes}
        {...rest}
      />
      {error && <div className="invalid-feedback">{error}</div>}
      {<div className="valid-feedback"></div>}
    </div>
  );
}
