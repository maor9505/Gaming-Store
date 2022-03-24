import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import { UserContextProvider } from './Global/UserContext';


ReactDOM.render(
      <UserContextProvider><BrowserRouter><App /></BrowserRouter></UserContextProvider>,

  document.getElementById('root')
);

