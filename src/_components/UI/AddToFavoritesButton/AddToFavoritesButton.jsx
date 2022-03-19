import React, { useContext } from 'react';
import ReactTooltip from 'react-tooltip';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import TranslationContainer from '../../TranslationContainer';
import LoginModalContext from '../../../_contexts/loginModalContext';
import AgeModal from '../../../_modals/AgeModal';
import { toggleAgreeModalLoginIn } from '../../../_actions';
import heartSvg32 from '../../../assets/images/heart-32.svg';
import heartSvgFill32 from '../../../assets/images/heart-32-fill.svg';

import './AddToFavoritesButton.scss';

function AddToFavoritesButton({
  user,
  coupon,
  favouriteCoupons,
  inSlider,
  isLogged,
  removeFromFavourite,
  addToFavourite,
  value,
  language,
}) {
  const favourite = coupon
    && favouriteCoupons
    && favouriteCoupons.some(
      (couponFromFavourite) => couponFromFavourite._id === coupon._id,
    );
  const context = useContext(LoginModalContext);

  return (
    <>
      {isLogged ? (
        !favourite ? (
          <div
            className="Heart"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const action = () => {
                (!isLogged ? context.openLogin() : user.agree1)
                  ? addToFavourite(e, coupon)
                  : toggleAgreeModalLoginIn(false, true);
              };
              if (coupon.alcoholAndTobaco[0].value !== 0) {
                AgeModal.confirm({
                  coupon,
                  language,
                  onOk: action,
                });
              } else {
                action();
              }
            }}
            data-tip
            data-for={!inSlider && `tooltip-id${coupon._id}`}
          >
            <img src={heartSvg32} />

            {inSlider ? (
              <div className="slider-tooltip">
                <p className="error-msg">
                  <TranslationContainer translationKey="add_to_saved_coupons" />
                </p>
              </div>
            ) : (
              <ReactTooltip
                id={`tooltip-id${coupon._id}`}
                place={language === 'he' ? 'right' : 'left'}
                type="dark"
                effect="solid"
                className="tooltip-element-custom"
              >
                <p>
                  <TranslationContainer translationKey="add_to_saved_coupons" />
                </p>
              </ReactTooltip>
            )}
          </div>
        ) : (
          <div
            className="Heart"
            onClick={(e) => {
              e.stopPropagation();
              removeFromFavourite(e, coupon._id);
            }}
            data-tip
            data-for={!inSlider && `tooltip-id_del${coupon._id}`}
          >
            <img
              src={heartSvgFill32}
            />
            {inSlider ? (
              <div className="slider-tooltip">
                <p className="error-msg">
                  <TranslationContainer translationKey="remove_from_saved_coupons" />
                </p>
              </div>
            ) : (
              <ReactTooltip
                id={`tooltip-id_del${coupon._id}`}
                place={language === 'he' ? 'right' : 'left'}
                type="dark"
                effect="solid"
                className="tooltip-element-custom"
              >
                <p>
                  <TranslationContainer translationKey="remove_from_saved_coupons" />
                </p>
              </ReactTooltip>
            )}
          </div>
        )
      ) : (
        <div
          className="Heart"
          onClick={(e) => {
            e.stopPropagation();
            context.openLogin(e);
          }}
        >
          <img src={heartSvg32} />
        </div>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  favouriteCoupons: state.couponReducer.favouriteCoupons,
  isLogged: state.auth.isLoggedIn,
  language: state.mainReducer.locale,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleAgreeModalLoginIn,
  },
  dispatch,
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(AddToFavoritesButton),
);
