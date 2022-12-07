import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonSquare from '../../components/UI/Button/ButtonSquare';
import Input from '../../components/Input/Input';
import PageHeader from '../../components/PageHeader/PageHeader';
import Modal from '../../components/UI/Modal';
import useHttp from '../../hooks/use-http';
import useInput, { isEmail, isPassword } from '../../hooks/use-input';
import { login } from '../../lib/auth-api';
import css from './Login.module.scss';

function Login() {
  const navigate = useNavigate();
  const [errorModal, setErrorModal] = useState();

  const { sendRequest: fetchloginHandler, status, error } = useHttp(login);

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

  let formIsValid = false;

  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  useEffect(() => {
    if (error !== null) {
      setErrorModal(error);
    }

    if (status === 'completed' && error === null) {
      setErrorModal('로그인이 완료되었습니다.');
    }
  }, [error, navigate, status]);

  const loginSubmitHandler = async event => {
    event.preventDefault();

    if (!formIsValid) {
      emailBlurHandler();
      passwordBlurHandler();
      return;
    }

    if (formIsValid) {
      await fetchloginHandler({
        email: enteredEmail,
        password: enteredPassword,
      });
    }
  };

  const closeModalHandler = () => {
    setErrorModal(null);
  };

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToMain = () => {
    navigate('/');
  };

  return (
    <>
      {errorModal && (
        <Modal
          message={errorModal}
          onClose={closeModalHandler}
          onConfirm={
            status === 'completed' && error === null
              ? goToMain
              : closeModalHandler
          }
        />
      )}
      <PageHeader pageTitleEN="LOGIN" pageTitleKO="로그인" url="/login" />
      <form className={css.formwrap} onSubmit={loginSubmitHandler}>
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
          id="password"
          title="비밀번호"
          value={enteredPassword}
          placeholder="비밀번호를 확인해주세요."
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage="8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요."
        />
        <ButtonSquare className={css.loginBtn}>LOGIN</ButtonSquare>
        <ButtonSquare type="button" theme="white" onClick={goToSignUp}>
          회원가입
        </ButtonSquare>
      </form>
    </>
  );
}
export default Login;
