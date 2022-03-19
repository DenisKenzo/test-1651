import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';
import { Provider } from 'react-redux';
import moment from 'moment';
import TranslationContainer from '../_components/TranslationContainer';
import { store } from '../_helpers';

class AgeModal extends React.Component {
  birthDate = store.getState().auth.user.birthDate;

  isLittle = !this.birthDate || moment().diff(this.birthDate, 'years') < 18;

  state = {
    visible: this.isLittle,
  };

  componentDidMount() {
    if (!this.isLittle) {
      this.props.onOk();
    }
  }

  close = () => {
    this.setState({ visible: false });
  };

  render() {
    const hebrew = this.props.language === 'he';
    return (
      <Modal
        id="modalConfirmDefaultId"
        size="md"
        className={hebrew ? 'rtl-class modal_age' : 'ltr-class modal_age'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
        {...this.props}
        onHide={this.close}
        show={this.state.visible}
        centered
      >
        <Modal.Header className="text-center p-4">
          <p className="font-weight-bold text-uppercase wid-100">
            <TranslationContainer translationKey="confirm_age" />
          </p>
        </Modal.Header>
        <Modal.Body className="row justify-content-center text-center">
          <div className="mt-4 col-12">
            <img
              className="img-age"
              src={`../assets/images/18+.svg`}
            />
          </div>
          <div className="mt-4 mb-4 col-12">
            <p>
              {this.props.coupon.alcoholAndTobaco === 1 && (
                <TranslationContainer translationKey="weak_alcohol_text" />
              )}
              {this.props.coupon.alcoholAndTobaco === 2 && (
                <TranslationContainer translationKey="strong_alcohol_text" />
              )}
            </p>
          </div>
          <>
            <div className="col-md-6 col-sm-12">
              <button
                onClick={this.close}
                className="btn btn-outline-primary btn-md wid-100"
              >
                <TranslationContainer translationKey="cancel_18" />
              </button>
            </div>
            <div className="col-md-6 col-sm-12">
              <button
                className="btn btn-primary btn-md wid-100"
                onClick={() => {
                  this.props.onOk();
                  this.close();
                }}
              >
                <TranslationContainer translationKey="over_18" />
              </button>
            </div>
          </>
        </Modal.Body>
      </Modal>
    );
  }
}

AgeModal.confirm = (props) => {
  ReactDOM.render(
    <Provider store={store}>
      <AgeModal {...props} />
    </Provider>,
    document.createElement('div'),
  );
};
export default AgeModal;
