import { useState } from "react";
import Joi from "joi-browser";

export const useForm = ({ initialState, schema }) => {
  const [currentState, setValues] = useState(initialState);

  function validateProperty(propertyName, value) {
    const obj = { [propertyName]: value };
    const propertieSchema = { [propertyName]: schema[propertyName] };

    if (propertyName === "passwordConfirmation") return null;

    const { error } = Joi.validate(obj, propertieSchema);

    return error ? error.details[0].message : null;
  }

  function handleChange({ currentTarget: input }) {
    const { data, errors } = currentState;
    const errorMessage = validateProperty(input.name, input.value);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    data[input.name] = input.value;

    setValues({
      data,
      errors
    });
  }

  function validate() {
    const options = { abortEarly: false };
    const { error } = Joi.validate(currentState.data, schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  }

  function canSubmit(e) {
    e.preventDefault();
    const errors = validate();

    if (errors) {
      setValues({
        ...currentState,
        errors
      });
      return false;
    }
    return true;
  }

  return [currentState, handleChange, canSubmit, setValues];
};
