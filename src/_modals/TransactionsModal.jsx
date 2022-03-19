import React from 'react';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TranslationContainer from '../_components/TranslationContainer';
import { store } from '../_helpers';
import '../assets/_modalTransactions.scss';

class TransactionsModal extends React.Component {
  state = {
    visible: true,
    // agree: true
  };

  close = () => {
    this.setState({ visible: false });
  };
  // working with state outside components

  render() {
    const hebrew = this.props.language === 'he';
    return (
      <Modal
        show={this.state.visible}
        onHide={this.close}
        size="md"
        className={hebrew ? 'rtl-class modal_age' : 'ltr-class modal_age'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
        {...this.props}
      >
        <Modal.Body className="row justify-content-center text-center">
          <div className="close_button" onClick={this.close}>
            <img src={`../assets/images/x.svg`} />
          </div>
          <div className="mt-4 col-12">
            <img src={`../assets/images/success.svg`} />
          </div>
          <div className="mt-6 mb-2 col-12">
            <p className="text-uppercase titleTransactions">
              {' '}
              <TranslationContainer translationKey="done" />
              {' '}
            </p>
          </div>

          <div className="mb-4 col-12">
            <p className="approvePayment">
              {' '}
              <TranslationContainer translationKey="approve_payment" />
              {' '}
            </p>
          </div>

          {this.state.visible && (
          <div className="col-md-6 col-sm-12">
            <button
              className=" btnTransactionApprove btn-md wid-100 mb-7"
              onClick={() => {
                this.close();
                this.props.onClose();
              }}
            >
              <TranslationContainer translationKey="ok" />
            </button>
          </div>
          )}
        </Modal.Body>
      </Modal>
    );
  }
}

TransactionsModal.confirm = (props) => {
  ReactDOM.render(
    <Provider store={store}>
      <TransactionsModal {...props} />
    </Provider>,
    document.createElement('div'),
  );
};

export default TransactionsModal;
