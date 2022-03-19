import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import { bindActionCreators } from 'redux';
import {
  getBranches,
  getCoupon,
  clearCoupon,
  addToFavourite,
  removeFromFavourite,
  getCouponsFooter,
  toggleAgreeModalLoginIn,
  toggleShowQrModal,
  toggleHideQrModal,
} from '../../_actions';
import TranslationContainer from '../../_components/TranslationContainer';
import QRModal from '../../_modals/QRModal';
import QRModalSuccess from '../../_modals/QRModalSuccess';
import ShareBlock from '../../_components/ShareBlock';
import GalleryCarousel from '../../_components/GalleryCarousel/GalleryCarousel';
import AdditionalCouponDetails from '../../pages/CouponDetails/AdditionalCouponDetails/AdditionalCouponDetails';
import LimitedInfo from '../../pages/CouponDetails/LimitedInfo/LimitedInfo';
import PriceInfo from '../../pages/CouponDetails/PriceInfo/PriceInfo';
import BaseInfo from '../../pages/CouponDetails/BaseInfo/BaseInfo';
import ProductSliderList from '../../pages/CouponDetails/ProductSliderList/ProductSliderList';
import AddToFavoritesButton from '../../_components/UI/AddToFavoritesButton/AddToFavoritesButton';

import './CouponDetails.scss';

class CouponDetailsComponent extends Component {
  state = {
    userDetails: this.props.user && this.props.user,
    idCoupon: this.props.match.params.id,
    isOpenedSuccessQr: this.props.match.params.status === 'success',
    showShareModal: false,
    socialHide: window.innerWidth < 1024,
  };

  handleResize = () => this.state.socialHide;

  componentWillMount() {
    if (this.props.match.params.id !== this.state.idCoupon) {
      this.props.getCoupon(this.props.match.params.id);

      this.setState(() => ({
        ...this.state,
        idCoupon: this.props.match.params.id,
      }));
    }

    if (this.state.userDetails?.agree1) {
      toggleAgreeModalLoginIn(false, null);
      this.setState(() => ({
        ...this.state,
        agree: false,
      }));
    }
  }

  componentDidMount() {
    const { getCoupon } = this.props;
    const { idCoupon } = this.state;
    getCoupon(idCoupon);

    const { getCouponsFooter } = this.props;
    getCouponsFooter();

    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    const { clearCoupon } = this.props;
    clearCoupon();

    window.removeEventListener('resize', this.handleResize);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (this.props.match.params.id !== nextProps.match.params.id) {
      const { getCoupon } = this.props;

      this.setState(
        {
          idCoupon: nextProps.match.params.id,
        },
        () => getCoupon(this.state.idCoupon),
      );
    }
  }

  render() {
    const {
      isLogged,
      user,
      coupon,
      toggleShowQrModal,
      qrModal,
      language,
    } = this.props;

    const { isOpenedSuccessQr } = this.state;

    return (
      <div className="CouponDetails">
        <div className="CouponDetails-ReturnButton">
          <img src={`../assets/images/arrow-left.svg`} />
          <a className="text-primary" onClick={() => this.backHistory()}>
            <TranslationContainer translationKey="prev_page" />
          </a>
        </div>

        <div className="CouponDetails-Content">
          {coupon && (
            <div className="CouponDetails-Info">
              <BaseInfo coupon={coupon} />

              <PriceInfo
                coupon={coupon}
                qrModal={qrModal}
                isOpenedSuccessQr={isOpenedSuccessQr}
                showSuccessQr={this.showSuccessQr}
                openLogin={this.context.openLogin}
              />

              <LimitedInfo coupon={coupon} showQRModal={this.showQRModal} />

              <div className="row-fluid justify-content-center">
                <ShareBlock couponNumber={coupon && coupon._id} />
              </div>
            </div>
          )}
          {coupon && (
            <div className="CouponDetails-Gallery_Coupon">
              <GalleryCarousel
                images={coupon.imgPath}
                wishlistIcon={(
                  <AddToFavoritesButton
                    user={user}
                    coupon={coupon}
                    isLogged={isLogged}
                    addToFavourite={this.addToFavourite}
                    removeFromFavourite={this.removeFromFavourite}
                  />
                )}
              />
              <p className="Illustration-Info">
                <TranslationContainer translationKey="image_for_illustration_only" />
              </p>
            </div>
          )}
        </div>

        <AdditionalCouponDetails coupon={coupon} />

        {coupon && coupon.products.length > 0 ? (
          <div className="mt-10 text-center text-uppercase">
            <h2>
              <TranslationContainer translationKey="products_title" />
            </h2>
          </div>
        ) : (
          <div className="mb-11" />
        )}

        <ProductSliderList isHerb={language === 'he'} coupon={coupon} />

        {qrModal && (
          <QRModal
            couponNumber={coupon.couponNumber}
            modalQr={qrModal}
            _id={coupon._id}
            onCloseQR={() => this.props.toggleHideQrModal()}
            redemption={coupon.redemptForUserQ_ty - coupon.redemptAllQ_tyLeft}
            showModal={toggleShowQrModal}
            isOpenedSuccessQr={isOpenedSuccessQr}
          />
        )}

        {isOpenedSuccessQr && (
          <QRModalSuccess
            couponNumber={coupon && coupon.couponNumber}
            modalQr={isOpenedSuccessQr}
            onCloseQR={() => this.props.toggleHideQrModal()}
            showModal={this.showSuccessQr}
          />
        )}

        {/* {agreeModal && (
          <AgreeModal
            modal={agreeModal}
            showModal={toggleAgreeModalLoginIn(false, true)}
          />
        )} */}
      </div>
    );
  }

  showSuccessQr = () => {
    this.setState({
      ...this.state,
      isOpenedSuccessQr: !this.state.isOpenedSuccessQr,
    });
  };

  backHistory = () => {
    if (this.props.history.location.state?.pathname) {
      const location = {
        pathname: this.props.history.location.state.pathname,
        state: {
          details: true,
          initialScrollY: this.props.history.location.state.initialScrollY,
          page: this.props.history.location.state.page,
        },
      };
      this.props.history.push(location);
    } else {
      this.props.history.goBack();
    }
  };

  addToFavourite = (e, coupon) => {
    e.preventDefault();
    this.props.addToFavourite(coupon, this.props.language);
  };

  removeFromFavourite = (e, id) => {
    const { removeFromFavourite, language } = this.props;

    e.preventDefault();

    removeFromFavourite(id, language);
  };
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLogged: state.auth.isLoggedIn,
  language: state.mainReducer.locale,
  branches: state.branchReducer.branch,
  coupon: state.couponReducer.coupon,
  favouriteCoupons: state.couponReducer.favouriteCoupons,
  agree: state.modalReducer.agree,
  agreeModal: state.modalReducer.agreeModal,
  qrModal: state.modalReducer.qrModal,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleAgreeModalLoginIn,
    toggleShowQrModal,
    toggleHideQrModal,
    getCouponsFooter,
    getCoupon,
    clearCoupon,
    getBranches,
    addToFavourite,
    removeFromFavourite,
  },
  dispatch,
);

export const CouponDetails = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponDetailsComponent),
);
