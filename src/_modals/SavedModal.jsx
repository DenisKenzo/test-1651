import React from 'react';
import { Modal } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import { Link } from 'react-router-dom';
import TranslationContainer from '../_components/TranslationContainer';

class SavedModal extends React.Component {
  render() {
    const {
      modal, showModal, language, customText,
    } = this.props;
    const hebrew = language === 'he';

    return (
      <Modal
        show={modal}
        onHide={() => showModal()}
        size="md"
        className={hebrew ? 'rtl-class modal_pos' : 'ltr-class modal_pos'}
        style={{ direction: hebrew ? 'rtl' : 'ltr' }}
      >
        <Modal.Body className="row justify-content-center pt-4 pb-4">
          <div className="close_button" onClick={() => showModal()}>
            <img src={`../assets/images/x.svg`} />
          </div>
          <div className="d-flex justify-content-center mb-6">
            <img
              className="img-success"
              src={`../assets/images/success.svg`}
            />
          </div>
          <div className="mt-3 mb-4 col-12 text-center">
            <p>
              <TranslationContainer
                translationKey={customText || 'saved_modal'}
              />
            </p>
          </div>
          <div className="col-md-6 col-sm-12">
            <Link
              to={`/${language}/`}
              className="btn btn-primary btn-md wid-100"
            >
              <TranslationContainer translationKey="saved_modal_button" />
            </Link>
          </div>
        </Modal.Body>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.mainReducer.locale,
});

export default connect(mapStateToProps)(SavedModal);
