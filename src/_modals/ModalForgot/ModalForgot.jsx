import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import {
  checkCode, sendDataRecovery, sendNewPassword, setupStepForgotPass,
} from '../../_actions';

class ModalForgot extends React.Component {
  state = {
    step: 1,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.step && props.step !== state.step) {
      return {
        step: props.step,
      };
    }

    return null;
  }

  render() {
    const {
      modalForgot, showModal, isSentRecoveryCode, isSentCheckingCode, isSentNewPassword, language,
    } = this.props;
    const { step } = this.state;

    const hebrew = language === 'he';

    return (
      <Modal
        show={modalForgot}
        onHide={() => showModal()}
        size="md"
        className={hebrew ? 'rtl-class modal_forgot' : 'ltr-class modal_forgot'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body className="row">
          <div className="close_button" onClick={() => showModal()}>
            <img src={`../assets/images/x.svg`} />
          </div>
          {/* { */}
          {/* step===1 && <Step1 */}
          {/* isSentRecoveryCode={isSentRecoveryCode} */}
          {/* sendRecovery={this.sendRecovery} */}
          {/* /> */}
          {/* } */}
          {/* { */}
          {/* step===2 && <Step2 */}
          {/* isSentCheckingCode={isSentCheckingCode} */}
          {/* isSentRecoveryCode={isSentRecoveryCode} */}
          {/* checkCodeFunction={this.checkCode} */}
          {/* setupStep={this.setupStep} */}
          {/* resend={this.resend} */}
          {/* /> */}
          {/* } */}
          {/* { */}
          {/* step===3 && <Step3 */}
          {/* isSentNewPassword={isSentNewPassword} */}
          {/* sendNewPassword={this.sendNewPassword} */}
          {/* /> */}
          {/* } */}
          {/* { */}
          {/* step===4 && <Step4 */}
          {/* openLogin={this.openLogin} */}
          {/* /> */}
          {/* } */}
        </Modal.Body>
      </Modal>
    );
  }

  resend = () => {
    const { sendDataRecovery } = this.props;
    const { recovery_data } = this.state;

    sendDataRecovery(recovery_data);
  };

  openLogin = () => {
    const { setupStepForgotPass, openLogin } = this.props;

    setupStepForgotPass(1);
    openLogin();
  };

  sendRecovery = (data) => {
    const { sendDataRecovery } = this.props;

    this.setState({ recovery_data: data });

    sendDataRecovery(data);
  };

  checkCode = (data) => {
    const { checkCode } = this.props;
    const { recovery_data } = this.state;

    this.setState({ code_recovery: data });

    checkCode({ ...recovery_data, ...data });
  };

  sendNewPassword = (data) => {
    const { sendNewPassword } = this.props;
    const { code_recovery } = this.state;

    sendNewPassword({ ...code_recovery, ...data });
  };

  setupStep = (step) => {
    const { setupStepForgotPass } = this.props;

    setupStepForgotPass(step);
  };
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
  step: state.userReducer.step,
  isSentRecoveryCode: state.userReducer.isSentRecoveryCode,
  isSentCheckingCode: state.userReducer.isSentCheckingCode,
  isSentNewPassword: state.userReducer.isSentNewPassword,
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    sendDataRecovery, checkCode, setupStepForgotPass, sendNewPassword,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalForgot);
