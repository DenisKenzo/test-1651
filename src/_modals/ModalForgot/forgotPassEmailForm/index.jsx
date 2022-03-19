import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../../_constants';

class forgotPassEmailForm extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  render() {
    const { errors, touched, language } = this.props;

    return (
      <Form className="form login-form">
        <Row>
          <div className="col-md-12">

            <label htmlFor="email">
              <span className={touched.email && errors.email ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="enter_email" />
              </span>
              <Field
                className={touched.email && errors.email ? 'error_input' : ''}
                type="text"
                name="email"
                placeholder={TRANSLATIONS[language].your_email}
              />
              {touched.email && errors.email && <div className="error"><p className="error-msg">{errors.email}</p></div>}
            </label>
          </div>

          <div className="col-md-12 mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-lg wid-100"
              disabled={Object.keys(errors).length > 0}
            >
              <TranslationContainer translationKey="continue" />
            </button>
          </div>

        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(forgotPassEmailForm);
