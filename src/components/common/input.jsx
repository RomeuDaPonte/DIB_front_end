import React from "react";

const Input = ({
  type,
  value,
  onChange,
  name,
  placeholder,
  error,
  classNameExtra
}) => {
  return (
    <div className="form-group">
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        className={`form-control ${classNameExtra}`}
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
