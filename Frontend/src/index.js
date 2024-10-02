import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Shop from "./pages/Shop/Shop";
import NotPage from "./pages/NotPage/NotPage";
import SaltCalculator from "./pages/SaltCalculator/SaltCalculator";
import FoodCalculator from "./pages/FoodCalculator/FoodCalculator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />}></Route>
        <Route path="shop" element={<Shop />}></Route>
        <Route path="pond" element={<h1>pond</h1>}></Route>
        <Route path="foodcalculator" element={<FoodCalculator />}></Route>
        <Route path="saltcalculator" element={<SaltCalculator />}></Route>
        <Route path="blogs" element={<h1>blogs</h1>}></Route>
        <Route path="news" element={<h1>news</h1>}></Route>
        <Route path="*" element={<NotPage />}></Route>
      </Route>
      <Route path="login" element={<Login />}></Route>
      <Route path="signup" element={<Signup />}></Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
