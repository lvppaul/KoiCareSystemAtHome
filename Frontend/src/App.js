import "./App.css";
import Nav from "./components/Navbar/Navigationbar";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import Pond from './page/Pond/Pond';
import AdminHome from './page/AdminHome/AdminHome';

function App() {
  return (
    <>
      <div className='navbar'><Nav /></div>
      <div className='main-content'>

        <Outlet />
      </div>
      <div className="footer">
        <Footer />
      </div>
    </>
  );
}
export default App;
