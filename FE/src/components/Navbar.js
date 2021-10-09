import React from "react";
import { Link } from "react-router-dom";

import "../style/Navbar.scss";

function Navbar() {
  return (
    <div className="navbar-container">
      <Link to="/" className="link logo">
        OSS Project
      </Link>
      <div className="navbar-items">
        <div className="inner">
          <Link to="/signup" className="link item">
            회원가입
          </Link>
          <Link to="/signin" className="link item">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
