import React from 'react';
import './Footer.css';
import Logo from '../../assets/Fpt_TTKoi_logo.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          {/* Logo Section */}
          <div className="col-lg-3 col-md-6 mb-4">
            <img src={Logo} alt="FPT TTKoi Logo" className="footer-logo" />
          </div>

          {/* Get Help Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Get Help</h5>
            <ul className="list-unstyled">
              <li><a href="/valid-path">Order status</a></li>
              <li><a href="/valid-path">FAQs</a></li>
              <li><a href="/valid-path">Terms & Condition</a></li>
            </ul>
          </div>

          {/* Features Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Features</h5>
            <ul className="list-unstyled">
              <li><a href="/valid-path">Pond</a></li>
              <li><a href="/valid-path">Shop</a></li>
              <li><a href="/valid-path">News</a></li>
              <li><a href="/valid-path">Blogs</a></li>
            </ul>
          </div>

          {/* About Us Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>About Us</h5>
            <ul className="list-unstyled">
              <li><a href="/valid-path">About FPT TTKoi</a></li>
              <li><a href="/valid-path">Privacy Policy</a></li>
              <br></br>
              <li style={{ color: 'gray', fontSize: '36px', fontWeight: 'bold' }}>FPT TTKoi</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-lg-2 col-md-6 mb-4">
            <h5>Contact</h5>
            <ul className="list-unstyled">
              <li><a href="/valid-path">Email</a></li>
              <li><a href="/valid-path">Hotline</a></li>
            </ul>
          </div>
        </div>

        <hr />

        {/* Bottom Section */}
        <div className="row">
          <div className="col-12 text-center">
            <p className="copyright">© 2024 SWP391 - FPT University - Fall 2024. All rights reserved</p>
            <p className="address">Address: E2-a-7, D1 Street, Long Thanh My District, Thu Duc City, Ho Chi Minh City</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
