import React from 'react';
import ReactDOM from 'react-dom';
import ButtonSquare from './Button/ButtonSquare';
import css from './Modal.module.scss';

function BackDrop({ onClose }) {
  return <div className={css.backDrop} onClick={onClose} />;
}

function ModalOverlay({ message, onClose, onConfirm }) {
  return (
    <div className={css.modal}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        x
      </button>
      <p className={css.message}>{message}</p>
      <ButtonSquare type="button" onClick={onConfirm}>
        확인
      </ButtonSquare>
    </div>
  );
}

function Modal({ message, onClose, onConfirm }) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          message={message}
          onClose={onClose}
          onConfirm={onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
}

export default Modal;
