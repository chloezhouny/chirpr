import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import Login from './pages/Login';
import Signup from './pages/Signup';
import { startVconsole } from './utils';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Signup />
  </React.StrictMode>,
);

startVconsole();
