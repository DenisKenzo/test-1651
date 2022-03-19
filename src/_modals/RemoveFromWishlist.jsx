import React from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { removeAllCoupons } from '../_actions';
import TranslationContainer from '../_components/TranslationContainer';

class RemoveFromWishlist extends React.Component {
  render() {
    const {
      modalLogin, showModal, isDeletingWishlist, language,
    } = this.props;

    const hebrew = language === 'he';

    return (
      <Modal
        show={modalLogin}
        onHide={() => showModal()}
        size="sm"
        className={hebrew ? 'rtl-class modal-remove' : 'ltr-class modal-remove'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body>
          {isDeletingWishlist && (
            <div className="loading_form">
              <img src={`../assets/images/loading.svg`} />
            </div>
          )}
          <div className="close_button" onClick={() => showModal()}>
            <img src={`../assets/images/x.svg`} />
          </div>
          <div className="text-uppercase text-center font-weight-bold header">
            <p>
              <TranslationContainer translationKey="confirm_delete_title" />
            </p>
          </div>
          <div className="row justify-content-center m-3">
            <div className="col-md-8 text-center">
              <p>
                <TranslationContainer translationKey="confirm_delete_question" />
              </p>
            </div>
          </div>
          <div className="row-fluid mb-3">
            <div className="col-sm-6">
              <button
                className="btn btn-outline-primary btn-lg wid-100"
                onClick={() => showModal()}
              >
                <TranslationContainer translationKey="cancel" />
              </button>
            </div>
            <div className="col-sm-6">
              <button
                className="btn btn-primary btn-lg wid-100"
                onClick={() => this.removeAllCoupons()}
              >
                <TranslationContainer translationKey="delete" />
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  removeAllCoupons = () => {
    const { removeAllCoupons, favouriteCoupons, showModal } = this.props;

    removeAllCoupons(favouriteCoupons).then(() => showModal());
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  favouriteCoupons: state.couponReducer.favouriteCoupons,
  isDeletingWishlist: state.couponReducer.isDeletingWishlist,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeAllCoupons }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RemoveFromWishlist);
