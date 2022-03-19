import React, { Component } from 'react';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import InputRange from 'react-input-range-rtl';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import BreadCrumb from '../../_components/BreadCrumb/BreadCrumb';
import { getBranchesForMap, getCoupons } from '../../_actions';
import ContainerCoupons from '../../_components/ContainerCoupons';
import MapGoogle from '../../_components/MapGoogle/MapGoogle';
import Autocomplete from '../../_components/Autocomplete';
import TranslationContainer from '../../_components/TranslationContainer';
import 'react-input-range/lib/css/index.css';
import AddressModal from '../../_modals/AddressModal';
import withGoogleMapApi from '../../_components/withGoogleMapApi';
import { TRANSLATIONS } from '../../_constants';

import './NearBy.scss';

class NearBy extends Component {
  state = {
    userDetails: this.props.user && this.props.user,
    map: true,
    geo: false,
    coords: {},
    radius: 50,
    address: '',
    noaddress: true,
    hideButtons: null,
  };

  componentDidMount() {
    setTimeout(() => window.scrollTo(0, 0), 300);

    if (this.state.userDetails?.address) {
      this.setState(() => ({
        noaddress: false,
      }));
    }
  }

  componentDidUpdate(prevProps) {
    if (
      !this.state.geo
      && !this.state.noaddress
      && this.props.googleMapScriptLoaded
    ) {
      this.handleGeocode(this.state.userDetails?.address);
    }
  }

  activateNearby = (details) => {
    this.setState(() => ({
      noaddress: false,
      userDetails: details,
    }));
  };

