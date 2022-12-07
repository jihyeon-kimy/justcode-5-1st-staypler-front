import { BASEURL } from '../ApiOrigin';

const ERROR_MESSAGE = {
  // 회원가입 관련 에러 메시지
  EXISTING_USER: '이미 가입된 사용자입니다.',
  PASSWORD_IS_NOT_VALID: '비밀번호가 올바른 형식으로 입력되지 않았습니다.',
  EMAIL_IS_NOT_VALID: '이메일이 올바른 형식으로 입력되지 않았습니다.',
  USERNAME_IS_NOT_VALID: '사용자 이름이 올바른 형식으로 입력되지 않았습니다.',
  PHONE_NUMBER_IS_NOT_VALID: '전화번호가 올바른 형식으로 입력되지 않았습니다.',
  KEY_ERROR: '정보가 올바른 형식으로 입력되지 않았습니다.',
};

export async function signUp(signUpData) {
  const response = await fetch(`${BASEURL}/users/signup`, {
    method: 'POST',
    body: JSON.stringify(signUpData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      ERROR_MESSAGE[data.message] ||
        '정보가 올바른 형식으로 입력되지 않았습니다.'
    );
  }

  return;
}

export async function login(loginData) {
  const response = await fetch(`${BASEURL}/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error('아이디 혹은 비밀번호가 잘못되었습니다..');
  }

  localStorage.setItem('login-token', data.token);
  return;
}
