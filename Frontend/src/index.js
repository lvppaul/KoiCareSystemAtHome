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
import Pond from './pages/Pond/Pond';
import AdminHome from './pages/Admin/Home/AdminHome';
import TableUser from "./components/TableUser/TableUser";
import SaltCalculator from "./pages/SaltCalculator/SaltCalculator";
import FoodCalculator from "./pages/FoodCalculator/FoodCalculator";
import Product from './pages/Product/Product';
import PondDetail from "./pages/PondDetail/PondDetail";
import KoiDetail from "./pages/KoiDetails/KoiDetail";
import Blog from "./pages/Blog/Blog";
// Remove AuthProvider and ProtectedRoute imports as we're not using them in dev mode
import {AuthProvider} from "./pages/Login/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"; // Import the ProtectedRoute component
import News from './pages/News/News'; // Assuming you have a News component

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                {/* Public Routes (accessible to everyone) */}
                <Route path="/" element={<App />}>
                    <Route index element={<Home />} />
                    <Route path="news" element={<News />} />
                    <Route path="blogs" element={<Blog />} />

                <Route path="signup" element={<Signup />} />
                <Route path="login" element={<Login />} />

                {/* Protected Routes for Authenticated Users */}
                <Route path="shop" element={/*<ProtectedRoute requiredRole="member">*/<Shop />/*</ProtectedRoute>*/} />
                <Route path="product/:productId" element={/*<ProtectedRoute requiredRole="member">*/<Product />/*</ProtectedRoute>*/} />
                <Route path="pond" element={/*<ProtectedRoute requiredRole="member">*/<Pond />/*</ProtectedRoute>*/} />
                <Route path="foodcalculator" element={/*<ProtectedRoute requiredRole="member">*/<FoodCalculator />/*</ProtectedRoute>*/} />
                <Route path="saltcalculator" element={/*<ProtectedRoute requiredRole="member">*/<SaltCalculator />/*</ProtectedRoute>*/} />
                <Route path="ponddetail" element={/*<ProtectedRoute requiredRole="member">*/<PondDetail />/*</ProtectedRoute>*/} />
                <Route path="koidetail" element={/*<ProtectedRoute requiredRole="member">*/<KoiDetail />/*</ProtectedRoute>*/} />
                <Route path="*" element={<NotPage />} />
                </Route>
                        
                {/* Admin Routes */}
                <Route path="/admin" element={/*<ProtectedRoute requiredRole="admin">*/<AdminHome />/*</ProtectedRoute>*/}>
                    <Route index element={<h1>Report</h1>} />
                    <Route path="report" element={<h1>Report</h1>} />
                    <Route path="usermanage" element={/*<ProtectedRoute requiredRole="admin">*/<TableUser />/*</ProtectedRoute>*/} />
                </Route>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// Performance measurement
reportWebVitals();
