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
import Pond from './pages/Pond/Pond';
import AdminHome from './pages/Admin/Home/AdminHome';
import TableUser from "./components/TableUser/TableUser";
import SaltCalculator from "./pages/SaltCalculator/SaltCalculator";
import FoodCalculator from "./pages/FoodCalculator/FoodCalculator";
import PondDetail from "./pages/PondDetail/PondDetail";
import KoiDetail from "./pages/KoiDetails/KoiDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<Shop />} />
        <Route path="pond" element={<Pond />} />
        <Route path="foodcalculator" element={<FoodCalculator/>} />
        <Route path="saltcalculator" element={<SaltCalculator/>} />
        <Route path="blogs" element={<h1>Blogs</h1>} />
        <Route path="news" element={<h1>News</h1>} />
        <Route path="*" element={<NotPage />} />
        <Route path="pondDetail" element={<PondDetail />} />
        <Route path="koidetail" element={<KoiDetail/>}/>

      </Route>

      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="/admin/" element={<AdminHome />}>
          <Route index element={<h1>Report</h1>} />
          <Route path="report" element={<h1>Report</h1>} />
          <Route path="usermanage" element={<TableUser />} />
          <Route path="shopadmin" element={<h1>Shop</h1>} />
          <Route path="products" element={<h1>Products</h1>} />
          <Route path="catagories" element={<h1>Categories</h1>} />
          <Route path="setting" element={<h1>Setting</h1>} />
          <Route path="feedback" element={<h1>Feedback</h1>} />
        </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
