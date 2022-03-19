import React from 'react';
import { Modal } from 'react-bootstrap';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TranslationContainer from '../_components/TranslationContainer';
import { store } from '../_helpers';
import LoginModal from './LoginModal/LoginModal';

class AgreeModal extends React.Component {
  state = {
    userDetails: this.props.user && this.props.user,
    visible: true,
    // agree: true
  };

  close = () => {
    this.setState({ visible: false });
  };
  // working with state outside components

  componentWillMount() {
    if (this.state.userDetails?.agree1) {
      this.setState(() => ({
        agree: false,
      }));
    }
  }

  render() {
    const hebrew = this.props.language === 'he';
    return (
      <>
        {this.props.isLogged ? (
          <Modal
            show={this.state.visible}
            onHide={this.close}
            size="md"
            className={hebrew ? 'rtl-class modal_age' : 'ltr-class modal_age'}
            style={{ direction: hebrew ? 'rtl' : 'ltr' }}
            {...this.props}
          >
            <Modal.Header className="text-center p-4">
              <p className="font-weight-bold text-uppercase wid-100">
                <TranslationContainer translationKey="agreements_are_required" />
              </p>
            </Modal.Header>
            <Modal.Body className="row justify-content-center text-center">
              <div className="mt-4 col-12">
                <img
                  className="img-age"
                  src={`../assets/images/close-orange.svg`}
                />
              </div>
              <div className="mt-4 mb-4 col-12">
                <p>
                  {' '}
                  <TranslationContainer translationKey="approve_agreements" />
                  {' '}
                </p>
              </div>
              <div className="col-md-6 col-sm-12">
                <a href={`/${this.props.language}/profile`}>
                  <button className="btn btn-primary btn-md wid-100">
                    <TranslationContainer translationKey="to_profile" />
                  </button>
                </a>
              </div>
              {this.state.visible && (
                <div className="col-md-6 col-sm-12">
                  <button
                    className="btn btn-outline-primary btn-md wid-100"
                    onClick={() => {
                      this.close();
                    }}
                  >
                    <TranslationContainer translationKey="ok" />
                  </button>
                </div>
              )}
            </Modal.Body>
          </Modal>
        ) : (
          LoginModal.confirm({
            modalLogin: true,
          })
        )}
      </>
    );
  }
}

AgreeModal.confirm = (props) => {
  ReactDOM.render(
    <Provider store={store}>
      <AgreeModal {...props} />
    </Provider>,
    document.createElement('div'),
  );
};

export default AgreeModal;
