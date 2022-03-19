import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import ReactPhoneInput from 'react-phone-input-2';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TranslationContainer from '../../_components/TranslationContainer';
import DateRange from '../../_helpers/DateRange';
import AutocompleteProfile from '../../_components/AutocompleteProfile';

class RegistrationForm extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  handleLocationChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    !!address.length
      && geocodeByAddress(address)
        .then((results) => {
          getLatLng(results[0]);

          const getLocality = results[0].address_components.filter(
            (el) => el.types && el.types.includes('locality'),
          );

          if (getLocality.length) {
            this.props.setCity(getLocality[0].long_name);
          }
        })
        .catch((error) => console.error('Error', error));
  };

  resetErrors = (value) => {
    const { errors, setErrors } = this.props.formProps;

    delete errors[value];
    setErrors({ ...errors });
  };

  render() {
    const {
      formProps: {
        values,
        errors,
        touched,
        setFieldValue,
        setFieldTouched,
        setFieldError,
      },
      language,
      setupPreviousStep,
    } = this.props;
    const english = language === 'en';

    return (
      <Form className="form profile-form" autoComplete="off">
        <Row>
          <div className="col-md-6 margin-cutom-form">
            <label htmlFor="firstName">
              <span className={errors?.firstName ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="first_name" />
              </span>
              <Field
                className={
                  errors?.firstName
                    ? 'error_input'
                    : english
                      ? ''
                      : 'directName'
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

          <div className="col-md-6 margin-cutom-form">
            <label htmlFor="firstName">
              <span className={errors.lastName ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="last_name" />
              </span>
              <Field
                className={
                  touched.lastName && errors.lastName
                    ? 'error_input'
                    : english
                      ? ''
                      : 'directName'
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
        </Row>

        <Row>
          <div className="col-md-6 margin-cutom-form">
            <label
              htmlFor="email"
              className={
                values.emailExist === ''
                || (values.emailExist === undefined ? '' : 'disabled')
              }
            >
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
                {...(values.emailExist === ''
                  || (values.emailExist === undefined
                    ? undefined
                    : { disabled: true }))}
              />
              {touched.email && errors.email && (
                <div className="error">
                  <p className="error-msg">{errors.email}</p>
                </div>
              )}
            </label>
          </div>
          <div className="col-md-6 margin-cutom-form phone-block">
            <label
              htmlFor="phone"
              className={
                values.emailExist === '' || values.emailExist === undefined
                  ? ''
                  : 'disabled'
              }
            >
              <span className={errors.telephone ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="phone" />
              </span>

              <ReactPhoneInput
                value={
                  values.telephone && values.telephone.replace(/[()|+]/g, '')
                }
                buttonStyle={{ display: 'none' }}
                inputStyle={{ paddingLeft: 35 }}
                alwaysDefaultMask
                placeholder="+972 – –––  ––––"
                defaultMask=". ... ....."
                onChange={(phone) => setFieldValue('telephone', `+${phone.replace(/[() ]/g, '')}`)}
              />

              {touched.telephone && errors.telephone && (
                <div className="error">
                  <p className="error-msg">
                    <TranslationContainer translationKey="error_phone_match" />
                  </p>
                </div>
              )}
            </label>
          </div>
        </Row>

        <div className="margin-cutom-form">
          <label htmlFor="street">
            <span
              className={
                touched.address && errors.address
                  ? 'error_input_text'
                  : english
                    ? ''
                    : 'directName'
              }
            >
              <TranslationContainer translationKey="address" />
            </span>

            <AutocompleteProfile
              handleSelect={this.handleSelect}
              resetErrors={this.resetErrors}
              validate={setFieldError}
              onLocationChange={this.handleLocationInput}
              errorClass={
                touched.address && errors.address
                  ? 'error_input'
                  : english
                    ? ''
                    : 'directName'
              }
              address={values.address}
              onChange={setFieldValue}
              onBlurChange={setFieldTouched}
            />

            {touched.address && errors.address && (
              <div className="error">
                <p className="error-msg">{errors.address}</p>
              </div>
            )}
          </label>
        </div>

        <Row>
          <div className="col-md-6 col-sm-12 margin-cutom-form">
            <label
              htmlFor="code"
              className={errors.birthDate ? 'error_input2' : ''}
            >
              <span className={errors.birthDate ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="date_of_birth" />
              </span>
              <DateRange
                initialDate={values.birthDate}
                onChange={setFieldValue}
                onBlur={setFieldTouched}
                initialDateId="birthDate"
              />
              {touched.birthDate && errors.birthDate && (
                <div className="error">
                  <p className="error-msg">{errors.birthDate}</p>
                </div>
              )}
            </label>
          </div>

          <div className="col-md-6 col-sm-12 margin-cutom-form d-flex align-items-center">
            <div className="checkbox-form">
              <label>
                <Field
                  type="radio"
                  name="gender"
                  value="m"
                  hidden
                  checked={values.gender === 'm'}
                />
                <span className="label-text">
                  <TranslationContainer translationKey="male" />
                </span>
              </label>
            </div>
            <div className="checkbox-form">
              <label>
                <Field
                  type="radio"
                  name="gender"
                  value="f"
                  hidden
                  checked={values.gender === 'f'}
                />
                <span className="label-text">
                  <TranslationContainer translationKey="female" />
                </span>
              </label>
            </div>
          </div>
        </Row>

        <div className="checkbox-form">
          <label>
            <Field
              type="checkbox"
              name="agree1"
              value="sign_up_agree1"
              checked={!!values.agree1}
            />
            <span className="label-text no-uppercase">
              <span className="mx-0">
                <TranslationContainer translationKey="sign_up_agree1_1" />
                <span>&#160;</span>
                <a
                  href={
                    `https://www.chipper.co.il/${language}/terms_of_use`
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  <TranslationContainer translationKey="terms" />
                </a>
                <span>&#160;</span>
                <TranslationContainer translationKey="sign_up_agree1_2" />
                <span>&#160;</span>
                <a
                  href={`https://www.chipper.co.il/${language}/privacy`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <TranslationContainer translationKey="privacy_policy" />
                </a>
                <span>&#160;</span>
                <TranslationContainer translationKey="sign_up_agree1_3" />
              </span>
            </span>
          </label>

          {touched.agree1 && errors.agree1 && (
            <div className="error">
              <p className="error-msg">{errors.agree1}</p>
            </div>
          )}
        </div>

        <div className="checkbox-form">
          <label>
            <Field
              type="checkbox"
              name="agree2"
              value="sign_up_agree2"
              checked={!!values.agree2}
            />
            <span className="label-text no-uppercase">
              <TranslationContainer translationKey="sign_up_agree2" />
            </span>
          </label>
        </div>

        <Row className="mt-3 mb-4 pr-3 dir-ltr d-flex justify-content-between">
          <div>
            <button
              className="btn btn-back icon-btn-outline mr-5 ml-3"
              onClick={setupPreviousStep}
            >
              <img src={`../assets/images/arrow-left.svg`} />
            </button>
          </div>
          <div>
            <button
              className="btn btn-primary btn-lg"
              disabled={
                // Object.keys(values).find(key => values[key] === "" || !values.agree1) ||
                Object.keys(errors).length > 0
              }
              onClick={() => {
                const val = values.email.replace(/ /g, '');
                setFieldValue('email', val.trim());
              }}
              style={styles.button}
            >
              <TranslationContainer translationKey="continue" />
            </button>
          </div>
        </Row>
      </Form>
    );
  }
}

export default RegistrationForm;

const styles = {
  button: {
    width: 416,
    ...(innerWidth <= 1280 && { width: 870 }),
    ...(innerWidth <= 1200 && { width: innerWidth - 100 }),
    ...(innerWidth < 480 && { width: innerWidth - 40 }),
  },
};
