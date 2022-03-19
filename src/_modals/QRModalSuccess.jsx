import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';

class QRModalSuccess extends React.Component {
  render() {
    const {
      modalQr,
      showModal,
      language,
      couponNumber,
      redemption,
      _id,
      onCloseQR,
    } = this.props;
    const hebrew = language === 'he';

    return (
      <Modal
        show={modalQr}
        onHide={onCloseQR}
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
            <div className="mt-6 mb-4">
              <p className="p-x-large p-white">Coupon used successfully!</p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(QRModalSuccess);
