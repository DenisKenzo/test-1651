import React from 'react';
import connect from 'react-redux/es/connect/connect';
import { PropTypes } from 'prop-types';

import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import TranslationContainer from '../TranslationContainer';
import noCoupon from '../../assets/images/no-coupon.svg'
import {
  addToFavourite,
  removeFromFavourite,
  toggleAgreeModalLoginIn,
  toggleQuickView,
  toggleHideQrModal,
  toggleShowQrModal,
} from '../../_actions';
import LoginModalContext from '../../_contexts/loginModalContext';
import AgeModal from '../../_modals/AgeModal';
import ModalWrapper from '../CouponCard/QuickReview/ModalWrapper/ModalWrapper';
import Ribbon from '../CouponCard/Ribbon/Ribbon';
import QuickReview from '../CouponCard/QuickReview/QuickReview';
import QuickReviewModal from '../CouponCard/QuickReview/QuickReviewModal/QuickReviewModal';
import Realized from '../CouponCard/Realized/Realized';
import Location from '../CouponCard/Location/Location';
import QRModal from '../../_modals/QRModal';
import AddToFavoritesButton from '../UI/AddToFavoritesButton/AddToFavoritesButton';

class CouponCard extends React.PureComponent {
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
      imagePath = noCoupon;
    }
    const russian = language === 'ru';
    const english = language === 'en';
    const hebrew = language === 'he';
    const couponName = coupon.name.length > 60 ? `${coupon.name.slice(0, 60)}...` : coupon.name;
    return (
      <LoginModalContext.Consumer>
        {(value) => (
          <div className={`${extra ? 'ExtraCouponCard' : 'CouponCard'}`}>
            <div
              onClick={() => {
                const action = () => {
                  this.props.history.push({
                    pathname: `/${language}/coupon/${coupon._id}`,
                    state: {
                      pathname: this.props.history.location.pathname,
                      initialScrollY: window.scrollY,
                      page,
                    },
                  });
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
              style={{ cursor: 'pointer' }}
            >
              <div
                className={`${extra ? 'ExtraCouponCard' : 'CouponCard'}-Item `}
              >
                <img src={imagePath} className="Product" alt="Product" />

                <Location language={language} coupon={coupon} />

                <Ribbon coupon={coupon} />

                <QuickReview
                  coupon={coupon}
                  language={language}
                  toggleQuickView={this.toggleQuickView}
                />

                <AddToFavoritesButton
                  user={user}
                  coupon={coupon}
                  isLogged={isLogged}
                  value={value}
                  inSlider={inSlider}
                  addToFavourite={this.addToFavourite}
                  removeFromFavourite={this.removeFromFavourite}
                />
              </div>

              {extra && (
                <div className="ExtraCouponCard-Information">
                  <div className="ExtraCouponCard-Information__Row">
                    <div
                      className={
                        russian ? 'CouponCard-NameRU' : 'CouponCard-Name'
                      }
                    >
                      <div
                        className={
                          english || hebrew
                            ? `CouponCard-Name__Title ${'text-left align-self-start'})`
                            : 'CouponCard-NameRU__Title'
                        }
                      >
                        {couponName}
                      </div>
                      <Realized language={language} coupon={coupon} />
                    </div>

                    <div className="CouponCard-Discount">
                      <div className="CouponCard-Discount__Redemption">
                        <div className="Chip_me">
                          <button className="btn btn-primary btn-lg wid-100">
                            <TranslationContainer translationKey="chipper_me" />
                          </button>
                        </div>
                      </div>

                      <div className="CouponCard-Discount__Price">
                        {russian ? (
                          <div>
                            <div className="Currency">₪</div>
                            <div className="Price font-weight-bold">
                              {coupon.price}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="Price font-weight-bold">
                              {coupon.price}
                            </div>
                            <div className="Currency">₪</div>
                          </div>
                        )}
                        <div>
                          <p>
                            <TranslationContainer translationKey="discount" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!extra && (
                <div className="CouponCard-Information">
                  <div className="CouponCard-Information__Row">
                    <div className="CouponCard-Name">
                      <div
                        className={
                          english
                            ? 'CouponCard-NameEN__TitleEN'
                            : 'CouponCard-Name__Title'
                        }
                      >
                        <div
                          className={
                            (english || russian) && 'text-left align-self-start'
                          }
                        >
                          {couponName}
                        </div>

                        <Realized language={language} coupon={coupon} />
                      </div>

                      <div
                        className={
                          english
                            ? 'CouponCard-Name__PriceEN'
                            : 'CouponCard-Name__Price'
                        }
                      >
                        {russian ? (
                          <div>
                            <div className="Currency">₪</div>
                            <div className="Price">{coupon.price}</div>
                          </div>
                        ) : (
                          <div>
                            <div className="Price">{coupon.price}</div>
                            <div className="Currency">₪</div>
                          </div>
                        )}
                        <div>
                          <p>
                            <TranslationContainer translationKey="discount" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {this.state.previewModal && (
              <ModalWrapper
                showModal={toggleQuickView}
                open
                quickViewData={quickViewData}
              >
                {({ showModal }) => (
                  <>
                    <QuickReviewModal
                      value={value}
                      coupon={coupon}
                      onClose={onClose}
                      open
                      addToFavourite={this.addToFavourite}
                      removeFromFavourite={this.removeFromFavourite}
                      openLogin={this.context.openLogin}
                      showModal={showModal}
                    />
                    {qrModal && (
                      <ModalWrapper
                        showModal={() => toggleShowQrModal(!qrModal)}
                        open
                        quickViewData={quickViewData}
                      >
                        {({ showModal }) => (
                          <QRModal
                            onCloseQR={() => this.props.toggleHideQrModal()}
                            couponNumber={coupon.couponNumber}
                            modalQr={qrModal}
                            _id={coupon._id}
                            redemption={
                              coupon.redemptForUserQ_ty
                              - coupon.redemptAllQ_tyLeft
                            }
                            showModal={showModal}
                          />
                        )}
                      </ModalWrapper>
                    )}
                  </>
                )}
              </ModalWrapper>
            )}

            {/* {agreeModal && (
              <AgreeModal
                modal={agreeModal}
                showModal={toggleAgreeModalLoginIn(false, true)}
              />
            )} */}
          </div>
        )}
      </LoginModalContext.Consumer>
    );
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

CouponCard.prototypes = {
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

CouponCard.contextType = LoginModalContext;

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CouponCard),
);
