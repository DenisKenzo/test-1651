import React from 'react';
import { Form, Field } from 'formik';
import { Modal, Row } from 'react-bootstrap';
import moment from 'moment';
import { isValidNumber } from 'libphonenumber-js';
import ReactPhoneInput from 'react-phone-input-2';
import { Link } from 'react-router-dom';
import TranslationContainer from '../../_components/TranslationContainer';
import DateRange from '../../_helpers/DateRange';
import AutocompleteProfile from '../../_components/AutocompleteProfile';

class AddressForm extends React.Component {
  handleChange = (date, name) => {
    this.setState({
      [name]: date,
    });
  };

  resetErrors = (value) => {
    const { errors, setErrors } = this.props;

    delete errors[value];
    setErrors({ ...errors });
  };

  render() {
    const {
      values, errors, touched, handleSelect,
    } = this.props;

    return (
      <Form
        className="form profile-form row mb-0 text-initial"
        autocomplete="off"
      >
        <div className="col-sm-12">
          <label htmlFor="street">
            <AutocompleteProfile
              handleSelect={handleSelect}
              resetErrors={this.resetErrors}
              validate={this.props.setFieldError}
              onLocationChange={this.handleLocationInput}
              errorClass={
                touched.address && errors.address ? 'error_input' : ''
              }
              address={this.props.values.address}
              onChange={this.props.setFieldValue}
              onBlurChange={this.props.setFieldTouched}
            />
            {touched.address && errors.address && (
              <div className="error">
                <p className="error-msg">{errors.address}</p>
              </div>
            )}
          </label>
        </div>

        <div className="col-sm-12 mt-3">
          <button
            type="submit"
            className="btn btn-primary btn-lg wid-100"
            disabled={!values.address}
          >
            <TranslationContainer translationKey="set_address" />
          </button>
        </div>
      </Form>
    );
  }
}

export default AddressForm;
