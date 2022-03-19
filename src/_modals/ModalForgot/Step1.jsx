import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { TRANSLATIONS } from '../../_constants';
import { sendDataRecovery } from '../../_actions';
import forgotPassPhoneForm from './forgotPassPhoneForm';
import forgotPassEmailForm from './forgotPassEmailForm';
import TranslationContainer from '../../_components/TranslationContainer';

class Step1 extends React.Component {
  state = {
    active_email: true,
    active_phone: false,
  };

  render() {
    const { isSentRecoveryCode, sendRecovery, language } = this.props;
    const { active_email, active_phone } = this.state;

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const schema_email = object().shape({
      email: string().email(TRANSLATIONS[language].error_email_match).required(TRANSLATIONS[language].error_email),
    });

    const schema_phone = object().shape({
      phone: string()
        .required(TRANSLATIONS[language].error_phone)
        .matches(phoneRegExp, TRANSLATIONS[language].error_phone_match),
    });

    return (
      <div className="col-12 block">
        {isSentRecoveryCode && (
        <div className="loading_form">
          <img src={`../assets/images/loading.svg`} />
        </div>
        )}
        <h2 className="text-uppercase text-center "><TranslationContainer translationKey="reset_password" /></h2>
        <div className="mt-2 text-center"><p><TranslationContainer translationKey="question_reset_password" /></p></div>
        <div className="row mt-3 mb-6 mr-0 ml-0">
          <div className="col-md-6 col-sm-12">
            <div
              className={`block-type d-flex align-items-center ${active_phone ? 'active' : ''}`}
              onClick={() => this.setState({ active_phone: true, active_email: false })}
            >
              <div>
                <img src={`../assets/images/smartphone.svg`} />
              </div>
              <div>
                <div>
                  <p className="text-1"><TranslationContainer translationKey="via_sms" /></p>
                </div>
                <div>
                  <p className="text-2"><TranslationContainer translationKey="receive_text" /></p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div
              className={`block-type d-flex align-items-center ${active_email ? 'active' : ''}`}
              onClick={() => this.setState({ active_phone: false, active_email: true })}
            >
              <div>
                <img src={`../assets/images/mail.svg`} />
              </div>
              <div>
                <div>
                  <p className="text-1"><TranslationContainer translationKey="via_email" /></p>
                </div>
                <div>
                  <p className="text-2"><TranslationContainer translationKey="receive_email" /></p>
                </div>
              </div>
            </div>
          </div>

        </div>
        <Formik
          component={active_email ? forgotPassEmailForm : forgotPassPhoneForm}
          initialValues={active_email
            ? {
              email: '',
            }
            : {
              phone: '',
            }}

          validationSchema={active_email ? schema_email : schema_phone}
          onSubmit={(values, { setErrors }) => {
            active_email && sendRecovery({ type: 'email', data: values });
            active_phone && sendRecovery({ type: 'phone', data: values });
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(Step1);
