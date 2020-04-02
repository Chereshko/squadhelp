import React from 'react';
import Error from '../Error/Error';
import { connect } from 'react-redux';
import { authActionRegister, clearAuth } from '../../actions/actionCreator';
import { Redirect } from 'react-router-dom';
import styles from './RegistrationForm.module.sass';
import { Field, reduxForm } from 'redux-form';
import FormInput from '../FormInput/FormInput';
import RoleInput from '../RoleInput/RoleInput';
import AgreeTermOfServiceInput
  from '../AgreeTermOfServiceInput/AgreeTermOfServiceInput';
import CONSTANTS from '../../constants';
import customValidator from '../../validators/validator';
import Schems from '../../validators/validationSchems';

class RegistrationForm extends React.Component{

  componentWillUnmount () {
    this.props.clearForm();
  }

  handleData = (values) => {
    this.props.register({
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
      password: values.password,
      role: values.role,
    });
  };

  render () {
    const {handleSubmit, submitting, auth, clearForm} = this.props;
    const {error} = auth;
    const formInputClasses = {
          container: styles.inputContainer,
          className: styles.input,
          warning: styles.fieldWarning,
          invalidStyle: styles.notValid,
          validStyle: styles.valid,
        };
    return (
      <div className={ styles.signUpFormContainer }>
        { error && <Error data={ error.data } status={ error.status }
                          clearError={ clearForm }/> }

        <form onSubmit={ handleSubmit(this.handleData) }>
          <div className={ styles.row }>
            <Field
              name='firstName'
              classes={ formInputClasses }
              component={ FormInput }
              type='text'
              label='First name'
            />
            <Field
              name='lastName'
              { ...formInputClasses }
              component={ FormInput }
              type='text'
              label='Last name'
            />
          </div>
          <div className={ styles.row }>
            <Field
              name='displayName'
              { ...formInputClasses }
              component={ FormInput }
              type='text'
              label='Display Name'
            />
            <Field
              name='email'
              { ...formInputClasses }
              component={ FormInput }
              type='text'
              label='Email Address'
            />
          </div>
          <div className={ styles.row }>
            <Field
              name='password'
              { ...formInputClasses }
              component={ FormInput }
              type='password'
              label='Password'
            />
            <Field
              name='confirmPassword'
              { ...formInputClasses }
              component={ FormInput }
              type='password'
              label='Password confirmation'
            />
          </div>
          <div className={ styles.choseRoleContainer }>
            <Field name='role' type='radio' value={ CONSTANTS.CUSTOMER }
                   strRole='Join As a Buyer'
                   infoRole='I am looking for a Name, Logo or Tagline for my business, brand or product.'
                   component={ RoleInput } id={ CONSTANTS.CUSTOMER }/>
            <Field name='role' type='radio' value={ CONSTANTS.CREATOR }
                   strRole='Join As a Creative'
                   infoRole='I plan to submit name ideas, Logo designs or sell names in Domain Marketplace.'
                   component={ RoleInput } id={ CONSTANTS.CREATOR }/>
          </div>
          <div className={ styles.termsOfService }>
            <Field
              name='agreeOfTerms'
              classes={ {
                container: styles.termsOfService,
                warning: styles.fieldWarning,
              } }
              id='termsOfService'
              component={ AgreeTermOfServiceInput }
              type='checkbox'
            />

          </div>
          <button type='submit' disabled={ submitting }
                  className={ styles.submitContainer }>
            <span className={ styles.inscription }>Create Account</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    initialValues: {
      role: CONSTANTS.CUSTOMER,
    },
  };
};

const mapDispatchToProps = (dispatch) => (
  {
    register: (data) => dispatch(authActionRegister(data)),
    clearForm: () => dispatch(clearAuth()),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'login',
  validate: customValidator(Schems.RegistrationSchem),
})(RegistrationForm));