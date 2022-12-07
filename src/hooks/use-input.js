import { useState } from 'react';

const REGULAR_EXPRESSION = {
  email:
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/,
  password: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/,
  phoneNum: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})/,
};

export const isName = value =>
  value.trim() !== '' && 1 < value.length && value.length < 10;

export const isEmail = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.email.test(value);

export const isPassword = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.password.test(value);

export const isRePassword = (Password, value) =>
  value.trim() !== '' && Password === value;

export const isPhoneNum = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.phoneNum.test(value);

const useInput = validateValue => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isClicked;

  const inputChangeHandler = event => {
    setEnteredValue(event.target.value);
  };

  const inputBlurHandler = () => {
    setIsClicked(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsClicked(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