  handleGeocode = (address, latitude, longitude) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState(
          (prevState) => ({
            ...prevState,
            geo: true,
            address,
            coordsDefault: latitude ? { lat: latitude, lng: longitude } : latLng,
            coords: latitude ? { lat: latitude, lng: longitude } : latLng,
          }),
          () => {
            this.handleCoupons();
            this.handleBranches();
          },
        );
      })
      .catch((error) => console.error('Error', error));
  };

  handleCoupons = ({ page } = {}) => {
    sessionStorage.removeItem('filterID');
    this.props.getCoupons({
      page,
      coordinates: this.state.coords,
      userToken: this.props.user.remember_token,
      radius: this.state.radius,
    }, 0);
  };

  handleBranches = (coords = this.state.coords, radius = this.state.radius) => {
    const { getBranchesForMap } = this.props;

    getBranchesForMap({
      coordinates: coords,
      radius,
    });
  };

  onHideBtn = () => {
    this.setState({ hideButtons: true });
  };

  onVisibleBtn = () => {
    this.setState({ hideButtons: false });
  };

  handleLocationInput = (latLng) => {
    this.setState({ coords: latLng }, () => {
      this.handleCoupons();
      this.handleBranches();
    });
  };

  onRadiusChangeFinished = (radius) => {
    this.setState({ radius }, () => {
      this.handleCoupons();
      this.handleBranches();
    });
  };

  onRadiusChange = (radius) => {
    this.setState({ radius });
  };

  getCurrentPosition = (address, latitude, longitude) => {
    this.handleGeocode(address, latitude, longitude);
  };

  backHistory = () => {
    this.props.history.goBack();
  };

  switchMap() {
    const { map } = this.state;

    this.setState({ map: !map });
  }

  render() {
    const {
      map,
      coords,
      radius,
      geo,
      coordsDefault,
      address,
      loadingHotCoupons,
      noaddress,
    } = this.state;

    const { coupons, branchesForMap, language } = this.props;
    const rangeKm = TRANSLATIONS[language].labelRangeKm;

    const isMobile = (window.innerHeight > window.innerWidth && window.innerWidth <= 500);

    return (
      this.props.googleMapScriptLoaded && (
        <div className={`Nearby ${map ? '' : 'NearFull'}`}>
          {!noaddress ? (
            <div className="row">
              <div className={map ? 'col-xl-6 col-lg-7' : 'col-lg-12'}>
                <div className="Nearby-Breadcrumb">
                  <BreadCrumb
                    title="menu_3"
                    json={[
                      {
                        title: 'home',
                        status: 'parent',
                        url: '/',
                      },
                      {
                        title: 'menu_3',
                        status: 'current',
                      },
                    ]}
                  />
                  <div className="Content">
                    <TranslationContainer translationKey="nearby_additional_text" />
                  </div>
                </div>

                <div className="row mb-4 desktop-buttons align-items-center">
                  <div
                    className={
                      map
                        ? 'col-xl-7 col-lg-6 col-sm-9 form'
                        : 'col-xl-9 col-lg-8 col-sm-9 form'
                    }
                  >
                    {!noaddress && window.innerWidth >= 1280 && (
                      <Autocomplete
                        onLocationChange={this.handleLocationInput}
                        addressFrom={address}
                        geo={geo}
                        coords={coords}
                        coordsDefault={coordsDefault}
                        getCurrentPosition={this.getCurrentPosition}
                        isNearbyMobile={isMobile}
                      />
                    )}
                  </div>
                  {map && (
                    <div className="col-xl-5 col-lg-6 col-sm-3 list_button">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary wid-100"
                        onClick={() => this.switchMap()}
                      >
                        <span>
                          <TranslationContainer translationKey="list_view" />
                        </span>
                        <img
                          src={`../assets/images/list.svg`}
                          alt="list_view"
                        />
                      </button>
                    </div>
                  )}
                  {!map && (
                    <div className="col-xl-3 col-lg-4 col-sm-3 list_button">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary wid-100"
                        onClick={() => this.switchMap()}
                      >
                        <span>
                          <TranslationContainer translationKey="map_view" />
                        </span>
                        <img
                          src={`../assets/images/map.svg`}
                          alt="map_view"
                        />
                      </button>
                    </div>
                  )}
                </div>
                <div className={`mb-5 mt-5 ${language === 'he' && 'rtl-range-input'} ${radius < 335 && language === 'he' && 'rtl-range-input-slide'}`}>
                  <InputRange
                    direction={language === 'he' && 'rtl'}
                    maxValue={350}
                    formatLabel={(value) => `${value}  ${rangeKm}`}
                    minValue={1}
                    value={this.state.radius}
                    step={1}
                    onChange={(radius) => this.onRadiusChange(radius)}
                    onChangeComplete={(radius) => this.onRadiusChangeFinished(radius)}
                  />
                </div>
                <div className="row_map_settings pt-4">
                  {coupons && coupons.data && coupons.data.length > 0 ? (
                    <ContainerCoupons
                      coupons={coupons}
                      filterBy={0}
                      handleCoupons={this.handleCoupons}
                      isLoading={loadingHotCoupons}
                      classBlock={map ? 'col-md-6 col-sm-12' : ''}
                    />
                  ) : (
                    <div className="text-initial">
                      <p>
                        <TranslationContainer translationKey="no_coupons_field" />
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-xl-6 col-lg-5 d-flex flex-column justify-content-around map-parent-block">
                <div
                  className={
                    this.state.hideButtons
                      ? 'hideMobileButtons'
                      : 'row d-flex wid-100 mb-4 mobile-buttons align-items-center'
                  }
                >
                  <div
                    className={
                      map
                        ? 'col-xl-7 col-lg-6 col-md-10 col-sm-9 form'
                        : 'col-xl-9 col-lg-8 col-md-10 col-sm-9 form'
                    }
                  >
                    <Autocomplete
                      onLocationChange={this.handleLocationInput}
                      addressFrom={address}
                      geo={geo}
                      coords={coords}
                      coordsDefault={coordsDefault}
                      isNearbyMobile={isMobile}
                      getCurrentPosition={this.getCurrentPosition}
                    />
                  </div>
                  {map && (
                    <div className="col-xl-5 col-lg-6 col-md-2 col-sm-3 list_button">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary wid-100"
                        onClick={() => this.switchMap()}
                      >
                        <span>
                          <TranslationContainer translationKey="list_view" />
                        </span>
                        <img
                          src={`../assets/images/list.svg`}
                          alt="list_view"
                        />
                      </button>
                    </div>
                  )}
                  {!map && (
                    <div className="col-xl-3 col-lg-4 col-md-2 col-sm-3 list_button">
                      <button
                        type="button"
                        className="btn btn-lg btn-primary wid-100"
                        onClick={() => this.switchMap()}
                      >
                        <span>
                          <TranslationContainer translationKey="map_view" />
                        </span>
                        <img
                          src={`../assets/images/map.svg`}
                          alt="map_view"
                        />
                      </button>
                    </div>
                  )}
                </div>
                {map && (
                  <div className="map_parent">
                    <div className="sticky-top">
                      <MapGoogle
                        defaultCoord={coords}
                        loadingElement={<div style={{ height: '100%' }} />}
                        containerElement={<div className="map_block" />}
                        mapElement={<div style={{ height: '100%' }} />}
                        markersNearby={branchesForMap && branchesForMap}
                        styleProp
                        onHideBtn={this.onHideBtn}
                        onVisibleBtn={this.onVisibleBtn}
                        radius={radius}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <AddressModal
              modalAge={noaddress}
              activateNearby={this.activateNearby}
              back={this.backHistory}
            />
          )}
        </div>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  coupons: state.couponReducer.coupons,
  loadingHotCoupons: state.couponReducer.loadingHotCoupons,
  branchesForMap: state.branchReducer.branchesForMap,
  user: state.auth.user,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCoupons, getBranchesForMap }, dispatch);
}

export default withGoogleMapApi(
  withRouter(connect(mapStateToProps, mapDispatchToProps)(NearBy)),
);
