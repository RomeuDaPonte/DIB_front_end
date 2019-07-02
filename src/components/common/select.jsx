import React from "react";

//...rest get the other properties from the props obj
const Select = ({ name, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;