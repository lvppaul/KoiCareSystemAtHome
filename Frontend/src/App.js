import './App.css';
import Nav from './components/Navbar/Navigationbar';
import Footer from './components/Footer/Footer';
import {Outlet } from 'react-router-dom';
import Home from './pages/Home/Home';

function App() {
  return (
    <>
      <div className='navbar'><Nav /></div>
      <div className='main-content'>

        <Outlet />
      </div>
      <div className='footer'> <Footer /></div>
    </>
  );
}
export default App;
