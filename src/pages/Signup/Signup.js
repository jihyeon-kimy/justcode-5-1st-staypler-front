import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';
import { BASEURL } from '../../ApiOrigin';
import Modal from '../../UI/Modal';
import Input from '../../components/Input/Input';
import useInput from '../../hooks/use-input';
import PageHeader from '../../components/PageHeader/PageHeader';
import ButtonSquare from '../../UI/Button/ButtonSquare';
import useHttp from '../../hooks/use-http';

const REGULAR_EXPRESSION = {
  email:
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/,
  password: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/,
  phoneNum: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})/,
};

const isName = value =>
  value.trim() !== '' && 1 < value.length && value.length < 10;

const isEmail = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.email.test(value);

const isPassword = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.password.test(value);

const isRePassword = (Password, value) =>
  value.trim() !== '' && Password === value;

const isPhoneNum = value =>
  value.trim() !== '' && REGULAR_EXPRESSION.phoneNum.test(value);

function Signup() {
  const navigate = useNavigate();

  const [errorModal, setErrorModal] = useState();

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

  const { isLoading, error, sendRequest: fetchSignUpHandler } = useHttp();

  const signUpHandler = async event => {
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
        url: `${BASEURL}/users/signup`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: {
          email: enteredEmail,
          username: enteredName,
          password: enteredPassword,
          phoneNumber: enteredPhoneNum,
        },
      });

      if (error) {
        return setErrorModal(error);
      }
      setErrorModal('회원가입이 완료되었습니다.');
    }
  };

  const closeModalHandler = () => {
    setErrorModal(null);
  };

  return (
    <>
      {errorModal && (
        <Modal
          message={errorModal}
          onClose={closeModalHandler}
          onConfirm={() => navigate('/')}
        />
      )}
      <PageHeader pageTitleEN="JOIN" pageTitleKO="회원가입" url="/signup" />

      <form className={css.formwrap} onSubmit={signUpHandler}>
        <Input
          id="email"
          title="이메일"
          placeholder="이메일을 입력해주세요."
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
          errorMessage="잘못된양식입니다."
        />
        <Input
          id="name"
          title="이름"
          placeholder="이메일을 입력해주세요."
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          hasError={nameHasError}
          errorMessage="1자이상 10자이하로 입력해주세요."
        />
        <Input
          id="password"
          title="비밀번호"
          value={enteredPassword}
          placeholder="비밀번호를 확인해주세요."
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage="8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요."
        />
        <Input
          id="rePassword"
          title="비밀번호 재입력"
          value={enteredRePassword}
          placeholder="비밀번호를 확인해주세요."
          onChange={rePasswordChangeHandler}
          onBlur={rePasswordBlurHandler}
          hasError={rePasswordHasError}
          errorMessage="입력하신 비밀번호가 같지않습니다."
        />
        <Input
          id="phoneNum"
          title="휴대전화"
          value={enteredPhoneNum}
          placeholder="휴대폰전화번호를 입력해주세요."
          onChange={phoneNumChangeHandler}
          onBlur={phoneNumBlurHandler}
          hasError={phoneNumHasError}
          errorMessage="잘못된양식입니다! 010-0000-0000 포함해서 입력해주세요."
        />
        <ButtonSquare theme="white" disabled={!formIsValid}>
          회원가입
        </ButtonSquare>
      </form>
    </>
  );
}

export default Signup;
