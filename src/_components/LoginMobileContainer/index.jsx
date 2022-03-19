import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { Form, Formik } from 'formik';
import { Row } from 'react-bootstrap';
import { isValidNumber } from 'libphonenumber-js';
import ReactPhoneInput from 'react-phone-input-2';
import { bindActionCreators } from 'redux';
import ReactCodeInput from '@gabtrompiz/react-verification-code-input';
import {
  boolean, date, object, string,
} from 'yup';
import { loginUser, sendNumber, setupPreviousStep } from '../../_actions';
import {
  checkCode, hideErrorCode, sendMail, updateUser,
} from '../../_actions';
import { TRANSLATIONS } from '../../_constants';
import TranslationContainer from '../TranslationContainer';
import RegistrationForm from '../../_forms/RegistrationForm';

let interval = null;

class LoginMobileContainer extends React.Component {
  state = {
    loginStep: false,
    mobileStep: 1,
    code: '',
    active_email: false,
    active_phone: true,
    timerOff: false,
    timerNum: 60,
    mail: '',
    activeSender: '',
    city: '',
  };

  static getDerivedStateFromProps(props, state) {
    if (props.mobileStep && props.mobileStep !== state.mobileStep) {
      return {
        mobileStep: props.mobileStep,
      };
    }

    return null;
  }

