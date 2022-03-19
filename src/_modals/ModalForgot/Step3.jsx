import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import connect from 'react-redux/es/connect/connect';
import checkCode from './checkCode';
import { TRANSLATIONS } from '../../_constants';
import passwordRecovery from './passwordRecovery';
import TranslationContainer from '../../_components/TranslationContainer';

class Step1 extends React.Component {
  render() {
    const { isSentNewPassword, sendNewPassword, language } = this.props;

    const schema = object().shape({
      password: string()
        .required(TRANSLATIONS[language].pass_required)
        .min(8, TRANSLATIONS[language].pass_short)
        .matches(/[a-zA-Z]/, TRANSLATIONS[language].pass_contain),
    });

    return (
      <div className="col-12 block">
        {isSentNewPassword && (
        <div className="loading_form">
          <img src={`../assets/images/loading.svg`} />
        </div>
        )}
        <h2 className="text-uppercase text-center "><TranslationContainer translationKey="create_password" /></h2>
        <div className="mt-2 ml-3 mr-3 text-center"><p><TranslationContainer translationKey="unique_password" /></p></div>
        <div className="mt-6">
          <Formik
            component={passwordRecovery}
            initialValues={{
              password: '',
            }}

            validationSchema={schema}
            onSubmit={(values, { setErrors }) => {
              sendNewPassword(values);
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(Step1);
