import React from 'react';
import { Modal, Row } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import TranslationContainer from '../_components/TranslationContainer';

class ModalPos extends React.Component {
  render() {
    const {
      modalPos, showModalPos, language, posNumber,
    } = this.props;
    const hebrew = language === 'he';

    return (
      <Modal
        show={modalPos}
        onHide={() => showModalPos()}
        size="md"
        className={hebrew ? 'rtl-class modal_pos' : 'ltr-class modal_pos'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body className="row justify-content-center">
          <div className="close_button" onClick={() => showModalPos()}>
            <img src={`../assets/images/x.svg`} />
          </div>

          <div className="d-flex justify-content-center mt-6">
            <img src={`../assets/images/ncr-orange.svg`} />
          </div>

          <div className="text-center mt-5 wid-100">
            <p className="font-weight-bold">
              <TranslationContainer translationKey="code_pos" />
            </p>
          </div>

          <div className="d-flex justify-content-center align-items-center p-3 mt-5 numbers-pos dir-ltr">
            {posNumber
              && [...`${posNumber}`].map(Number).map((num) => <div>{num}</div>)}
          </div>

          <div className="col-sm-12 mt-5 mb-5">
            <button
              className="btn btn-outline-primary wid-100"
              onClick={() => showModalPos()}
            >
              <TranslationContainer translationKey="done" />
            </button>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(ModalPos);
