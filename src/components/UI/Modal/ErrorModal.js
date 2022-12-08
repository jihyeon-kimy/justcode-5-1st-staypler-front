import React from 'react';
import ButtonSquare from '../Button/ButtonSquare';
import ModalLayout from './ModalLayout';
import css from './ErrorModal.module.scss';

function ErrorModal({ onClose, onConfirm, message }) {
  return (
    <ModalLayout className={css.modal} onClose={onClose}>
      <button type="button" className={css.closeBtn} onClick={onClose}>
        x
      </button>
      <p className={css.message}>{message}</p>
      <ButtonSquare type="button" onClick={onConfirm}>
        확인
      </ButtonSquare>
    </ModalLayout>
  );
}

export default ErrorModal;
