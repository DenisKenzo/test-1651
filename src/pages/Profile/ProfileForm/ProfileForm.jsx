import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import { isValidNumber } from 'libphonenumber-js';
import ReactPhoneInput from 'react-phone-input-2';
import { connect } from 'react-redux';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Avatar from 'react-avatar-edit';
import { bindActionCreators } from 'redux';
import ToggleWrapper from '../../../_components/ToggleWrapper';
import TranslationContainer from '../../../_components/TranslationContainer';
import AutocompleteProfile from '../../../_components/AutocompleteProfile';
import DateRange from '../../../_helpers/DateRange';
import { alertCall } from '../../../_actions/alerts.actions';
import { TRANSLATIONS } from '../../../_constants';

class ProfileForm extends React.Component {
  state = {
    userDetails: this.props.user && this.props.user,
    previousImageUser: null,
  };

  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  componentDidMount() {
    geocodeByAddress().then((results) => getLatLng(results[0]));
  }

  onClose = () => {
    const { userDetails, previousImageUser } = this.state;

    this.props.setFieldValue('imageUser', previousImageUser);
  };

  onCrop = (preview) => {
    const { userDetails } = this.state;
    console.log('userDetImage', userDetails.imageUser);
    console.log('preview', preview);

    this.setState({
      ...this.state,
      previousImageUser: userDetails.imageUser,
    });

    this.props.setFieldValue('imageUser', preview);
  };

  onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 7416800) {
      alert('File is too big!');
      elem.target.value = '';
    }
    const { alertCall, handleSetIsBadImg, language } = this.props;
    const img = new Image();

    img.onload = function () {
      if (this.width <= 300 || this.height <= 300) {
        alertCall({ type: 'danger', text: TRANSLATIONS[language].profile_avatar_error });
        handleSetIsBadImg(true);
      } else {
        handleSetIsBadImg(false);
      }
    };

    img.src = URL.createObjectURL(elem.target.files[0]);
  };

  render() {
    const {
      values,
      errors,
      touched,
      submitCount,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      setFieldError,
      handleSelect,
      user,
      language,
    } = this.props;
    const english = language === 'en';
    // console.log('touched', touched)
    console.log('values', values);
    console.log('user', this.props.user);
    const differenceField = values.address !== user.address
      || values.firstName !== user.firstName
      || values.lastName !== user.lastName
      || values.gender !== user.gender
      || values.birthDate !== user.birthDate
      || values.imageUser !== user.imageUser;

    return (
      <>
        <div className="mt-6 avatar_block Avatar">
          <div className="setting image_picker">
            <div className="settings_wrap">
              <label className="drop_target">
                <div className="image_preview">
                  <Avatar
                    width={92}
                    height={92}
                    label=""
                    onCrop={this.onCrop}
                    onClose={this.onClose}
                    onBeforeFileLoad={this.onBeforeFileLoad}
                    src={this.state.src}
                    cropRadius={10}
                    exportAsSquare
                    border={0}
                  />

                  <div
                    className={
                      values.imageUser || this.props.user.imageUrl
                        ? 'existed-image'
                        : 'no-image'
                    }
                  >
                    <img
                      alt="user"
                      src={
                        values.imageUser
                          ? values.imageUser
                          : this.props.user.imageUrl
                            ? this.props.user.imageUrl
                            : `../assets/images/user.svg`
                      }
                    />
                  </div>
                </div>
              </label>
            </div>
          </div>

          <div className="mt-2 Additional-Msg">
            <p className="p-small">
              <TranslationContainer translationKey="required_avatar" />
            </p>
          </div>
        </div>
        <Form className="form profile-form" autocomplete="off">
          <Row>
            <div className="col-md-6 margin-cutom-form">
              <label htmlFor="firstName">
                <span
                  className={
                    errors.firstName && touched.firstName
                      ? 'error_input_text'
                      : ''
                  }
                >
                  <TranslationContainer translationKey="first_name" />
                </span>
                <Field
                  className={
                    errors.firstName && touched.firstName
                      ? 'error_input'
                      : english
                        ? ''
                        : 'directName'
                  }
                  type="text"
                  name="firstName"
                  placeholder=""
                />
                {errors.firstName && touched.firstName && (
                  <div className="error">
                    <p className="error-msg">{errors.firstName}</p>
                  </div>
                )}
              </label>
            </div>
            <div className="col-md-6 margin-cutom-form">
              <label htmlFor="firstName">
                <span
                  className={
                    errors.lastName && touched.lastName
                      ? 'error_input_text'
                      : ''
                  }
                >
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
                {errors.lastName && touched.lastName && (
                  <div className="error">
                    <p className="error-msg">{errors.lastName}</p>
                  </div>
                )}
              </label>
            </div>
            <div className="col-md-6 margin-cutom-form phone-block">
              <label
                htmlFor="phone"
                className={
                  values.telephone === '' || values.telephone === undefined
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
                  style={{ backgroundColor: 'white' }}
                  onlyCountries={['il', 'ua', 'ru']}
                  inputClass={
                    (submitCount > 0 && values.telephone === undefined)
                    || (values.telephone
                      && !isValidNumber(
                        `+${values.telephone.replace(/[()|+]/g, '')}`,
                      ))
                      ? 'error_input'
                      : ''
                  }
                  placeholder=""
                  {...(values.telephoneExist === ''
                  || values.telephoneExist === undefined
                    ? undefined
                    : { disabled: true })}
                  country="il"
                  countryCodeEditable={false}
                  onChange={(phone) => setFieldValue(
                    'telephone',
                    `+${phone.replace(/[() ]/g, '')}`,
                  )}
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

            <div className="col-sm-12 margin-cutom-form">
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
                  handleSelect={handleSelect}
                  // resetErrors={resetErrors}
                  validate={setFieldError}
                  onLocationChange={this.handleLocationInput}
                  errorClass={
                    touched.address && errors.address
                      ? 'error_input'
                      : english
                        ? ''
                        : 'directName'
                  }
                  address={this.props.values.address}
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

            <div className="col-md-6 col-sm-12 margin-cutom-form">
              <label
                htmlFor="code"
                className={
                  errors.birthDate && touched.birthDate ? 'error_input2' : ''
                }
              >
                <span
                  className={
                    errors.birthDate && touched.birthDate
                      ? 'error_input_text'
                      : ''
                  }
                >
                  <TranslationContainer translationKey="date_of_birth" />
                </span>
                <DateRange
                  initialDate={values.birthDate}
                  onChange={setFieldValue}
                  onBlur={setFieldTouched}
                  initialDateId="birthDate"
                  minDate
                  maxDate
                />
                {errors.birthDate && touched.birthDate && (
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
                    value="f"
                    hidden
                    checked={values.gender === 'f'}
                  />
                  <span className="label-text">
                    <TranslationContainer translationKey="female" />
                  </span>
                </label>
              </div>
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
            </div>

            {this.state.userDetails?.agree1 ? (
              ''
            ) : (
              <div className="col-sm-12 margin-cutom-form d-flex align-items-center agreement">
                <div className="checkbox-form">
                  <ToggleWrapper
                    classElement="input-flex"
                    className="left-margin"
                    label=""
                    opt1=""
                    opt2="agree1"
                    name="agree1"
                    checked={values.agree1}
                    onToggle={() => setFieldValue('agree1', !values.agree1)}
                  />
                  {touched.agree1 && errors.agree1 && (
                    <div className="error">
                      <p className="error-msg">{errors.agree1}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            {this.state.userDetails?.agree2 ? (
              ''
            ) : (
              <div className="col-sm-12 margin-cutom-form">
                <ToggleWrapper
                  classElement="input-flex  mb-4"
                  className="left-margin"
                  label=""
                  opt1=""
                  opt2="sign_up_agree2"
                  name="agree2"
                  checked={values.agree2}
                  onToggle={() => setFieldValue('agree2', !values.agree2)}
                />
                {touched.agree2 && errors.agree2 && (
                  <div className="error">
                    <p className="error-msg">{errors.agree2}</p>
                  </div>
                )}
              </div>
            )}

            <div className="col-md-6 margin-cutom-form  d-flex">
              <button
                type="submit"
                className="btn btn-primary btn-lg "
                disabled={!differenceField}
                onClick={() => {
                  const val = values.email.replace(/ /g, '');
                  setFieldValue('email', val.trim());
                }}
              >
                <TranslationContainer translationKey="save_changes" />
              </button>
            </div>
          </Row>
        </Form>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  language: state.mainReducer.locale,
});

const mapDispatchToProps = (dispatch) => (
  bindActionCreators({ alertCall }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm);
