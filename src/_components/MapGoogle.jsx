import React, { PureComponent } from 'react';
import { withGoogleMap, GoogleMap, InfoWindow } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
// import {InfoBox} from 'react-google-maps/lib/components/addons/InfoBox';
import connect from 'react-redux/es/connect/connect';
import { mapJson } from '../_constants/mapJson';

class MapGoogle extends PureComponent {
  state = {
    infobox: null,
  };

  onMarkerClick = (event, item, i) => {
    if (this.state.infobox) {
      this.setState({ infobox: null }, () => this.setState({
        lat: item.coordinates[0],
        lng: item.coordinates[1],
        infobox: i,
      }));
    } else {
      this.setState({
        lat: item.coordinates[0],
        lng: item.coordinates[1],
        infobox: i,
      });
    }
  };

  onMapClick = () => {
    this.setState({ infobox: null });
  };

  render() {
    const { infobox, lat, lng } = this.state;
    const {
      defaultCoord,
      language,
      coupons,
      markersNearby,
      status,
      markers,
    } = this.props;
    let coords = {
      lat: 32.1,
      lng: 34.85,
    };
    if (defaultCoord && defaultCoord.lat && defaultCoord.lng) {
      coords = { ...defaultCoord };
    }

    const userAgent = status === 'mobile';

    return (
      <GoogleMap
        ref={(ref) => {
          this.map = ref;
        }}
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
        {markers
          && markers.map((item, i) => (
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
            labelClass="offer"
            icon="false"
          >
            <div className="pulse_block" />
          </MarkerWithLabel>
        )}
        {infobox !== null && (
          <InfoWindow
            anchor={new google.maps.Point(0, 300)}
            // labelStyle={{height: 219, width: 350}}
            defaultPosition={new google.maps.LatLng(lat, lng)}
            options={{
              // pane: 'mapPane',
              // pixelOffset: new window.google.maps.Point(150, 0),
              boxStyle: {
                height: '219px',
                width: '350px',
              },
              closeBoxURL: '',
            }}
            onCloseClick={() => this.onMapClick()}
          >
            <div className="nearby-infobox ">
              <div className="infobox-logo-nearby">
                {this.props.markersNearby[infobox].companyPicture && (
                  <img
                    src={
                      `${process.env.REACT_APP_URL_IMG}${
                        this.props.markersNearby[infobox].companyPicture}`
                    }
                  />
                )}
              </div>
              <div className="infobox-title-nearby">
                <a
                  href={
                    `/${
                      language
                    }/company/${
                      this.props.markersNearby[infobox].companyID}`
                  }
                >
                  <p className="text-uppercase text-primary font-weight-bold">
                    {this.props.markersNearby[infobox].companyName}
                  </p>
                </a>
              </div>
              <div className="text-initial mr-3 mb-1">
                <div className="dir-ltr wid-content">
                  <p className="text-uppercase text-secondary dir-ltr">
                    {Math.ceil(this.props.markersNearby[infobox].dist)}
                    {' '}
                    km
                  </p>
                </div>
              </div>
              <div className="text-initial mr-3 mb-1">
                <a>
                  <p className="text-uppercase text-secondary">
                    {this.props.markersNearby[infobox].name}
                  </p>
                </a>
              </div>
              <div className="line" />
              <div className="infobox-text-nearby">
                <div>
                  <img src={`../assets/images/phone.svg`} />
                </div>
                <div className="dir-ltr">
                  <p className="mr-3 ml-3">
                    {this.props.markersNearby[infobox].telephone}
                  </p>
                </div>
              </div>
              <div className="infobox-text-nearby">
                <div>
                  <img
                    src={`../assets/images/location-orange.svg`}
                  />
                </div>
                <div>
                  <a
                    href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {/* <a href={`https://maps.google.com?q=${lat},${lng}` } target="_blank"> */}
                    {/* <a href={`https://www.waze.com/ul?ll=${lat}%2C${lng}&navigate=yes` } target="_blank"> */}
                    <p className="mr-3 ml-3">
                      <span className="font-weight-bold">
                        {markersNearby[infobox].city}
                        ,
                        {' '}
                      </span>
                      {markersNearby[infobox].adress}
                    </p>
                  </a>
                </div>
              </div>
            </div>
          </InfoWindow>
        )}
        {markersNearby
          && markersNearby.map((item, i) => (
            <div key={`markers_nearby_${i}`}>
              <MarkerWithLabel
                position={{
                  lat: item.coordinates[0],
                  lng: item.coordinates[1],
                }}
                labelAnchor={new google.maps.Point(32, 65)}
                labelStyle={{ height: '73px', width: '64px', zIndex: 100 }}
                onClick={(event) => this.onMarkerClick(event, item, i)}
                style={{ 'z-index': '100!important' }}
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
  // user: state.auth.user,
  language: state.mainReducer.locale,
  coupons: state.couponReducer.coupons,
  status: state.applicationsReducer.status,
});

export default withGoogleMap(connect(mapStateToProps)(MapGoogle));
