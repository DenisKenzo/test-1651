import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from 'react-geocode';
import { getCurrentPosition, getLocation } from '../../_helpers/currentPosition';
import { alertsConstants } from '../../_constants';

class AutocompleteProfile extends Component {
  constructor(props) {
    Geocode.setApiKey(
      `AIzaSyBL_PjXFSNBZTLvWit_3yTYfXLLTYJ6pQc&language=${props.language}`,
    );
    Geocode.enableDebug();
    super(props);
    this.state = {
      address: this.props.address ? this.props.address : '',
    };
  }

  componentDidMount() {
    const isMobile = (innerHeight > innerWidth && innerWidth <= 428)
        || (innerHeight < innerWidth && innerWidth <= 926);

    if (isMobile) {
      this.props.status === 'mobile'
        && window.ReactNativeWebView.postMessage('hasGeolocationPermission');
    } else {
      getLocation(this.props.dispatch);
    }
  }

  handleGeocode = ({ lat, lng }) => Geocode.fromLatLng(lat, lng).then(
    (response) => {
      const address = response.results[0].formatted_address;
      const additionalAddress = response.results[0].address_components;
      // .filter( el => el.types === 'locality')
      // this.props.resetErrors('address')
      this.props.onChange('address', address);
      this.setState({
        address,
        coordsDefault: { lat, lng },
        coords: { lat, lng },
      });
    },
    (error) => {
      // this.props.validate('address', 'You have problem with your geolocation')
      console.error('error in geocode ->', error);
      this.props.dispatch({ type: alertsConstants.LOCATION, error });
    },
  );

  getCurrentPosition = () => {
    getCurrentPosition(this.handleGeocode);
  };

  handleChange = (address) => {
    this.setState({ address }, () => {
      this.props.onChange('address', address);
      this.props.onBlurChange('address');
    });
  };

  onError = (status, clearSuggestions) => {
    clearSuggestions();
  };

  validate() {
    if (this.state.address !== '') {
      geocodeByAddress(this.state.address)
        .then((results) => getLatLng(results[0]))
        .catch((error) => this.props.validate('address', 'Your address is incorrect!'));
    }
  }

  render() {
    const { coordsDefault, coords, address } = this.state;
    const { handleSelect, errorClass, language } = this.props;
    const english = language === 'en';
    return (
      <PlacesAutocomplete
        value={address}
        onChange={this.handleChange}
        onBlur={this.validate}
        onSelect={handleSelect && handleSelect(address)}
      >
        {({
          getInputProps, suggestions, getSuggestionItemProps, loading,
        }) => (
          <div className="AutocompleteProfile">
            <input
              name="address"
              {...getInputProps({
                onBlur: () => this.validate(),
                autoComplete: 'f',
                className: `location-search-input ${errorClass}`,
              })}
            />
            <div className="autocomplete-dropdown-container">
              {suggestions.map((suggestion) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    key={suggestion.index}
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
            <div
              className={
                  english
                    ? `geoEN ${
                      !coordsDefault || coordsDefault.lng !== coords.lng
                        ? ' geoEN-no'
                        : ''
                    }${this.props.location !== 'ok' && ' geo-disabled'}`
                    : `geo ${
                      !coordsDefault || coordsDefault.lng !== coords.lng
                        ? ' geo-no'
                        : ''
                    }${this.props.location !== 'ok' && ' geo-disabled'}`
                }
              onClick={() => this.props.location === 'ok' && this.getCurrentPosition()}
            >
              <img src={`../../assets/images/geo.svg`} />
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  location: state.alertsReducer.location,
  status: state.applicationsReducer.status,
});

export default connect(mapStateToProps)(AutocompleteProfile);
