import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSquare from '../../components/UI/Button/ButtonSquare';
import Input from '../../components/Input/Input';
import PageHeader from '../../components/PageHeader/PageHeader';
import useHttp from '../../hooks/use-http';
import useInput, {
  isName,
  isEmail,
  isPassword,
  isRePassword,
  isPhoneNum,
} from '../../hooks/use-input';
import { signUp } from '../../lib/auth-api';
import css from './Signup.module.scss';
import ErrorModal from '../../components/UI/Modal/ErrorModal';

function Signup() {
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState();

  const { sendRequest: fetchSignUpHandler, status, error } = useHttp(signUp);

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput(isPassword);

  const {
    value: enteredRePassword,
    isValid: rePasswordIsValid,
    hasError: rePasswordHasError,
    inputChangeHandler: rePasswordChangeHandler,
    inputBlurHandler: rePasswordBlurHandler,
  } = useInput(isRePassword.bind(null, enteredPassword));

  const {
    value: enteredPhoneNum,
    isValid: phoneNumIsValid,
    hasError: phoneNumHasError,
    inputChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
  } = useInput(isPhoneNum);

  let formIsValid = false;

  if (
    nameIsValid &&
    emailIsValid &&
    passwordIsValid &&
    rePasswordIsValid &&
    phoneNumIsValid
  ) {
    formIsValid = true;
  }

  useEffect(() => {
    if (error !== null) {
      setErrorModal(error);
    }

    if (status === 'completed' && error === null) {
      setErrorModal('??????????????? ?????????????????????.');
    }
  }, [error, status]);

  const signUpSubmitHandler = async event => {
    event.preventDefault();

    if (!formIsValid) {
      nameBlurHandler();
      emailBlurHandler();
      passwordBlurHandler();
      rePasswordBlurHandler();
      phoneNumBlurHandler();
      return;
    }

    if (formIsValid) {
      await fetchSignUpHandler({
        email: enteredEmail,
        username: enteredName,
        password: enteredPassword,
        phoneNumber: enteredPhoneNum,
      });
    }
  };

  const closeModalHandler = () => {
    setErrorModal(null);
  };

  const goToMain = () => {
    navigate('/');
  };

  return (
    <>
      {errorModal && (
        <ErrorModal
          message={errorModal}
          onClose={closeModalHandler}
          onConfirm={
            status === 'completed' && error === null
              ? goToMain
              : closeModalHandler
          }
        />
      )}
      <PageHeader pageTitleEN="JOIN" pageTitleKO="????????????" url="/signup" />

      <form className={css.formwrap} onSubmit={signUpSubmitHandler}>
        <Input
          id="email"
          title="?????????"
          placeholder="???????????? ??????????????????."
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
          errorMessage="????????????????????????."
        />
        <Input
          id="name"
          title="??????"
          placeholder="???????????? ??????????????????."
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          hasError={nameHasError}
          errorMessage="1????????? 10???????????? ??????????????????."
        />
        <Input
          id="password"
          title="????????????"
          value={enteredPassword}
          placeholder="??????????????? ??????????????????."
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage="8????????? 20?????????, ??????, ??????, ??????????????? ??????????????????."
        />
        <Input
          id="rePassword"
          title="???????????? ?????????"
          value={enteredRePassword}
          placeholder="??????????????? ??????????????????."
          onChange={rePasswordChangeHandler}
          onBlur={rePasswordBlurHandler}
          hasError={rePasswordHasError}
          errorMessage="???????????? ??????????????? ??????????????????."
        />
        <Input
          id="phoneNum"
          title="????????????"
          value={enteredPhoneNum}
          placeholder="???????????????????????? ??????????????????."
          onChange={phoneNumChangeHandler}
          onBlur={phoneNumBlurHandler}
          hasError={phoneNumHasError}
          errorMessage="????????????????????????! 010-0000-0000 ???????????? ??????????????????."
        />
        <ButtonSquare theme="white">????????????</ButtonSquare>
      </form>
    </>
  );
}

export default Signup;
