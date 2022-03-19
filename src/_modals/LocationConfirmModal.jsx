import React from 'react';
import { Modal } from 'react-bootstrap';
import TranslationContainer from '../_components/TranslationContainer';

function LocationConfirmModal({
  isOpen, onClose, language, geoStatus, ...props
}) {
  const isHe = language === 'he';
  const geoStatusText = {
    prompt: 'access_geo_location_prompt',
    denied: 'access_geo_location_denied',
  };

  return (
    <Modal
      id="modalConfirmDefaultId"
      size="md"
      className={isHe ? 'rtl-class modal_age' : 'ltr-class modal_age'}
      style={{ direction: isHe ? 'rtl' : 'ltr' }}
      {...props}
      onHide={onClose}
      show={isOpen}
      centered
    >
      <Modal.Header className="text-center p-4">
        <p className="font-weight-bold text-uppercase wid-100">
          <TranslationContainer translationKey="access_geo_location" />
        </p>
      </Modal.Header>
      <Modal.Body className="row justify-content-center text-center">
        <div className="mt-4 mb-4 col-12">
          <p>
            <TranslationContainer translationKey={geoStatusText[geoStatus]} />
          </p>
        </div>
        <div className="col-md-6 col-sm-12">
          <button
            type="button"
            className="btn btn-primary btn-md wid-100"
            onClick={onClose}
          >
            <TranslationContainer translationKey="ok" />
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LocationConfirmModal;
