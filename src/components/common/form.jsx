import React, { Component } from "react";
import Joi from "joi-browser";

class Form extends Component {
  state = {
    data: {},
    errors: {},
    idles: {},
  };

  validate = () => {
    const options = {
      abortEarly: false,
    };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    error.details.map((err) => (errors[err.path] = err.message));
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const input = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(input, schema);
    return error ? error.details[0].message : null;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    this.doSubmit();
  };

  handleProperyValidation = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    errorMsg ? (errors[input.name] = errorMsg) : delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    const idles = { ...this.state.idles };
    idles[input.name] = false;

    this.setState({ data, errors, idles });
  };

  handleBlur = (event) => {
    this.handleProperyValidation(event);
  };

  handleChange = (event) => {
    this.handleProperyValidation(event);
  };
  handleCheck = ({ target }) => {
    const { checked, id } = target;
    const data = { ...this.state.data };
    if (checked) data.multipleChoices.push(id);
    else data.multipleChoices.splice(data.multipleChoices.indexOf(id), 1);
  };

  renderSubmitBtn = (label, isloading) => {
    return (
      <button
        type=""
        className="btn btn-primary col-sm-12"
        disabled={this.validate() || isloading}
      >
        {isloading ? <i className="fa fa-spinner fa-pulse"></i> : label}
      </button>
    );
  };
}

export default Form;
