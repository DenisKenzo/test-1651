import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import connect from 'react-redux/es/connect/connect';
import CheckCode from './CheckCode';
import TranslationContainer from '../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../_constants';

class Step1 extends React.Component {
  render() {
    const {
      isSentCheckingCode, isSentRecoveryCode, checkCodeFunction, setupStep, resend, language,
    } = this.props;

    const schema = object().shape({
      code: string()
        .required(TRANSLATIONS[language].digits_6)
        .min(6),
    });

    return (
      <div className="col-12 block">
        {isSentCheckingCode && (
        <div className="loading_form">
          <img src={`../assets/images/loading.svg`} />
        </div>
        )}
        {isSentRecoveryCode && (
        <div className="loading_form">
          <img src={`../assets/images/loading.svg`} />
        </div>
        )}
        <h2 className="text-uppercase text-center "><TranslationContainer translationKey="your_code" /></h2>
        <div className="mt-2 text-center"><p><TranslationContainer translationKey="security_code_example" /></p></div>
        <div className="mt-6">
          <Formik
            render={(formikProps) => (
              <CheckCode
                {...formikProps}
                resend={resend}
              />
            )}
            initialValues={{
              code: '',
            }}

            validationSchema={schema}
            onSubmit={(values, { setErrors }) => {
              checkCodeFunction(values);
            }}
          />
        </div>
        <div className="text-center text-uppercase another_way">
          <span onClick={() => setupStep(1)}><p className="text-primary"><TranslationContainer translationKey="another_way" /></p></span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(Step1);
