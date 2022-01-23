import React from "react";

const Input = ({
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
    <React.Fragment>
      <div style={{
        'margin': '10px'
      }}>

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

    </React.Fragment>

  );
};

export default Input;
