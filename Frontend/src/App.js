import "./App.css";
import Nav from "./components/Navbar/Navigationbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { ToastifyMessage } from "./components/Toastify/ToastifyModel";
import { createContext, useState } from "react";

export const ToastContext = createContext();

function App() {
  const [toastMessage, setToastMessage] = useState("");

  return (
    <ToastContext.Provider value={{ setToastMessage }}>
      <div className="navbar">
        <Nav />
      </div>
      <div className="main-content">
        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
      <ToastifyMessage message={toastMessage} onClose={() => setToastMessage("")} />
    </ToastContext.Provider>
  );
}

export default App;
