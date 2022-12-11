import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/reset.scss';
import './styles/common.scss';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './store/auth-context';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProvider>
);
