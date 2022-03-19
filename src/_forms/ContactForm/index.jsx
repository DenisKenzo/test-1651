import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import ReactPhoneInput from 'react-phone-input-2';
import { isValidNumber } from 'libphonenumber-js';
import { TRANSLATIONS } from '../../_constants';
import CustomSelect from './CustomSelect';
import {
  getExtraCoupons,
  getFavoriteCoupons,
  getFavouriteCategories,
  isLoggedIn,
  loginUser,
  logout,
} from '../../_actions';
import TranslationContainer from '../../_components/TranslationContainer';
import { userService } from '../../_services/user.service';

class ContactForm extends React.Component {
  state = {
    subjects: [],
  };

  componentDidMount() {
    const { language } = this.props;

    userService.contactSubject().then((response) => {
      if (response?.length) {
        this.setState({
          ...this.state,
          subjects: response.map((val, key) => ({ id: key, display: val[language] })),
        });
      }
    });
  }

  render() {
    const {
      errors,
      touched,
      values,
      setFieldValue,
      isLogged,
      language,
    } = this.props;
    const { subjects } = this.state;

    console.log('values', values);

    return (
      <Form className="form profile-form">
        <Row>
          {!isLogged && (
            <div className="col-md-6 margin-company-custom">
              <label htmlFor="fullName">
                <span
                  className={
                    touched.firstName && errors.firstName
                      ? 'error_input_text'
                      : ''
                  }
                >
                  <TranslationContainer translationKey="first_name" />
                </span>
                <Field
                  className={
                    touched.firstName && errors.firstName ? 'error_input' : ''
                  }
                  type="text"
                  name="firstName"
                  placeholder=""
                />
                {touched.firstName && errors.firstName && (
                  <div className="error">
                    <p className="error-msg">{errors.firstName}</p>
                  </div>
                )}
              </label>
            </div>
          )}
          {!isLogged && (
            <div className="col-md-6 margin-company-custom">
              <label htmlFor="lastName">
                <span
                  className={
                    touched.lastName && errors.lastName
                      ? 'error_input_text'
                      : ''
                  }
                >
                  <TranslationContainer translationKey="last_name" />
                </span>
                <Field
                  className={
                    touched.lastName && errors.lastName ? 'error_input' : ''
                  }
                  type="text"
                  name="lastName"
                  placeholder=""
                />
                {touched.lastName && errors.lastName && (
                  <div className="error">
                    <p className="error-msg">{errors.lastName}</p>
                  </div>
                )}
              </label>
            </div>
          )}
          {!isLogged && (
            <div className="col-md-6 margin-company-custom margin-company phone-block">
              <label htmlFor="phone">
                <span className={errors.telephone ? 'error_input_text' : ''}>
                  <TranslationContainer translationKey="phone" />
                </span>
                <ReactPhoneInput
                  value={values.telephone}
                  style={{ backgroundColor: 'white' }}
                  onlyCountries={['il', 'ua', 'ru']}
                  inputClass={
                    values.telephone && !isValidNumber(`+${values.telephone}`)
                      ? ' error_input'
                      : ''
                  }
                  country="il"
                  countryCodeEditable={false}
                  onChange={(phone) => setFieldValue('telephone', phone.replace(/[() ]/g, ''))}
                  masks={{ il: '... ... ...' }}
                />

                {errors.telephone && (
                  <div className="error">
                    <p className="error-msg">
                      <TranslationContainer translationKey="error_phone_match" />
                    </p>
                  </div>
                )}
              </label>
            </div>
          )}
          {!isLogged && (
            <div className="col-md-6 margin-company-custom margin-company margin-subject-custom">
              <label htmlFor="email">
                <span
                  className={
                    touched.email && errors.email ? 'error_input_text' : ''
                  }
                >
                  <TranslationContainer translationKey="email" />
                </span>
                <Field
                  className={touched.email && errors.email ? 'error_input' : ''}
                  type="text"
                  name="email"
                  placeholder=""
                />
                {touched.email && errors.email && (
                  <div className="error">
                    <p className="error-msg">{errors.email}</p>
                  </div>
                )}
              </label>
            </div>
          )}

          <div className="col-md-12">
            <label htmlFor="subject">
              <span
                className={
                  touched.subject && errors.subject ? 'error_input_text' : ''
                }
              >
                <TranslationContainer translationKey="subject" />
              </span>
              <CustomSelect
                name="subject"
                options={subjects && subjects}
                setFieldValue={setFieldValue}
                value={values.subject}
                textLabel={TRANSLATIONS[language].helpSubjectPlaceholder}
              />
              {touched.subject && errors.subject && (
                <div className="error">
                  <p className="error-msg">{errors.subject}</p>
                </div>
              )}
            </label>
            {/* {values.subject.display === 'Other' && (
              <div className="margin-company-custom margin-company">
                <label htmlFor="subject">
                  <span
                    className={
                      touched.lastName && errors.lastName
                        ? 'error_input_text'
                        : ''
                    }
                  >
                    <TranslationContainer translationKey="subjectOther" />
                  </span>
                  <Field
                    className={
                      touched.lastName && errors.lastName ? 'error_input' : ''
                    }
                    type="textarea"
                    name="subjectOther"
                    placeholder={TRANSLATIONS[language]['subjectOther']}
                  />
                  {touched.subject && errors.subject && (
                    <div className="error">
                      <p className="error-msg">{errors.subject}</p>
                    </div>
                  )}
                </label>
              </div>
            )} */}
          </div>

          <div className="col-md-12 margin-company-custom margin-company">
            <label htmlFor="message">
              <span
                className={
                  touched.subject && errors.subject ? 'error_input_text' : ''
                }
              >
                <TranslationContainer translationKey="message" />
              </span>
              <Field
                className={
                  touched.message && errors.message ? 'error_input' : ''
                }
                component="textarea"
                type="text"
                name="message"
                placeholder=""
              />
              {touched.message && errors.message && (
                <div className="error">
                  <p className="error-msg">{errors.message}</p>
                </div>
              )}
            </label>
          </div>

          <div className="col-md-6" />

          <div className="col-md-6 margin-custom-form margin-company d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={Object.keys(errors).length > 0}
            >
              <TranslationContainer translationKey="submit" />
            </button>
          </div>
        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  isLogged: state.auth.isLoggedIn,
  language: state.mainReducer.locale,
});

export default withRouter(connect(mapStateToProps)(ContactForm));
