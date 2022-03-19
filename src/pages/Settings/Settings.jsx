import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Row } from 'react-bootstrap';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { isValidNumber } from 'libphonenumber-js';
import { bindActionCreators } from 'redux';
import SidebarAccount from '../../_components/SidebarAccount';
import TranslationContainer from '../../_components/TranslationContainer';
import SettingsForm from '../../_forms/SettingsForm';
import { TRANSLATIONS } from '../../_constants';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import { updateUser } from '../../_actions';

class Settings extends PureComponent {
  state = {
    options: ['once_a_day', 'once_a_week', 'once_a_month'],
  };

  static getDerivedStateFromProps(props, state) {
    if (props.language !== state.language) {
      return {
        language: props.language,
      };
    }

    return null;
  }

  render() {
    const { options } = this.state;
    const { language, user, updateUser } = this.props;

    const schema = object().shape({
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
    });
    const resize = window.innerWidth <= 428;
    return (
      <div className="account Favourite-Categories ">
        <BreadCrumb
          title={resize ? '' : 'account'}
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'account',
              status: 'parent',
              url: '/profile',
            },
            {
              title: 'settings',
              status: 'current',
            },
          ]}
        />
        <div className="Favourite-Categories__Row">
          <div className="Favourite-Categories__Row-Sidebar">
            <SidebarAccount />
          </div>
          <div className="col-xl-9 col-lg-8 col-md-12">
            <div className="text-uppercase">
              <h2>
                <TranslationContainer translationKey="account_settings" />
              </h2>
            </div>
            <div className="text-uppercase mt-6">
              <h3>
                <TranslationContainer translationKey="notifications" />
              </h3>
            </div>
            <div className="text-uppercase mt-5 row">
              <Formik
                initialValues={{
                  emailExist: !!user.email,
                  email: user.email,
                  phoneExist: !!user.telephone,
                  telephone: user.telephone,
                  isEmailNotification: user.values?.isEmailNotification,
                  isSmsNotification: user.values?.isSmsNotification,
                  isEmailHot: user.values?.isEmailHot,
                  isEmailSystem: user.values?.isEmailSystem,
                  isSmsHot: user.values?.isSmsHot,
                  isSmsSystem: user.values?.isSmsSystem,
                  durationEmail: user.values?.durationEmail || options[0],
                  durationSms: user.values?.durationSms || options[0],
                }}
                validateOnChange
                validationSchema={schema}
                onSubmit={(values) => {
                  console.log('values', values);
                  updateUser({ ...user, values }, user._id, language);
                }}
              >
                {(formProps) => <SettingsForm {...{ formProps, language, options }} />}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
  }

  changeSetting = (k, value) => {
    this.setState({ [k]: value });
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateUser }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
