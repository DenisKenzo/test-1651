import React from 'react';
import { Formik } from 'formik';
import { object, string } from 'yup';
import connect from 'react-redux/es/connect/connect';
import checkCode from './checkCode';
import { TRANSLATIONS } from '../../_constants';
import passwordRecovery from './passwordRecovery';
import TranslationContainer from '../../_components/TranslationContainer';

class Step4 extends React.Component {
  render() {
    const { openLogin } = this.props;

    return (
      <div className="col-12 block">
        <div className="d-flex justify-content-center mb-8">
          <img className="img-success" src={`../assets/images/success.svg`} />
        </div>
        <h2 className="text-uppercase text-center "><TranslationContainer translationKey="all_set" /></h2>
        <div className="mt-2 ml-3 mr-3 text-center"><p><TranslationContainer translationKey="can_login" /></p></div>
        <div className="mt-8 ml-3 mr-3">
          <button
            type="submit"
            className="btn btn-primary btn-lg wid-100"
            onClick={() => openLogin()}
          >
            <TranslationContainer translationKey="login" />
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(Step4);
