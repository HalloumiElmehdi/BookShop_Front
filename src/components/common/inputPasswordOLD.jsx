import React from "react";

const InputPassword = ({
  name,
  label,
  error,
  onShowPassword,
  showPassword,
  isIdle = null,
  ...rest
}) => {
  let iconClasses = "clickable fa fa-eye";
  iconClasses += !showPassword ? "-slash" : "";
  const type = showPassword ? "text" : "password";
  let classes = "form-control ";

  if (isIdle != null) classes += error ? "is-invalid" : "is-valid";
  return (
    <div className="form-group">
      <div className="input-group mb-2">
        <div className="input-group-prepend">
          <span
            className="input-group-text"
            onClick={onShowPassword}
            id="basic-addon"
          >
            <i className={iconClasses}></i>
          </span>
        </div>
        <input
          name={name}
          type={type}
          id={name}
          className={classes}
          placeholder={label}
          aria-describedby="basic-addoc"
          {...rest}
        />
        {error && <div className="invalid-feedback">{error}</div>}
        {<div className="valid-feedback"></div>}
      </div>
    </div>
  );
};

export default InputPassword;
