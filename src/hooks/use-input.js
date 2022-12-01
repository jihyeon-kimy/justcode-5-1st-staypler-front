import { useState } from 'react';

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
