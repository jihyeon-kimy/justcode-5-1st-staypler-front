import React from 'react';
import css from './ButtonSquare.module.scss';

function ButtonSquare(props) {
  return (
    <button
      type={props.type || 'submit'}
      className={`${css.button} ${
        props.theme === 'white' ? css.whiteTheme : ''
      } ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default ButtonSquare;
