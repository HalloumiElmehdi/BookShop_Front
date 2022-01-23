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
    <React.Fragment>
      <div style={{
        'margin': '10px',
        'height': '10%'
      }}
      >
        <input
          name={name}
          type={type}
          id={name}
          className={classes}
          placeholder={label}
          {...rest}
        />
        {/* <div style={{
          'position': 'relative',
          'z-index': '5',
          'top': '-32px',
          'left': '34%'
        }}
          onClick={onShowPassword}
          className={iconClasses}>
        </div> */}
      </div>
      {error && <div className="invalid-feedback" style={{'display':'block'}}>{error}</div>}
      {<div className="valid-feedback"></div>}



    </React.Fragment >

  );
};

export default InputPassword;
