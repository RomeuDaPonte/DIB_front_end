import React from "react";
import TextField from "@material-ui/core/TextField";
import { useFormikContext } from "formik";

const AppTextInput = ({ name, ...rest }) => {
  const {
    errors,
    values,
    handleBlur,
    handleChange,
    touched,
  } = useFormikContext();
  return (
    <TextField
      onChange={handleChange}
      onBlur={handleBlur}
      value={values[name]}
      error={!!errors[name]}
      helperText={errors[name]}
      id={name}
      name={name}
      autoComplete={name}
      {...rest}
    />
  );
};

export default AppTextInput;
