import React from 'react';
import css from './ButtonRound.module.scss';

function ButtonRound(props) {
  return (
    <button
      type={props.type || 'submit'}
      className={`${css.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
      form={props?.form}
    >
      {props.children}
    </button>
  );
}

export default ButtonRound;
