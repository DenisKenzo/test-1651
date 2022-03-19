import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';

import TranslationContainer from '../_components/TranslationContainer';

class ShareModal extends React.Component {
  render() {
    const {
      modalShare, showModal, back, language, couponNumber,
    } = this.props;
    const hebrew = language === 'he';

    return (
      <Modal
        show={modalShare}
        onHide={() => false}
        size="md"
        className={hebrew ? 'rtl-class modal_share' : 'ltr-class modal_share'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body className="row justify-content-center text-center">
          <div className="close_button" onClick={() => showModal()}>
            <img src={`../assets/images/x.svg`} />
          </div>
          <h2 className="font-weight-bold text-uppercase wid-100 mt-7">Share</h2>
          <div className="mt-2 col-12"><p>Share this coupon with your friends</p></div>

          <div className="mt-6 justify-content-center align-items-center d-flex">
            <div className="mr-2 ml-2">
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/face.svg`} />
              </a>
            </div>
            <div className="mr-2 ml-2">
              <a href={`whatsapp://send?text=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/whatsu.svg`} />
              </a>
            </div>
            <div className="mr-2 ml-2">
              <a href={`http://twitter.com/share?url=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/twit.svg`} />
              </a>
            </div>
            <div className="mr-2 ml-2">
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/linked.svg`} />
              </a>
            </div>
            <div className="mr-2 ml-2">
              <a href={`http://pinterest.com/pin/create/button/?url=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/pinterest.svg`} />
              </a>
            </div>
            <div className="mr-2 ml-2">
              <a href={`https://telegram.me/share/url?url=${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} target="_blank" rel="noreferrer">
                <img src={`../assets/images/social/telegram.svg`} />
              </a>
            </div>
          </div>

          <div className="mt-6 col-12 mb-7">
            <form className="wid-100 form ">
              <div className="copy-block position-relative">
                <input type="text" value={`${process.env.REACT_APP_DOMAIN_URL}/social-share?coupon=${couponNumber}`} className="wid-100 share" />
                <button className="btn btn-primary text-uppercase">copy</button>
                <span />
              </div>

            </form>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(ShareModal);
