import React, { useCallback, useEffect, useState } from 'react';

let logoutTimer;

const AuthContext = React.createContext({
  token: '',
  isLoggedIn: false,
  onLogin: (token, expiresIn) => {},
  onLogout: () => {},
});

const calculateRemainingTime = expirationTime => {
  const currentTime = new Date().getTime();
  const expirationTimeToMs = new Date(expirationTime).getTime();
  const remainingTime = expirationTimeToMs - currentTime;

  return remainingTime;
};

const retriveStoredToken = () => {
  const storedToken = localStorage.getItem('staypler_token');
  const storedExpirationTime = localStorage.getItem('staypler_expirationTime');
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime < 300000) {
    localStorage.removeItem('staypler_token');
    localStorage.removeItem('staypler_expirationTime');
    return null;
  }
  return { token: storedToken, remainingTime: remainingTime };
};

export const AuthContextProvider = props => {
  let initialData = retriveStoredToken();
  let initialToken = null;

  if (initialData) {
    initialToken = initialData.token;
  }

  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem('staypler_token');
    localStorage.removeItem('staypler_expirationTime');
    clearTimeout(logoutTimer);
  }, []);

  useEffect(() => {
    if (initialData) {
      logoutTimer = setTimeout(logoutHandler, initialData.remainingTime);
    }

    return clearTimeout(logoutTimer);
  }, [initialData, logoutHandler]);

  const loginHandler = (token, expiresIn = 3600000) => {
    const expirationTime = new Date(new Date().getTime() + expiresIn);
    setToken(token);
    localStorage.setItem('staypler_token', token);
    localStorage.setItem('staypler_expirationTime', expirationTime);

    logoutTimer = setTimeout(
      logoutHandler,
      calculateRemainingTime(expirationTime)
    );
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    onLogin: loginHandler,
    onLogout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
