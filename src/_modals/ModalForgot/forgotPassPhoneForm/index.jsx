import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../../_constants';

class forgotPassPhoneForm extends React.Component {
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
            <label htmlFor="phone">
              <span className={touched.phone && errors.phone ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="enter_phone" />
              </span>
              <Field
                className={touched.phone && errors.phone ? 'error_input' : ''}
                type="text"
                name="phone"
                placeholder={TRANSLATIONS[language].your_phone}
              />
              {touched.phone && errors.phone && <div className="error"><p className="error-msg">{errors.phone}</p></div>}
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

export default connect(mapStateToProps)(forgotPassPhoneForm);
