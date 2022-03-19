import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  toggleAgreeModalLoginIn,
  toggleQuickView,
  toggleQuickViewHide,
} from '../../../../_actions';
import TranslationContainer from '../../../TranslationContainer';
import GalleryCarousel from '../../../GalleryCarousel/GalleryCarousel';
import LimitedInfo from '../../../../pages/CouponDetails/LimitedInfo/LimitedInfo';

import './QuickReviewModal.scss';
import PriceInfo from '../../../../pages/CouponDetails/PriceInfo/PriceInfo';
import AddToFavoritesButton from '../../../UI/AddToFavoritesButton/AddToFavoritesButton';

function QuickReviewModal({
  value,
  removeFromFavourite,
  addToFavourite,
  openLogin,
  user,
  coupon,
  onClose,
  open,
  language,
}) {
  const quickModalSliver = useState(true);
  const hebrew = language === 'he';

  // const openLoginModal = useContext(LoginModalContext)
  const {
    name, company, description, priceBeforeDiscount,
  } = coupon;

  return (
    <Modal onHide={onClose} show={open} size="lg" className={hebrew && 'RTL'}>
      <Modal.Body
        className={` ${
          hebrew ? 'QuickReviewModal' : 'QuickReviewModal Rtl-QuickReviewModal'
        }`}
      >
        <div className="close_button" onClick={onClose}>
          <img src={`../assets/images/x.svg`} />
        </div>

        <div className="QuickReviewModal-Row">
          <div className="QuickReviewModal-Row__Info">
            <div className="Name">{name}</div>

            {company && (
              <div className="QuickReviewModal-Row__Info-Company">
                <div className="Discount-Title">
                  <TranslationContainer translationKey="company_name" />
                </div>
                {' '}
                &nbsp;
                <Link to={`/${language}/company/${company._id}`}>
                  {company.name}
                </Link>
              </div>
            )}

            <div className="QuickReviewModal-Row__Info-Discount">
              <div className="Discount-Title">
                <TranslationContainer translationKey="priceBeforeDiscount" />
                :
                &nbsp;
              </div>
              <div className="Discount-Description">
                <span className="Discount-Description__Currency">₪</span>
                {priceBeforeDiscount}
              </div>
            </div>

            {description && (
              <div className="QuickReviewModal-Row__Info-Descriptions">
                {' '}
                {description}
                {' '}
              </div>
            )}

            <PriceInfo
              coupon={coupon}
              openLogin={openLogin}
              quickModalSliver={quickModalSliver}
            />
          </div>

          <div className="QuickReviewModal-Row__Content">
            <GalleryCarousel
              className="gallery"
              quickModalSliver={quickModalSliver}
              images={coupon.imgPath}
              wishlistIcon={(
                <AddToFavoritesButton
                  user={user}
                  coupon={coupon}
                  addToFavourite={addToFavourite}
                  removeFromFavourite={removeFromFavourite}
                  openLogin={openLogin}
                  value={value}
                />
              )}
            />
          </div>
        </div>

        <LimitedInfo coupon={coupon} />
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
  isLogged: state.auth.isLoggedIn,
});
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleQuickView,
    toggleQuickViewHide,
    toggleAgreeModalLoginIn,
  },
  dispatch,
);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(QuickReviewModal));
