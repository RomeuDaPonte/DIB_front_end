import React from "react";
import Input from "./input";
import Select from "./select";

export function renderInput(
  state,
  name,
  handleChange,
  placeholder = "",
  type = "text",
  classNameExtra = ""
) {
  return (
    <Input
      type={type}
      value={state.data[name]}
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
      error={state.errors[name]}
      classNameExtra={classNameExtra}
    />
  );
}

export function renderSelect(
  name,
  list,
  error,
  defaultSelectedId = "",
  classNameExtra = ""
) {
  return (
    <Select
      name={name}
      list={list}
      error={error}
      defaultSelectedId={defaultSelectedId}
      classNameExtra={classNameExtra}
    />
  );
}

export default {
  renderInput,
  renderSelect
};
