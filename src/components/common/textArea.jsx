import React from "react";

const TextArea = ({
  name,
  label,
  type = "text",
  error,
  isIdle = null,
  ...rest
}) => {
  let classes = "form-control ";
  if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
  return (
    <div className="form-group">
      <textarea
        type={type}
        name={name}
        id={name}
        placeholder={label}
        className={classes}
        {...rest}
      >
      </textarea>
      {error && <div className="invalid-feedback">{error}</div>}
      {<div className="valid-feedback"></div>}
    </div>
  );
};

export default TextArea;
