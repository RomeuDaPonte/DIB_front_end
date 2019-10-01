import React from "react";
import Input from "./input";

export function renderInput(
  state,
  name,
  handleChange,
  placeholder,
  type = "text"
) {
  return (
    <Input
      type={type}
      value={state.data[name]}
      onChange={handleChange}
      name={name}
      placeholder={placeholder}
      error={state.errors[name]}
    />
  );
}

export default {
  renderInput
};
