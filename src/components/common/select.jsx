import React from "react";

//...rest get the other properties from the props obj
const Select = ({ name, list, error, defaultSelectedId, classNameExtra }) => {
  function renderDefaultOption() {
    if (defaultSelectedId) {
      const defaulObject = list.find(i => i._id === defaultSelectedId);
      return <option value={defaulObject._id}>{defaulObject.name}</option>;
    }

    return <option value=""></option>;
  }
  return (
    <div className="form-group">
      <select
        name={name}
        id={name}
        className={`form-control ${classNameExtra}`}
      >
        {renderDefaultOption()}
        {list.map(option => (
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