  render() {
    const {
      isLogging,
      isSendingPhone,
      isSentCheckingCode,
      language,
      wrongCode,
      user,
      updateUser,
    } = this.props;
    const {
      phone,
      code,
      mobileStep,
      active_email,
      active_phone,
      timerOff,
      timerNum,
      mail,
      activeSender,
      city,
    } = this.state;

    const schema = object().shape({
      firstName: string().required(TRANSLATIONS[language].error_first_name),
      lastName: string().required(TRANSLATIONS[language].error_last_name),
      telephone: string()
        .required(TRANSLATIONS[language].error_phone)
        .test(
          'telephone',
          TRANSLATIONS[language].error_phone_match,
          (value) => value && isValidNumber(`+${value.replace('+', '')}`),
        ),
      email: string()
        .trim()
        .email(TRANSLATIONS[language].error_email_match)
        .required(TRANSLATIONS[language].error_email),
      birthDate: date()
        .typeError(TRANSLATIONS[language].error_birth_match)
        .max(new Date(), TRANSLATIONS[language].error_birth)
        .required(TRANSLATIONS[language].error_birth_match),
      address: string().required(TRANSLATIONS[language].error_address),
      gender: string().required('Required'),
      agree1: boolean().test(
        'agree1',
        TRANSLATIONS[language].required,
        (value) => value,
      ),
    });

    return (
      <div>
        {isLogging && (
          <div className="loading_form">
            <img src={`../assets/images/loading.svg`} />
          </div>
        )}
        {mobileStep === 1 ? (
          <div>
            <h2 className="text-uppercase text-center">
              <TranslationContainer translationKey="login" />
            </h2>
            <div className="text-center mt-2">
              <p>
                <TranslationContainer translationKey="sign_in_text" />
              </p>
            </div>
            <div className="row mt-3 mb-6">
              <div className="col-md-6 col-sm-12">
                <div
                  className={
                    `block-type d-flex align-items-center ${
                      active_phone ? 'active' : ''}`
                  }
                  onClick={() => this.setState({ active_phone: true, active_email: false })}
                >
                  <div>
                    <img
                      src={`../assets/images/smartphone.svg`}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="text-1">
                        <TranslationContainer translationKey="via_sms" />
                      </p>
                    </div>
                    <div>
                      <p className="text-3">
                        <TranslationContainer translationKey="receive_sms" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-sm-12">
                <div
                  className={
                    `block-type d-flex align-items-center ${
                      active_email ? 'active' : ''}`
                  }
                  onClick={() => this.setState({ active_phone: false, active_email: true })}
                >
                  <div>
                    <img src={`../assets/images/mail.svg`} />
                  </div>
                  <div>
                    <div>
                      <p className="text-1">
                        <TranslationContainer translationKey="via_email" />
                      </p>
                    </div>
                    <div>
                      <p className="text-3">
                        <TranslationContainer translationKey="receive_email" />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {active_email ? (
              <div className="middle-block">
                <div>
                  <div>
                    {isSendingPhone && (
                      <div className="loading_form">
                        <img
                          src={`../assets/images/loading.svg`}
                        />
                      </div>
                    )}
                    <div className="form phone-block mt-6">
                      <label htmlFor="mail">
                        <span
                          className={
                            mail && !this.isValidMail(mail)
                              ? 'error_input_text'
                              : ''
                          }
                        >
                          <TranslationContainer translationKey="enter_email" />
                        </span>
                        <input
                          className={
                            mail && !this.isValidMail(mail) ? 'error_input' : ''
                          }
                          type="text"
                          name="mail"
                          value={mail}
                          placeholder={TRANSLATIONS[language].your_email}
                          onChange={(e) => this.setState({
                            mail: e.target.value.toLowerCase(),
                          })}
                        />
                      </label>
                    </div>
                  </div>
                  <Row className="mt-3 mb-4">
                    <div className="col-sm-12">
                      <button
                        className="btn btn-primary btn-lg wid-100"
                        disabled={!mail || !this.isValidMail(mail)}
                        onClick={() => mail && this.isValidMail(mail) && this.sendMail()}
                      >
                        <TranslationContainer translationKey="continue" />
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            ) : (
              <div className="middle-block">
                <div>
                  <div>
                    {isSendingPhone && (
                      <div className="loading_form">
                        <img
                          src={`../assets/images/loading.svg`}
                        />
                      </div>
                    )}
                    <div className="form phone-block mt-6">
                      <label htmlFor="phone">
                        <span
                          className={
                            phone && !isValidNumber(`+${phone}`)
                              ? 'error_input_text'
                              : ''
                          }
                        >
                          <TranslationContainer translationKey="enter_number" />
                        </span>
                        {/* <ReactPhoneInput */}
                        {/*  buttonStyle={{ display: 'none' }} */}
                        {/*  inputStyle={{ paddingLeft: 35 }} */}
                        {/*  alwaysDefaultMask */}
                        {/*  placeholder={'+972 – –––  ––––'} */}
                        {/*  defaultMask={'. ... .....'} */}
                        {/*  onChange={(phone) => */}
                        {/*    this.setState({ */}
                        {/*      phone: phone.replace(/[() ]/g, ''), */}
                        {/*    }) */}
                        {/*  } */}
                        {/* /> */}
                        <ReactPhoneInput
                          style={{ backgroundColor: 'white' }}
                          onlyCountries={['il', 'ua', 'ru']}
                          inputClass={
                            phone && !isValidNumber(`+${phone}`)
                              ? ' error_input'
                              : ''
                          }
                          country="il"
                          countryCodeEditable={false}
                          onChange={(phone) => this.setState({
                            phone: phone.replace(/[() ]/g, ''),
                          })}
                          masks={{ il: '... ... ...' }}
                        />
                        {phone
                          && !isValidNumber(`+${phone}`)
                          && (phone.length === 12 ? (
                            <div className="error">
                              <p className="error-msg">
                                <TranslationContainer translationKey="wrong_phone" />
                              </p>
                            </div>
                          ) : (
                            phone.startsWith(9720) && (
                              <div className="error">
                                <p className="error-msg">
                                  <TranslationContainer translationKey="valid_phone" />
                                </p>
                              </div>
                            )
                          ))}
                      </label>
                      {/* <span classname="p p-small"> **</span> */}
                    </div>
                  </div>
                  <Row className="mt-5 mb-4">
                    <div className="col-sm-12">
                      <button
                        className="btn btn-primary btn-lg wid-100"
                        disabled={!phone || !isValidNumber(`+${phone}`)}
                        onClick={() => phone
                          && isValidNumber(`+${phone}`)
                          && this.sendNumber()}
                      >
                        <TranslationContainer translationKey="continue" />
                      </button>
                    </div>
                  </Row>
                </div>
              </div>
            )}
          </div>
        ) : mobileStep === 2 ? (
          <div className="middle-block">
            <div className="d-flex flex-column justify-content-between">
              <div>
                {activeSender === 'phone' ? (
                  <div>
                    <h2 className="mt-4 text-center">
                      <TranslationContainer translationKey="verfifcation" />
                    </h2>
                    <div className="text-center mt-2">
                      <p>
                        <TranslationContainer translationKey="sent_sms" />
                        {' '}
                        <div className="phone_ltr">{`+${phone}`}</div>
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h2 className="mt-4 text-center">
                      <TranslationContainer translationKey="verfifcation" />
                    </h2>
                    <div className="text-center mt-2">
                      <p>
                        <TranslationContainer translationKey="sent_mail" />
                        {' '}
                        {mail}
                      </p>
                    </div>
                  </div>
                )}
                {isSentCheckingCode && (
                  <div className="loading_form">
                    <img
                      src={`../assets/images/loading.svg`}
                    />
                  </div>
                )}
                <div className="mt-6">
                  <Form autoComplete={`${Math.random()}`} className="form-code">
                    <input style={{ display: 'none' }} />
                    <input type="password" style={{ display: 'none' }} />
                    <ReactCodeInput
                      className={language === 'he' ? 'otp otp_he' : 'otp'}
                      onChange={this.handleChangeCode}
                      fields={4}
                      type="number"
                      // autoComplete="true"
                      placeholder=""
                      autoFocus
                    />
                  </Form>
                  {wrongCode && (
                    <div className="error">
                      <TranslationContainer translationKey="wrong_code" />
                    </div>
                  )}
                </div>
              </div>
              <Row className="mt-3 mb-4 dir-ltr">
                {/* <div className="btnWrap"> */}
                <div className="col-sm-6">
                  <button
                    className="btn btn-outline-primary btn-lg btn-back  wid-100"
                    onClick={() => this.setupPreviousStep()}
                  >
                    <TranslationContainer translationKey="back_button" />
                  </button>
                </div>
                <div className="col-sm-6">
                  <button
                    className="btn btn-primary btn-lg wid-100"
                    disabled={!code || code.toString().length < 4}
                    onClick={() => code && code.toString().length === 4 && this.checkCode()}
                  >
                    <TranslationContainer translationKey="send_code" />
                  </button>
                </div>
                {/* </div> */}
                <div className="col-sm-12 text-center mt-4 text-primary d-flex align-items-center justify-content-center">
                  <img
                    className="ml-2 mr-2"
                    src={`../assets/images/time.svg`}
                  />
                  <div className="ml-2 mr-2 text-primary">
                    00:
                    {(`0${timerNum}`).slice(-2)}
                  </div>
                </div>
                <div className="col-sm-12 text-center mt-1 send-number">
                  <span
                    onClick={() => timerOff
                      && (activeSender === 'phone'
                        ? this.sendNumber()
                        : this.sendMail())}
                  >
                    <p
                      className={
                        timerOff ? 'text-primary p-small' : 'text-muted p-small'
                      }
                    >
                      <TranslationContainer translationKey="resend_pass" />
                    </p>
                  </span>
                </div>
              </Row>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-uppercase text-center">
              <TranslationContainer translationKey="registration" />
            </h2>
            <div className="text-center mt-2">
              <p>
                <TranslationContainer translationKey="sign_up_text" />
              </p>
            </div>

            <Formik
              initialValues={{
                firstName: '',
                lastName: '',
                email: user.email || '',
                birthDate: '',
                telephone: user.telephone || '',
                address: '',
                gender: 'm',
                agree1: false,
                agree2: false,
              }}
              validateOnChange
              validationSchema={schema}
              onSubmit={(values, e) => {
                updateUser(
                  {
                    ...values,
                    city,
                    imageUser: user.imageUser,
                  },
                  user._id,
                  language,
                );
              }}
            >
              {(formProps) => (
                <RegistrationForm
                  {...{
                    formProps,
                    language,
                    setupPreviousStep: this.setupPreviousStep,
                    setCity: (city) => this.setState({ city }),
                  }}
                />
              )}
            </Formik>
          </div>
        )}
      </div>
    );
  }

