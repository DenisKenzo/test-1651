import React from 'react';
import { Form, Field } from 'formik';
import { Row } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../../_components/TranslationContainer';
import { TRANSLATIONS } from '../../../_constants';

class passwordRecovery extends React.Component {
  state = {
    show_pass: false,
  };

  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  render() {
    const { errors, touched, language } = this.props;
    const { show_pass } = this.state;

    return (
      <Form className="form login-form">
        <Row>
          <div className="col-md-12">

            <label htmlFor="password">
              <span className={touched.password && errors.password ? 'error_input_text' : ''}>
                <TranslationContainer translationKey="create_password" />
              </span>
              <Field
                className={touched.password && errors.password ? 'error_input' : ''}
                type={!show_pass ? 'password' : 'text'}
                name="password"
                placeholder={TRANSLATIONS[language].new_pass}
              />
              <span className={`show_pass ${show_pass ? 'active' : ''}`} onClick={() => this.setState({ show_pass: !show_pass })}>
                <img src={`../assets/images/eye.svg`} />
              </span>
              {touched.password && errors.password && <div className="error"><p className="error-msg">{errors.password}</p></div>}
            </label>
          </div>

          <div className="col-md-12 mt-6">
            <button
              type="submit"
              className="btn btn-primary btn-lg wid-100"
              disabled={Object.keys(errors).length > 0}
            >
              <TranslationContainer translationKey="reset_my_password" />
            </button>
          </div>

        </Row>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(passwordRecovery);
