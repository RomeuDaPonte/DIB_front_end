import React from "react";

const Input = ({ type, value, onChange, name, placeholder, error }) => {
  return (
    <div className="form-group">
      <input
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
