import React from 'react';
import ReactDOM from 'react-dom';
import css from './ModalLayout.module.scss';

function BackDrop(props) {
  return <div className={css.backDrop} onClick={props.onClose} />;
}

function ModalOverlay(props) {
  return (
    <div className={`${css.modal} ${props.className}`}>{props.children}</div>
  );
}

function ModalLayout(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <BackDrop onClose={props.onClose} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay className={props.className}>
          {props.children}
        </ModalOverlay>,
        document.getElementById('overlay-root')
      )}
    </>
  );
}

export default ModalLayout;
