import React from 'react';
import { Modal } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { loginUser, setupPreviousStep } from '../../_actions';
import { store } from '../../_helpers';
import TranslationContainer from '../../_components/TranslationContainer';
import LoginMobileContainer from '../../_components/LoginMobileContainer';
import { loginUserWithToken } from '../../_actions';

class LoginModal extends React.Component {
  state = {
    isLogging: false,
    visible: null,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.isLogging !== state.isLogging) {
      return {
        isLogging: props.isLogging,
      };
    }

    if (props.mobileStep && props.mobileStep !== state.mobileStep) {
      return {
        mobileStep: props.mobileStep,
      };
    }

    return null;
  }

  componentDidMount() {
    const { loginUserWithToken, language } = this.props;

    if (window.location.search && window.location.search.includes('token')) {
      loginUserWithToken(window.location.search.split('=')[1], language);
    }

    window.onMessage = (message) => {
      if (message.id) this.responseFacebook(message);
    };
  }

  closeLoginModal = () => {
    this.setState({ visible: false });
  };

  // TODO: Need to check login facebook
  // webviewLogin = () => {
  //   window.ReactNativeWebView.postMessage('facebookLogin')
  // }

  render() {
    const { modalLogin, language, status } = this.props;
    const showModal = this.props.showModal || this.closeLoginModal;
    const { isLogging } = this.state;

    const hebrew = language === 'he';
    const isMobile = status === 'mobile';

    return (
      <Modal
        show={
          (this.state.visible ?? modalLogin)
          || (window.location.search && window.location.search.includes('token'))
        }
        onHide={() => showModal()}
        size="xl"
        className={hebrew ? 'rtl-class modal_login' : 'ltr-class modal_login'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body className="login_block ModalLogin">
          <div className="mobile_logo_login">
            <div>
              <img
                alt="logo-footer"
                src={`../assets/images/logo-footer.svg`}
              />
            </div>
          </div>

          <div className="close_button" onClick={() => showModal()}>
            <img alt="x" src={`../assets/images/x.svg`} />
          </div>

          <div className="logo_big ModalLogin__Presentation">
            <img
              alt="logo-footer"
              src={`../assets/images/logo-footer.svg`}
            />
          </div>

          <div className="login_form ModalLogin__Form">
            {isLogging && (
              <div className="loading_form">
                <img
                  alt="loading"
                  src={`../assets/images/loading.svg`}
                />
              </div>
            )}

            <LoginMobileContainer
              callback={() => {
                !this.props.showModal && showModal();
              }}
            />

            {this.props.mobileStep !== 3 && (
              <>
                <div className="text-uppercase text-center mt-4 or_block">
                  <p>
                    <TranslationContainer translationKey="or_login" />
                  </p>
                </div>
                <div className="ModalLogin__Form-SocialLink">
                  <a
                    href={
                      `${process.env.REACT_APP_DOMAIN_URL
                      }/login/google?lang=${
                        language
                      }&inv=server`
                    }
                    className="btn wid-100 soc_but_google"
                  >
                    <img
                      alt="brands_google"
                      src={`../assets/images/brands_google.svg`}
                    />
                    Google
                  </a>
                  {/* Need to check facebook login */}
                  {/* {isMobile ? (
                    <button
                      className="btn wid-100 soc_but_face mb-4"
                      onClick={this.webviewLogin}
                    >
                      <img
                        alt={'fa-brands_facebook'}
                        src={`../assets/images/fa-brands_facebook.svg`}
                      />
                      Facebook
                    </button>
                  ) : ( */}
                  <a
                    href={
                      `${process.env.REACT_APP_DOMAIN_URL
                      }/login/facebook?lang=${
                        language
                      }&inv=server`
                    }
                    className="btn wid-100 soc_but_face"
                  >
                    <img
                      alt="fa-brands_facebook"
                      src={`../assets/images/fa-brands_facebook.svg`}
                    />
                    Facebook
                  </a>
                  {/* )} */}

                  <a
                    href={`${process.env.REACT_APP_DOMAIN_URL}/login/apple?lang=${language}&inv=server`}
                    className="btn wid-100 soc_but_apple text-uppercase"
                  >
                    <div>
                      <img
                        alt="cib_apple"
                        src={`../assets/images/footer/cib_apple.svg`}
                      />
                    </div>
                    <div style={{ marginTop: '7px' }}>Sign in with Apple</div>
                  </a>
                </div>
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    );
  }

  responseFacebook = (response) => {
    const { loginUser, language } = this.props;

    loginUser({ type: 'facebook', data: response }, language);
    dataLayer.push({ event: 'login-success' });
    FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  isLoggedIn: state.auth.isLoggedIn,
  isLogging: state.auth.isLogging,
  user: state.auth.user,
  mobileStep: state.userReducer.mobileStep,
  status: state.applicationsReducer.status,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { loginUser, setupPreviousStep, loginUserWithToken },
    dispatch,
  );
}
LoginModal.confirm = (props) => {
  ReactDOM.render(
    <Provider store={store}>
      <LoginModal {...props} />
    </Provider>,
    document.createElement('div'),
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
