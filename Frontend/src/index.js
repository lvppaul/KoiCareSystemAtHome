import React from "react";
import { createRoot } from "react-dom/client";
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
import Pond from "./pages/Pond/Pond";
import AdminHome from "./pages/Admin/Home/AdminHome";
import TableUser from "./components/TableUser/TableUser"; 
import SaltCalculator from "./pages/SaltCalculator/SaltCalculator";
import FoodCalculator from "./pages/FoodCalculator/FoodCalculator";
import Product from "./pages/Product/Product";
import PondDetail from "./pages/PondDetail/PondDetail";
import KoiDetail from "./pages/KoiDetails/KoiDetail";
import Blog from "./pages/Blog/Blog";
import { AuthProvider } from "./pages/Login/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import News from "./pages/News/News";
import ManageShop from "./pages/ManageShop/ManageShop";
import KoiRemind from "./pages/KoiRemind/KoiRemind";
import NotAuthorized from "./pages/NotAuthorized/NotAuthorized";
import NewsDetail from "./pages/NewsDetail/NewsDetail";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import CreateShopAcc from "./pages/CreateShopAcc/CreateShopAcc";
import KoiList from "./pages/KoiList/KoiList";
import Confirmation from "./pages/EmailConfirm/Confirmation";
import AdminDashboard from "./components/AdminComponents/AdminDashboard";
import Profile from "./pages/Profile/Profile";
import Members from "./components/AdminComponents/MemberManagement";
import AdminShops from "./components/AdminComponents/ShopManagement";
import AdminCategories from "./components/AdminComponents/CategoriesManagement";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import UpdateAccount from "./pages/UpdateAccount/UpdateAccount";
import Cart from "./pages/Cart/Cart";

const container = document.getElementById("root");

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes (accessible to everyone) */}
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="createshopacc" element={<CreateShopAcc />} />
          <Route path="confirmemail" element={<Confirmation />} />
          <Route path="resetpassword" element={<ResetPassword />} />
          <Route path="payment" element={<PaymentPage/>} />
          <Route path="updateaccount" element={<UpdateAccount />} />
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="news" element={<News />} />
            <Route path="news/:newsId" element={<NewsDetail />} />
            <Route path="blogs" element={<Blog />} />
            <Route path="blog/:blogId" element={<BlogDetail />} />
            <Route path="shop" element={<Shop />} />
            <Route path="product/:productId" element={<Product />} />
            <Route path="notauthorized" element={<NotAuthorized />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotPage />} />

            {/* Protected Routes for Authenticated Users */}
            <Route path="cart" element={<ProtectedRoute requiredRole="member"><Cart /></ProtectedRoute>} />
            <Route
              path="koilist"
              element={
                <ProtectedRoute requiredRole="member">
                  <KoiList />
                </ProtectedRoute>
              }
            />
            <Route
              path="pond"
              element={
                <ProtectedRoute requiredRole="member">
                  <Pond />
                </ProtectedRoute>
              }
            />
            <Route
              path="ponddetail/:pondId"
              element={
                <ProtectedRoute requiredRole="member">
                  <PondDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="koidetail/:koiId"
              element={
                <ProtectedRoute requiredRole="member">
                  <KoiDetail />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes for Shop Users */}
            <Route
              path="manageshop"
              element={
                <ProtectedRoute requiredRole="shop">
                  <ManageShop />
                </ProtectedRoute>
              }
            />

            {/* Protected Routes for Vip Users */}
            <Route
              path="foodcalculator"
              element={
                <ProtectedRoute requiredRole="vip">
                  <FoodCalculator />
                </ProtectedRoute>
              }
            />
            <Route
              path="saltcalculator"
              element={
                <ProtectedRoute requiredRole="vip">
                  <SaltCalculator />
                </ProtectedRoute>
              }
            />
            <Route
              path="koiremind"
              element={
                <ProtectedRoute requiredRole="vip">
                  <KoiRemind />
                </ProtectedRoute>
              }
            />
          </Route>

          {/* Admin Routes */}
          <Route
            path="/admin/"
            element={
              <ProtectedRoute requiredRole="admin">
                <AdminHome />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="members" element={<Members />} />
            <Route path="categories" element={<AdminCategories />} />
            <Route path="shops" element={<AdminShops />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// Performance measurement
reportWebVitals();
