import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import ReactPhoneInput from 'react-phone-input-2';
import { isValidNumber } from 'libphonenumber-js';
import TranslationContainer from '../../_components/TranslationContainer';

class CompanyForm extends React.Component {
  render() {
    const {
      errors, touched, values, setFieldValue,
    } = this.props;

    return (
      <Form className="form profile-form">
        <Row>
          <div className="col-md-6 margin-company-custom">
            <label htmlFor="fullName">
              <span className={errors.fullName ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="full_name" />
              </span>
              <Field
                className={errors.fullName ? 'error_input' : ''}
                type="text"
                name="fullName"
                placeholder=""
              />
              {errors.fullName && (
                <div className="error">
                  <p className="error-msg">{errors.fullName}</p>
                </div>
              )}
            </label>
          </div>
          <div className="col-md-6 margin-company-custom">
            <label htmlFor="firstName">
              <span
                className={errors.lastName ? 'error_input_text' : 'nameCompany'}
              >
                <TranslationContainer translationKey="coupon_for_register_company" />
              </span>
              <Field
                className={errors.companyName ? 'error_input' : ''}
                type="text"
                name="companyName"
                placeholder=""
              />
              {errors.companyName && (
                <div className="error">
                  <p className="error-msg">{errors.companyName}</p>
                </div>
              )}
            </label>
          </div>
          <div className="col-md-6 margin-company-custom margin-company phone-block">
            <label htmlFor="phone">
              <span className={errors.telephone ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="phone" />
              </span>
              <ReactPhoneInput
                value={values.telephone.replace(/[()|+]/g, '')}
                style={{ backgroundColor: 'white' }}
                onlyCountries={['il', 'ua', 'ru']}
                inputClass={
                  values.telephone
                  && !isValidNumber(`+${values.telephone.replace(/[()|+]/g, '')}`)
                    ? ' error_input'
                    : ''
                }
                country="il"
                countryCodeEditable={false}
                onChange={(phone) => setFieldValue('telephone', `+${phone.replace(/[() ]/g, '')}`)}
                masks={{ il: '... ... ...' }}
              />
              {errors.telephone && (
                <div className="error">
                  <p className="error-msg">{errors.telephone}</p>
                </div>
              )}
            </label>
          </div>
          <div className="col-md-6 margin-company-custom margin-company">
            <label htmlFor="email">
              <span className={errors.email ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="email" />
              </span>
              <Field
                className={errors.email ? 'error_input' : ''}
                type="text"
                name="email"
                placeholder=""
              />
              {errors.email && (
                <div className="error">
                  <p className="error-msg">{errors.email}</p>
                </div>
              )}
            </label>
          </div>

          <div className="col-md-6" />

          <div className="col-md-6 margin-cutom-form margin-company d-flex justify-content-end">
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              disabled={Object.keys(errors).length > 0}
            >
              <TranslationContainer translationKey="register" />
            </button>
          </div>
        </Row>
      </Form>
    );
  }
}

export default CompanyForm;
