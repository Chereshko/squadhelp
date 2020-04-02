import React from 'react';
import classNames from 'classnames';
import PropTypes from "prop-types"

const FormInput = (props) => {

  const {label, input, type, classes, meta: {touched, error},warning,validStyle,invalidStyle,container,className} = props;

  const inputClassName = classNames(className, {
      [invalidStyle]: touched && error,
      [validStyle]: touched && !error,
    });

  return (
    < div
  <div className={ container }>
    < input {...input} placeholder = { label } type = { type }
            className = { inputClassName}/>;
  {
     warning && ( touched &&
            ( error && <span className={ warning }>{ error }</span> ) ) }
      < /div>;
  )
  };

  FormInput.propTypes={
    validStyle:PropTypes.string,
    invalidStyle:PropTypes.string,
    className:PropTypes.string.isRequired,
    container:PropTypes.string.isRequired,
    warning:PropTypes.string.isRequired

  };


  export default FormInput;;