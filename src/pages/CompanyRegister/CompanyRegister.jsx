import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import { Formik } from 'formik';
import { object, string } from 'yup';
import { bindActionCreators } from 'redux';
import { isValidNumber } from 'libphonenumber-js';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import { TRANSLATIONS } from '../../_constants';
import CompanyForm from '../../_forms/CompanyForm';
import { closeSuccessWindow, registerCompany } from '../../_actions';
import SuccessBlock from '../../_components/SuccessBlock';
import { userService } from '../../_services/user.service';
import './CompanyRegister.scss';

class CompanyRegister extends PureComponent {
  state = {
    aboutTxt: null,
  };

  componentDidMount() {
    try {
      this.getAboutTxt();
    } catch (e) {
      console.log('error getting content', e);
    }
  }

  getAboutTxt = async () => {
    const { language } = this.props;

    const result = await userService.registrationLikeProviderContent();
    const data = result[0].fields;

    // const aboutTitle = data[1][language][0].title;
    const aboutTxt = data[1][language][0].freeText;

    this.setState({ aboutTxt });
  };

  render() {
    const {
      language,
      registerCompany,
      isSentRequestToRegisterCompany,
      sentRequestToRegisterCompany,
      closeSuccessWindow,
    } = this.props;
    const { aboutTxt } = this.state;

    // TODO: Need in the future
    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const schema = object().shape({
      telephone: string()
        .required(TRANSLATIONS[language].error_phone)
        .test(
          'telephone',
          TRANSLATIONS[language].error_phone_match,
          (value) => value && isValidNumber(`+${value.replace('+', '')}`),
        ),
      fullName: string().required(TRANSLATIONS[language].error_full_name),
      companyName: string().required(
        TRANSLATIONS[language].error_company_name,
      ),
      email: string()
        .email(TRANSLATIONS[language].error_email_match)
        .required(TRANSLATIONS[language].error_email),
    });

    return (
      <div className="pageContainer registerCompany">
        <BreadCrumb
          title="menu_9"
          json={[
            {
              title: 'home',
              status: 'parent',
              url: '/',
            },
            {
              title: 'menu_9',
              status: 'current',
            },
          ]}
        />
        <div className="row">
          <div className="col-xl-6 col-lg-4 col-sm-12">
            <div
              className="dangerous_p"
              dangerouslySetInnerHTML={{ __html: aboutTxt }}
            />
          </div>
          <div className="col-xl-6 col-lg-8 col-sm-12">
            {isSentRequestToRegisterCompany && (
              <div className="loading_form">
                <img alt="loading_form" src={`../assets/images/loading.svg`} />
              </div>
            )}
            {!sentRequestToRegisterCompany ? (
              <Formik
                component={CompanyForm}
                initialValues={{
                  fullName: '',
                  companyName: '',
                  email: '',
                  telephone: '',
                  lang: `${language}`,
                }}
                validateOnChange
                validateOnBlur
                validationSchema={schema}
                onSubmit={(values, { setErrors }) => {
                  registerCompany(values);
                }}
              />
            ) : (
              <SuccessBlock successFunction={closeSuccessWindow} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  sentRequestToRegisterCompany: state.userReducer.sentRequestToRegisterCompany,
  isSentRequestToRegisterCompany:
    state.userReducer.isSentRequestToRegisterCompany,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ registerCompany, closeSuccessWindow }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyRegister);
