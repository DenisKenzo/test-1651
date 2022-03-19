import React, { useState } from 'react';
import { Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

import TranslationContainer from '../_components/TranslationContainer';
import { toggleHideQrModal } from '../_actions';

const QRCode = require('qrcode.react');

function QRModal({
  language,
  couponNumber,
  redemption,
  _id,
  user,
  onCloseQR,
}) {
  const hebrew = language === 'he';
  return (
    <Modal
      show
      size="md"
      className={hebrew ? 'rtl-class modal_qr' : 'ltr-class modal_qr'}
      style={{ direction: hebrew ? 'rtl' : 'ltr' }}
    >
      <Modal.Body className="row justify-content-center">
        <div className="close_button" onClick={onCloseQR}>
          <img src={`../assets/images/x.svg`} />
        </div>

        <div className="text-center qr-block">
          <div className="mobile_logo_login">
            <div>
              <img
                src={`../assets/images/logo-footer.svg`}
              />
            </div>
          </div>
          <div className="mt-4 mb-4">
            <p className="p-white">
              <TranslationContainer translationKey="please_display_QR" />
            </p>
          </div>
          <div className="qr">
            <QRCode
              value={
                `${process.env.REACT_APP_API_URL}scanCoupon?c=${
                  redemption
                }&id=${
                  _id
                }&userId=${user._id}`
              }
              size={240}
              level="H"
            />
          </div>
          <div className="mt-5 mb-3">
            <p className="p-white">
              <TranslationContainer translationKey="use_a_coupon_number" />
            </p>
          </div>
          <div className="d-flex justify-content-between coupon-code">
            <div>
              <p>
                <TranslationContainer translationKey="coupon_number" />
                :
              </p>
            </div>
            <div>
              <p className="font-weight-bold">{couponNumber}</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    toggleHideQrModal,
  },
  dispatch,
);

export default connect(mapStateToProps, mapDispatchToProps)(QRModal);
