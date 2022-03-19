import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../../_constants';

class CheckCode extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  render() {
    const {
      errors, touched, resend, language,
    } = this.props;

    return (
      <Form className="form login-form">
        <Row>
          <div className="col-md-12">

            <label htmlFor="code">
              <span className={touched.code && errors.code ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="security_code" />
              </span>
              <Field
                className={touched.code && errors.code ? 'error_input' : ''}
                type="text"
                name="code"
                placeholder={TRANSLATIONS[language].security_code}
              />
              <span className="show_pass" onClick={() => resend()}>
                <p className="text-primary"><TranslationContainer translationKey="resend" /></p>
              </span>
              {touched.code && errors.code && <div className="error"><p className="error-msg">{errors.code}</p></div>}
            </label>
          </div>

          <div className="col-md-12 mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-lg wid-100"
              disabled={Object.keys(errors).length > 0}
            >
              <TranslationContainer translationKey="reset_my_password" />
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

export default connect(mapStateToProps)(CheckCode);
