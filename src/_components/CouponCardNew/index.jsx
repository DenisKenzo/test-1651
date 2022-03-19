import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
  addToFavourite,
  removeFromFavourite,
  toggleAgreeModalLoginIn,
  toggleQuickView,
  toggleHideQrModal,
  toggleShowQrModal,
} from '../../_actions';
import LoginModalContext from '../../_contexts/loginModalContext';
import Ribbon from '../CouponCard/Ribbon/Ribbon';
import Location from '../CouponCard/Location/Location';
import './styles.scss'

class CouponCardNew extends React.PureComponent {
  state = {};

  render() {
    const {
      qrModal,
      coupon,
      language,
      extra,
      isLogged,
      inSlider,
      agreeModal,
      page,
      user,
      toggleQuickView,
      quickViewData,
      toggleShowQrModal,
    } = this.props;

    let imagePath = '';

    const isImg = coupon.imgPath && coupon.imgPath[0];
    const onClose = () => {
      this.setState({ previewModal: false });
    };

    if (isImg) {
      imagePath = process.env.REACT_APP_URL_IMG + coupon.imgPath[0];
    } else {
      imagePath = `../assets/images/no-coupon.svg`;
    }
    const russian = language === 'ru';
    const english = language === 'en';
    const hebrew = language === 'he';
    const couponName = coupon.name.length > 60 ? `${coupon.name.slice(0, 60)}...` : coupon.name;
    return (
      <div className="CouponCardNew">
        <Location language={language} coupon={coupon} />
        <Ribbon coupon={coupon} />

        <img src={imagePath} className="CouponCardNewImg" alt="Product" />
      </div>
    )
  }

  toggleQuickView = () => {
    this.setState({ previewModal: true });
  };

  addToFavourite = (e, coupon) => {
    e.preventDefault();
    this.props.addToFavourite(coupon, this.props.language);
  };

  addToFavouriteFromModal = (coupon) => {
    this.props.addToFavourite(coupon, this.props.language);
  };

  removeFromFavourite = (e, id) => {
    const { removeFromFavourite, language } = this.props;

    e.preventDefault();

    removeFromFavourite(id, language);
  };

  backHistory = () => {
    this.props.history.goBack();
  };
}

CouponCardNew.prototypes = {
  coupon: PropTypes.array,
};

const mapStateToProps = (state) => ({
  qrModal: state.modalReducer.qrModal,
  quickView: state.modalReducer.quickView,
  user: state.auth.user,
  agree: state.modalReducer.agree,
  agreeModal: state.modalReducer.agreeModal,
  isLogged: state.auth.isLoggedIn,
  language: state.mainReducer.locale,
  quickViewData: state.modalReducer.quickViewData,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleAgreeModalLoginIn,
      addToFavourite,
      removeFromFavourite,
      toggleQuickView,
      toggleHideQrModal,
      toggleShowQrModal,
    },
    dispatch,
  );
}

CouponCardNew.contextType = LoginModalContext;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponCardNew),
);
