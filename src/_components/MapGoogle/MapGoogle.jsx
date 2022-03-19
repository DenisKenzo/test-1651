import React, { PureComponent } from 'react';
import { withGoogleMap, GoogleMap, InfoWindow } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import connect from 'react-redux/es/connect/connect';

import { mapJson } from '../../_constants/mapJson';

import './MapGoogle.scss';
import TranslationContainer from '../TranslationContainer';

class MapGoogle extends PureComponent {
  state = {
    infobox: null,
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.markersNearby !== this.props.markersNearby) {
      this.onMapClick();
    }
  }

  onMarkerClick = (event, item, i) => {
    const { onHideBtn } = this.props;
    if (this.state.infobox) {
      this.setState({ infobox: null }, () => this.setState({
        lat: item.coordinates[0],
        lng: item.coordinates[1],
        infobox: i,
      }));
      onHideBtn();
    } else {
      this.setState({
        lat: item.coordinates[0],
        lng: item.coordinates[1],
        infobox: i,
      });
      onHideBtn();
    }
  };

  onMapClick = () => {
    const { onVisibleBtn } = this.props;

    this.setState({ infobox: null });
    onVisibleBtn();
  };

  render() {
    const { infobox, lat, lng } = this.state;
    const {
      defaultCoord,
      language,
      markersNearby,
      markers,
    } = this.props;
    let coords = {
      lat: 32.1,
      lng: 34.85,
    };
    if (defaultCoord && defaultCoord.lat && defaultCoord.lng) {
      coords = { ...defaultCoord };
    }

    const mobile = window.innerWidth <= 428;

    return (
      <GoogleMap
        ref={(ref) => {
          this.map = ref;
        }}
        defaultClickableIcons={false}
        zoom={
          this.props.radius
            ? Math.log(40000 / (this.props.radius / 2)) / Math.log(2)
            : 10
        }
        defaultCenter={lat && lng ? { lat, lng } : coords}
        center={lat && lng ? { lat, lng } : coords}
        defaultOptions={{
          mapTypeControl: false,
          streetViewControl: false,
          styles: this.props.styleProp ? mapJson : '',
        }}
        onClick={this.onMapClick}
      >
        {markers?.map((item, i) => (
          <MarkerWithLabel
            key={`props_markers_${i}`}
            position={item}
            labelAnchor={new google.maps.Point(59, 50)}
            labelStyle={{ height: '58px', width: '118px' }}
          >
            <div className="marker-block">
              <div className="marker-contact" />
              <div className="marker-block-img">
                <img
                  alt="logo"
                  style={{ width: '100%' }}
                  src={`../assets/images/logo.svg`}
                />
              </div>
            </div>
          </MarkerWithLabel>
        ))}

        {markersNearby && defaultCoord && (
          <MarkerWithLabel
            position={coords}
            labelAnchor={new google.maps.Point(125, 125)}
            labelStyle={{ height: 250, width: 250 }}
            labelClass="marker-labelPin"
            icon="false"
          >
            <div className="pulse_block" />
          </MarkerWithLabel>
        )}

        {infobox !== null && !!markersNearby[infobox] && (
          <InfoWindow
            anchor={new google.maps.Point(0, 300)}
            defaultPosition={new google.maps.LatLng(lat, lng)}
            options={{
              closeBoxURL: '',
            }}
            onCloseClick={() => this.onMapClick()}
          >
            <div className="nearby-infobox Nearby-Infobox">
              <div className="Nearby-Infobox__Row">
                <div className="Nearby-Infobox__Row-Header">
                  <div className="Logo">
                    {markersNearby[infobox].companyPicture && (
                      <img
                        alt="company"
                        src={
                          `${process.env.REACT_APP_URL_IMG}${
                            markersNearby[infobox].companyPicture}`
                        }
                      />
                    )}
                  </div>
                  <div className="Name-Company">
                    <a
                      href={
                        `/${
                          language
                        }/company/${
                          markersNearby[infobox].companyID}`
                      }
                    >
                      <p className="text-uppercase text-primary font-weight-bold">
                        {markersNearby[infobox].companyName}
                      </p>
                    </a>
                    <div className="Name-Company__Details">
                      <div className="Distance">
                        {Math.ceil(markersNearby[infobox].dist)}
                        {' '}
                        km
                      </div>
                      <div className="Naming">
                        {markersNearby[infobox].name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="Nearby-Infobox__Row-Address">
                  <div className="Address-Item">
                    <img
                      alt="new-phone"
                      src={`../assets/images/new-phone.svg`}
                    />
                    {mobile ? (
                      <a
                        className="Address-Item"
                        href={`tel:${markersNearby[infobox].telephone}`}
                      >
                        <p>{markersNearby[infobox].telephone}</p>
                      </a>
                    ) : (
                      <p>{markersNearby[infobox].telephone}</p>
                    )}
                  </div>

                  <div className="Address-Item">
                    <img
                      alt="location-outline"
                      src={`../assets/images/location-outline.svg`}
                    />

                    {/* <a href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes` } target="_blank"> */}
                    {/* <a href={userAgent ? `geo:0,0?q=${lat},${lng}` : `https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes` } target="_blank"> */}
                    {/* <a href={`https://maps.google.com?q=${lat},${lng}` } target="_blank"> */}
                    {/* <a href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes` } target="_blank"> */}
                    <p>
                      <span className="font-weight-bold">
                        {markersNearby[infobox].city}
                        {' '}
                        ,
                        {' '}
                      </span>
                      {markersNearby[infobox].adress}
                    </p>
                  </div>
                </div>
                {mobile && (
                  <div className="Nearby-Infobox__Row-Navigation">
                    <a
                      className="Navigation-Item"
                      href={`https://maps.google.com?q=${lat},${lng}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`../assets/images/google-icon-nearBy.svg`}
                        alt="nav-icon"
                      />
                      <div className="Navigation-Item__Details">
                        <span>
                          <TranslationContainer translationKey="open_with" />
                        </span>
                        <div className="Details-Name">Google Maps</div>
                      </div>
                    </a>
                    <a
                      className="Navigation-Item"
                      href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={`../assets/images/waze-icon-nearBy.svg`}
                        alt="nav-icon"
                      />
                      <div className="Navigation-Item__Details">
                        <span>
                          <TranslationContainer translationKey="open_with" />
                        </span>
                        <div className="Details-Name">Waze</div>
                      </div>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </InfoWindow>
        )}

        {markersNearby?.map((item, i) => (
          <div key={`markers_nearby_${i}`}>
            <MarkerWithLabel
              position={{
                lat: item.coordinates[0],
                lng: item.coordinates[1],
              }}
              labelAnchor={new google.maps.Point(32, 65)}
              labelStyle={{ height: '73px', width: '64px' }}
              labelClass="offer"
              icon="false"
              onClick={(event) => this.onMarkerClick(event, item, i)}
            >
              <div className="marker-block-nearby">
                <div className="marker-contact-nearby" />
                <div className="marker-block">
                  <p>{item.couponsCount}</p>
                </div>
              </div>
            </MarkerWithLabel>
          </div>
        ))}
      </GoogleMap>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  coupons: state.couponReducer.coupons,
  status: state.applicationsReducer.status,
});

export default withGoogleMap(connect(mapStateToProps)(MapGoogle));
