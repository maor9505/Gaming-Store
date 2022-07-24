import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap/dist/css/bootstrap.css';
import "font-awesome/css/font-awesome.css";
import { UserContextProvider } from './Global/UserContext';
import axios from "axios";

axios.defaults.baseURL = "http://localhost:3001";
// const token = localStorage.getItem("token");
// axios.defaults.headers.common["Authorization"] = `bearer ${token}`;
axios.defaults.headers.post["Content-Type"] = "application/json";
 axios.defaults.headers.post["Content-Type"] = "multipart/form-data";

axios.interceptors.request.use(
  (request) => {
    // console.log(request);
    // Edit request config
    return request;
  },
  (error) => {
    // console.log(error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Edit response config
    return response;
  },
  (error) => {
    console.log("err");
    console.log(error.response.data);
    return Promise.reject(error.response.data);
  }
);


ReactDOM.render(
      <UserContextProvider><BrowserRouter><App /></BrowserRouter></UserContextProvider>,

  document.getElementById('root')
);

