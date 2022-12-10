import React from 'react';
import 'font-awesome/css/font-awesome.min.css';

import { BackTop } from 'antd';

function AppFooter() {
  return (
    
  <footer className="footer">
  <div className="container">
    <div className="row align-items-center">

      <div className="col-md-3"></div>

      <div className="col-md-6">

        <ul className="list-inline social-buttons">
        
        <li className="list-inline-item">
            <a href="https://wa.me/+972598918671">
              <i className="fa fa-whatsapp fa-3x"></i>
            </a>
          </li>
          <li className="list-inline-item">
            <a href="https://www.google.com/maps/place/%D8%A8%D8%A6%D8%B1+%D8%A7%D9%84%D9%85%D8%AD%D8%AC%D8%B1%E2%80%AD/@31.5697383,35.1137899,14z/data=!4m5!3m4!1s0x1502e7c1d7638e0b:0xc65e4da43b148bb2!8m2!3d31.557573!4d35.0894204?hl=ar">
              <i className="fa fa-map-marker fa-3x" ></i>
            </a>
          </li>

          <li className="list-inline-item">
          <a href="tel:022225753">
              <i className="fa fa-phone fa-3x" ></i>
            </a>
          </li>
          
          <li className="list-inline-item">
            <a href="https://www.instagram.com/jmysydtlkhlyl/">
              <i className="fa fa-instagram fa-3x"></i>
            </a>
          </li>

          <li className="list-inline-item">
            <a href="https://www.facebook.com/womenhebron/">
              <i className="fa fa-facebook-f fa-3x"></i>
            </a>
          </li>
          
        </ul>
      </div>


      <div className="col-md-4"></div>


    </div>
  </div>
  <BackTop>
          <div className="goTop"><i className="fa fa-arrow-circle-up fa-stack-2x text-primary"></i></div>
        </BackTop>
</footer>
  );
}

export default AppFooter;