import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { isValidNumber } from 'libphonenumber-js';
import ReactPhoneInput from 'react-phone-input-2';

class PhoneField extends Component {
  validate() {
    if (this.state.address !== '') {
      geocodeByAddress(this.state.address)
        .then((results) => getLatLng(results[0]))
        .catch((error) => this.props.validate('address', 'Your address is incorrect!'));
    }
  }

  render() {
    return (
      <ReactPhoneInput
        onlyCountries={['il', 'ua', 'ru']}
        inputClass={(this.props.phone && !isValidNumber(`+${this.props.phone}`) ? ' error_input' : '')}
        country="il"
        name="telephone"
        countryCodeEditable={false}
        onChange={(phone) => this.props.onChange(phone.replace(/[() ]/g, ''))}
        onBlur={() => this.validate()}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(PhoneField);
