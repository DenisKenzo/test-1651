import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

function ModalConfirm({ content, clear, ...props }) {
  return (
    <Modal
      id="modalConfirmDefaultId"
      size="md"
      {...props}
      onHide={() => {
        props?.onHide?.();
        clear();
      }}
      show
    >
      {content}
    </Modal>
  );
}

ModalConfirm.confirm = (props) => {
  const clear = () => {
    document.body.removeChild(document.querySelector('.modalConfirmDefaultId'));
  };
  ReactDOM.render(
    <ModalConfirm {...props} clear={clear} />,
    document.createElement('div'),
  );
};

export default ModalConfirm;
