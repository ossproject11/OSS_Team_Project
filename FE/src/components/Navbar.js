import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators as userActions } from "../redux/modules/user";

import "../style/Navbar.scss";

function Navbar() {
  const dispatch = useDispatch();

  const isLogin = useSelector((state) => state.user.is_login);

  if (isLogin) {
    console.log("is_login");
  } else {
    console.log("not login");
  }

  const onLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      dispatch(userActions.logout());
    }
  };

  return (
    <header className="navbar-container">
      <Link to="/" className="link logo">
        OSS
      </Link>
      <div className="navbar-items">
        <div className="inner">
          {isLogin ? (
            <>
              <Link to="/mypage" className="link item">
                마이 페이지
              </Link>
              <Link to="/" className="link item" onClick={onLogout}>
                로그아웃
              </Link>
            </>
          ) : (
            <>
              <Link to="/signup" className="link item">
                회원가입
              </Link>
              <Link to="/signin" className="link item">
                로그인
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
