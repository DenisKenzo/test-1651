import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import TranslationContainer from '../../_components/TranslationContainer';

class LoginForm extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  render() {
    const {
      values, errors, touched, isSubmitting, setValues, forgotPassword,
    } = this.props;

    return (
      <Form className="form login-form">
        <Row>
          <div className="col-md-12 mt-6">
            <label htmlFor="email">
              <TranslationContainer translationKey="email" />
              <Field
                type="text"
                name="email"
                placeholder=""
              />
              <div>{touched.email && errors.email && <p className="error-msg">{errors.email}</p>}</div>
            </label>
          </div>

          <div className="col-md-12 mt-6">
            <label htmlFor="city">
              <span className="float-left"><TranslationContainer translationKey="password" /></span>
              <div className="float-right forgot_pass" onClick={() => forgotPassword()}><p><TranslationContainer translationKey="lost_password" /></p></div>
              <Field
                type="password"
                name="password"
                placeholder=""
              />
              <div>{touched.password && errors.password && <p className="error-msg">{errors.password}</p>}</div>
            </label>
          </div>

          <div className="col-md-12 mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-lg wid-100"
            >
              <TranslationContainer translationKey="login" />
            </button>
          </div>

        </Row>
      </Form>
    );
  }
}

export default LoginForm;