  isValidMail = (mail) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  runTimer = () => {
    this.setState({ timerNum: this.state.timerNum - 1 });
  };

  // activateLogin = () => {
  //   this.setState({ loginStep: !this.state.loginStep })
  // }

  sendNumber = () => {
    const { sendNumber, language } = this.props;
    const { phone } = this.state;

    clearInterval(interval);

    sendNumber({ phone: `+${phone}`, lang: language });

    this.setState(
      {
        timerNum: 60, timerOff: false, code: '', activeSender: 'phone',
      },
      function () {
        interval = setInterval(() => {
          this.runTimer();
          if (this.state.timerNum === 0) {
            this.setState({ timerNum: 0, timerOff: true });
            clearInterval(interval);
          }
        }, 1000);
      },
    );
  };

  sendMail = () => {
    const { sendMail, language } = this.props;
    const { mail } = this.state;

    sendMail({ email: mail, lang: language });

    clearInterval(interval);

    this.setState(
      {
        timerNum: 60, timerOff: false, code: '', activeSender: 'mail',
      },
      function () {
        interval = setInterval(() => {
          this.runTimer();
          if (this.state.timerNum === 0) {
            this.setState({ timerNum: 0, timerOff: true });
            clearInterval(interval);
          }
        }, 1000);
      },
    );
  };

  setupPreviousStep = () => {
    const { setupPreviousStep } = this.props;
    const { activeSender } = this.state;

    activeSender === 'mail'
      ? this.setState({ active_phone: false, active_email: true })
      : this.setState({ active_phone: true, active_email: false });

    setupPreviousStep();
  };

  handleChangeCode = (code) => {
    const { hideErrorCode } = this.props;

    hideErrorCode();

    this.setState({ code });
  };

  checkCode = () => {
    const { checkCode, language } = this.props;
    const {
      code, activeSender, mail, phone,
    } = this.state;
    const { callback } = this.props;
    if (activeSender === 'phone') {
      checkCode({ code, lang: language, phone: `+${phone}` });
    } else {
      checkCode({ code, lang: language, mail });
    }
    callback && callback();
    dataLayer.push({ event: 'login-success' });
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  isLogging: state.auth.isLogging,
  isSendingPhone: state.userReducer.isSendingPhone,
  isSentCheckingCode: state.userReducer.isSentCheckingCode,
  wrongCode: state.userReducer.wrongCode,
  mobileStep: state.userReducer.mobileStep,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      loginUser,
      sendNumber,
      sendMail,
      setupPreviousStep,
      checkCode,
      hideErrorCode,
      updateUser,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginMobileContainer);
