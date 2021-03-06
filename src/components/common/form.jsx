import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    formError: ""
  };

  validate = () => {
    const options = { abortEarly: true };

    const { error } = Joi.validate(this.state.data, this.schema, options);

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name: propertyName, value }) => {
    const obj = { [propertyName]: value };
    const schema = { [propertyName]: this.schema[propertyName] };

    if (propertyName === "passwordConfirmation") return null;

    const { error } = Joi.validate(obj, schema);

    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);

    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate();

    this.setState({ errors: errors || {} });

    if (errors) return;

    this.doSubmit();
  };

  renderInput(name, placeholder, type = "text") {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        value={data[name]}
        onChange={this.handleChange}
        name={name}
        placeholder={placeholder}
        error={errors[name]}
      />
    );
  }

  renderButton(label) {
    return (
      <button disabled={this.validate()} className="btn btn-primary">
        {label}
      </button>
    );
  }

  renderSelect(name, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        options={options}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderServerError() {
    const { formError } = this.state;

    return (
      <div className="form-group">
        {formError && <div className="alert alert-danger">{formError}</div>}
      </div>
    );
  }
}

export default Form;
