import React, { PureComponent } from 'react';
import connect from 'react-redux/es/connect/connect';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import Geocode from 'react-geocode';
import { ThresholdUnits } from 'react-infinite-scroll-component';
import { alertsConstants, TRANSLATIONS } from '../../_constants';
import { getCurrentPosition, getLocation } from '../../_helpers/currentPosition';
import LocationConfirmModal from '../../_modals/LocationConfirmModal';

const geoSettings = {
  enableHighAccuracy: true,
};

class Autocomplete extends PureComponent {
  constructor(props) {
    Geocode.setApiKey(
      `AIzaSyBL_PjXFSNBZTLvWit_3yTYfXLLTYJ6pQc&language=${props.language}`,
    );
    super(props);
    this.state = {
      addressFrom: '', address: '', isOpen: false, geoStatus: '',
    };
  }

  componentDidMount() {
    if (this.props.isNearbyMobile) {
      this.handleCheckGeoPermissions();

      return;
    }

    getLocation(this.props.dispatch);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.addressFrom !== state.addressFrom) {
      return {
        address: props.addressFrom,
        addressFrom: props.addressFrom,
      };
    }

    return null;
  }

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.props.onLocationChange(latLng);
        this.setState({ address });
      })
      .catch((error) => console.error('Error', error));
  };

  handleGeocode = ({ coords: { latitude, longitude } }) => {
    Geocode.fromLatLng(latitude, longitude).then(
      (response) => {
        const address = response.results[0].formatted_address;

        this.setState({
          address,
        });

        this.props.getCurrentPosition(address, latitude, longitude);
      },
      (error) => {
        this.props.dispatch({ type: alertsConstants.LOCATION, error });
      },
    );
  };

  handleCheckGeoPermissions = () => {
    navigator.permissions.query({ name: 'geolocation' }).then((result) => {
      if (result.state === 'granted') {
        navigator.geolocation.getCurrentPosition(this.handleGeocode, this.handleErrorGeoPosition, geoSettings);
      } else if (result.state === 'prompt') {
        navigator.geolocation.getCurrentPosition(this.handleGeocode, this.handleErrorGeoPosition, geoSettings);
        this.setState({ isOpen: true, geoStatus: 'prompt' });
      } else if (result.state === 'denied') {
        this.setState({ isOpen: true, geoStatus: 'denied' });
      }
    });
  };

  handleErrorGeoPosition = (error) => {
    // !TODO: Create hadle error
    console.log(error);
  };

  handleCloseModal = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const {
      language, coordsDefault, location, coords,
    } = this.props;

    return (
      <>
        <PlacesAutocomplete
          value={this.state.address || ''}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => (
            <div>
              <div className="loc" />
              <input
                {...getInputProps({
                  placeholder: TRANSLATIONS[language].error_auto_complete,
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {/* {loading && <div>Loading...</div>} */}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                  return (
                    <div
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
              {coordsDefault && coords && (
              <div
                role="button"
                className={
                  `geo ${
                    coordsDefault.lng !== coords.lng
                      ? ' geo-no'
                      : ''
                  }${location !== 'ok' && ' geo-disabled'}`
                }
                onClick={() => location === 'ok' && this.handleCheckGeoPermissions()}
              >
                <img alt="geo" src={`../../assets/images/geo.svg`} />
              </div>
              )}
            </div>
          )}
        </PlacesAutocomplete>

        <LocationConfirmModal
          language={this.props.language}
          geoStatus={this.state.geoStatus}
          isOpen={this.state.isOpen}
          onClose={this.handleCloseModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  location: state.alertsReducer.location,
});

export default connect(mapStateToProps)(Autocomplete);
