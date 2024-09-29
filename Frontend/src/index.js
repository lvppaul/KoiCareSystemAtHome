import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home'
import Login from './page/Login/Login'
import Signup from './page/Signup/Signup'
import Shop from './page/Shop/Shop';
import Pond from './page/Pond/Pond';
import AdminHome from './page/AdminHome/AdminHome';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />}></Route>
        <Route path='shop' element={<Shop />}></Route>
        <Route path='pond' element={<Pond/>}></Route>
        <Route path='calculation' element={<h1>Not Found</h1>}></Route>
        <Route path='news' element={<h1>Not Found</h1>}></Route>
      </Route>
      <Route path='login' element={<Login />}></Route>
      <Route path='signup' element={<Signup />}></Route>
      <Route path='usermanage' element={<AdminHome />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
