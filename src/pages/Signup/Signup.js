import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import css from './Signup.module.scss';
import { BASEURL } from '../../ApiOrigin';
import Modal from '../../components/Modal/Modal';
import Input from '../../components/Input/Input';
import useInput from '../../hooks/use-input';
import PageHeader from '../../components/PageHeader/PageHeader';

const regularExpression = {
  email:
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}/,
  password: /^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})/,
  phoneNum: /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})/,
};

const isName = value =>
  value.trim() !== '' && 1 < value.length && value.length < 10;

const isEmail = value =>
  value.trim() !== '' && regularExpression.email.test(value);

const isPassword = value =>
  value.trim() !== '' && regularExpression.password.test(value);

const isRePassword = (Password, value) =>
  value.trim() !== '' && Password === value;

const isPhoneNum = value =>
  value.trim() !== '' && regularExpression.phoneNum.test(value);

function Signup() {
  const navigate = useNavigate();

  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState('');

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput(isName);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    inputChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailReset,
  } = useInput(isEmail);

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    inputChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: passwordReset,
  } = useInput(isPassword);

  const {
    value: enteredRePassword,
    isValid: rePasswordIsValid,
    hasError: rePasswordHasError,
    inputChangeHandler: rePasswordChangeHandler,
    inputBlurHandler: rePasswordBlurHandler,
    reset: rePasswordReset,
  } = useInput(isRePassword.bind(null, enteredPassword));

  const {
    value: enteredPhoneNum,
    isValid: phoneNumIsValid,
    hasError: phoneNumHasError,
    inputChangeHandler: phoneNumChangeHandler,
    inputBlurHandler: phoneNumBlurHandler,
    reset: phoneNumReset,
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

  const signUpHandler = event => {
    event.preventDefault();

    if (!formIsValid) {
      nameBlurHandler();
      emailBlurHandler();
      passwordBlurHandler();
      rePasswordBlurHandler();
      phoneNumBlurHandler();

      setOpenModal(true);
      setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
      return;
    }

    if (formIsValid) {
      fetch(`${BASEURL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: enteredEmail,
          username: enteredName,
          password: enteredPassword,
          phoneNumber: enteredPhoneNum,
        }),
      })
        .then(res => res.json())
        .then(data => {
          if (data.status === 201) {
            setOpenModal(true);
            setModalText('회원가입이 완료되었습니다.');
            navigate('/login');
          } else if (data.message === 'EXISTING_USER') {
            setOpenModal(true);
            setModalText('이미 가입된 사용자입니다.');
          } else {
            setOpenModal(true);
            setModalText('정보가 올바른 형식으로 입력되지 않았습니다.');
          }
        });
    }
  };

  return (
    <>
      {openModal && <Modal setOpenModal={setOpenModal} text={modalText} />}
      <PageHeader pageTitleEN="JOIN" pageTitleKO="회원가입" url="/signup" />

      <form className={css.formwrap} onSubmit={signUpHandler}>
        <Input
          id="email"
          title="이메일"
          placeholder="이메일을 입력해주세요."
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
          errorMessage="잘못된양식입니다."
        />
        <Input
          id="name"
          title="이름"
          placeholder="이메일을 입력해주세요."
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          hasError={nameHasError}
          errorMessage="1자이상 10자이하로 입력해주세요."
        />
        <Input
          id="password"
          title="비밀번호"
          placeholder="비밀번호를 확인해주세요."
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
          errorMessage="8자이상 20자이하, 숫자, 문자, 특수문자를 포함해주세요."
        />
        <Input
          id="rePassword"
          title="비밀번호 재입력"
          placeholder="비밀번호를 확인해주세요."
          onChange={rePasswordChangeHandler}
          onBlur={rePasswordBlurHandler}
          hasError={rePasswordHasError}
          errorMessage="입력하신 비밀번호가 같지않습니다."
        />
        <Input
          id="phoneNum"
          title="휴대전화"
          placeholder="휴대폰전화번호를 입력해주세요."
          onChange={phoneNumChangeHandler}
          onBlur={phoneNumBlurHandler}
          hasError={phoneNumHasError}
          errorMessage="잘못된양식입니다! 010-0000-0000 포함해서 입력해주세요."
        />
        <button className={css.signupBtn}>회원가입</button>
      </form>
    </>
  );
}

export default Signup;
