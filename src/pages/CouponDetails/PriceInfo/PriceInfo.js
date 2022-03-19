import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TranslationContainer from '../../../_components/TranslationContainer';
import { toggleAgreeModalLoginIn, toggleShowQrModal } from '../../../_actions';
import { useWindowWidth } from '../../../_hook/userWindowWidth.hook';
import AgeModal from '../../../_modals/AgeModal';

import './PriceInfo.scss';

function PriceInfo({
  quickModalSliver,
  coupon,
  isLogged,
  user,
  toggleAgreeModalLoginIn,
  openLogin,
  toggleShowQrModal,
}) {
  const { couponNumber, _id, price } = coupon;
  const { agree1 } = user;
  const resize = useWindowWidth(1024);

  return (
    <div
      className={`${
        quickModalSliver ? 'PriceInfo PriceInfo-QuickModal' : 'PriceInfo'
      }`}
    >
      <div className="PriceInfo-Detail">
        <span className="Currency">₪</span>
        <span className="Price">{price}</span>
        <div className="Discount">
          <TranslationContainer translationKey="discount" />
        </div>
      </div>

      <button
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const action = () => {
            (!isLogged ? openLogin() : agree1)
              ? toggleShowQrModal(true)
              : toggleAgreeModalLoginIn(false, true);
          };
          if (coupon.alcoholAndTobaco[0].value !== 0) {
            AgeModal.confirm({
              coupon,
              onOk: action,
            });
          } else {
            action();
          }
        }}
      >
        <TranslationContainer translationKey="realization_in_store" />
      </button>

      {/* {resize &&  <div className="SocialHide"> */}
      {/*    <ShareBlock */}
      {/*        couponNumber={coupon && coupon._id} */}
      {/*    /> */}
      {/* </div> */}
      {/* } */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isLogged: state.auth.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleAgreeModalLoginIn,
    toggleShowQrModal,
  },
  dispatch,
);

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PriceInfo),
);
